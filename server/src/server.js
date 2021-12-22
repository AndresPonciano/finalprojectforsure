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

const server = new ApolloServer({ 
  typeDefs,
  resolvers,
  dataSources: () => ({
    launchAPI: new LaunchAPI(),
    profileAPI: new ProfileAPI({ store })
  })
});

// TODO: all profiles
// TOOD: profile by ID
// TODO: endpoint for topics
// TOOD: endpoint for pagination if possible

server.listen().then(() => {
    console.log(`
      Server is running!
      Listening on port 4000
      Explore at https://studio.apollographql.com/sandbox
    `);
});
