// const express = require('express');
// const bodyParser = require('body-parser');
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
// const db = require('./db.js');
const { createStore } = require('./utils');
const resolvers = require('./resolvers');

const LaunchAPI = require('./datasources/dummy');
const ProfileAPI = require('./datasources/profile');

const store = createStore();
console.log('store is: ', store);

// const app = express()

const server = new ApolloServer({ 
  typeDefs,
  resolvers,
  dataSources: () => ({
    launchAPI: new LaunchAPI(),
    profileAPI: new ProfileAPI({ store })
  })
});

// // PORT
// const PORT = 9100;

// // turns responses into js json objects
// app.use(bodyParser.json());

// // setting port
// app.set('port', process.env.PORT || 3001);

// // enabling CORS
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Accept-Encoding, Accept-Language, Access-Control-Request-Headers, Access-Control-Request-Method");
//     next();
// });

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

// app.get('/api/profile', (req, res, next) => {
//     const sql = "select * from Profile"
//     let params = []
//     db.all(sql, params, (err, rows) => {
//         if (err) {
//           res.status(400).json({"error":err.message});
//           return;
//         }
//         res.json({
//             "message":"success",
//             "data":rows
//         })
//       });
// })

// app.get('/api/profile/:profileId', (req, res, next) => {
//     const sql = "select * from Profile where id = ?";
//     let params = [req.params.profileId]
//     db.get(sql, params, (err, rows) => {
//         if (err) {
//           res.status(400).json({"error":err.message});
//           return;
//         }
//         res.json({
//             "message":"success",
//             "data":rows
//         })
//       });
// })

// TODO: endpoint for topics
// TOOD: endpoint for pagination if possible

server.listen().then(() => {
    console.log(`
      Server is running!
      Listening on port 4000
      Explore at https://studio.apollographql.com/sandbox
    `);
});

// TODO: how to feed api to graphql cus i can't run both servers at the same time (same file)
// app.listen(PORT, function () {
//     console.log(`Example app listening at http://localhost:${PORT}`)
// });