const express = require('express');
const bodyParser = require('body-parser');
const { ApolloServer } = require('apollo-server-express');
const { ApiElasticSearchClient, PublicationsApiElasticSearchClient } = require('./elasticsearch/server');

const app = express();
const path = require('path');
const makeExecutableSchema = require('./graphql');

const PORT = 9100;

const server = new ApolloServer({
  schema: makeExecutableSchema,
  playground: true,
})

app.use(bodyParser.json());

app.set('port', process.env.PORT || 3001);

// TODO Set path to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// TODO Enable CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Accept-Encoding, Accept-Language, Access-Control-Request-Headers, Access-Control-Request-Method");
  next();
});

// Define the `/search` route that should return elastic search results
app.get('/search/authors', ApiElasticSearchClient);

server.applyMiddleware({app});

app.listen(PORT, function () {
  console.log(`Express server listening on port :${PORT}${server.graphqlPath}`);
});

// const typeDefs = require('./schema');
// const db = require('./db.js');
// const { createStore } = require('./utils');
// const resolvers = require('./resolvers');

// const LaunchAPI = require('./datasources/dummy');
// const ProfileAPI = require('./datasources/profile');
// const store = createStore();

// const server = new ApolloServer({ 
//   typeDefs,
//   resolvers,
//   dataSources: () => ({
//     launchAPI: new LaunchAPI(),
//     profileAPI: new ProfileAPI({ store })
//   })
// });

// // TODO: all profiles
// // TOOD: profile by ID
// // TODO: endpoint for topics
// // TOOD: endpoint for pagination if possible

// server.listen().then(() => {
//     console.log(`
//       Server is running!
//       Listening on port 4000
//       Explore at https://studio.apollographql.com/sandbox
//     `);
// });
