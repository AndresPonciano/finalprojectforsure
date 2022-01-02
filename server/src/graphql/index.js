const { makeExecutableSchema } = require('graphql-tools');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

module.exports = makeExecutableSchema({
    "typeDefs": typeDefs,
    "resolvers": resolvers,
});