const {Sequelize, STRING, INTEGER} = require('sequelize');

module.exports.paginateResults = ({
  after: cursor,
  pageSize = 20,
  results,
  // can pass in a function to calculate an item's cursor
  getCursor = () => null,
}) => {
  if (pageSize < 1) return [];

  if (!cursor) return results.slice(0, pageSize);
  const cursorIndex = results.findIndex(item => {
    // if an item has a `cursor` on it, use that, otherwise try to generate one
    let itemCursor = item.cursor ? item.cursor : getCursor(item);

    // if there's still not a cursor, return false by default
    return itemCursor ? cursor === itemCursor : false;
  });

  return cursorIndex >= 0
    ? cursorIndex === results.length - 1 // don't let us overflow
      ? []
      : results.slice(
          cursorIndex + 1,
          Math.min(results.length, cursorIndex + 1 + pageSize),
        )
    : results.slice(0, pageSize);
};

module.exports.createStore = () => {
  // TODO: rename database
  const db = new Sequelize('blog', null, null, {
    dialect: 'sqlite',
    storage: './profiles.sqlite'
  });

  // TODO: how exactly does the model differ from the db.model. research it
  const profileModel = db.define('profile', {
    id: {type: INTEGER, primaryKey: true},
    name: STRING,
    scholar_id: STRING,
    url_picture: STRING,
  },
  {
    timestamps: false,
    freezeTableName: true
  });

  const Profile = db.models.profile;

  return { db, Profile }
};