const { gql } = require('apollo-server');

const typeDefs = gql`
    # no need for mutations because we're not modifying data yet
    type Query {
        authors(name: String, topic: String, offset: Int, limit: Int): AuthorConnection!
        author(id: Int): Author!
        authorPublications(id: Int!): PublicationConnection!
        publications(title: String): PublicationConnection!
        # TODO: make separate query for publications by ID
    }

    type Author {
        id: ID!
        name: String!
        scholar_id: String
        url_picture: String
        topics: [String!]!
    }

    type AuthorConnection {
        authors: [Author]!
        totalCount: Int!
    }

    type Publication {
        id: ID!
        title: String!
        abstract: String!
        num_citations: Int
        # TODO: add profileList or nah idk how to do relations in graphql
    }

    type PublicationConnection {
        publications: [Publication]!
        totalCount: Int!
    }
`;

module.exports = typeDefs;