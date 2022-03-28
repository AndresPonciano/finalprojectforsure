const { gql } = require('apollo-server');

const typeDefs = gql`
    type Query {
        people(name: String, topic: String, offset: Int, limit: Int, sorted: String): AuthorConnection!
        author(id: Int): Author!
        authorPublications(id: Int, offset: Int, limit: Int): [Publication!]
        publications(searchTerm: String, offset: Int, limit: Int, sorted: String): [Publication!]
        topPeople(topic: String): [Author]!
        peopleSuggestedSearch(prefix: String): [Author]
        pubSuggestedSearch(prefix: String): [Publication]
    }

    type Author {
        id: ID!
        name: String!
        scholar_id: String
        url_picture: String
        affiliation: String
        topics: [String!]!
        other_topics: [String]!
        total_citations: Int
        h_index: Int
        tag_cloud: [String]
        highlight: [String]
    }

    type AuthorConnection {
        people: [Author]!
        totalCount: Int!
    }

    type personHighlight {
        name: [String]
    }

    type Publication {
        title: String!
        abstract: String!
        num_citations: Int
        pub_authors: [PubAuthor]!
    }

    type PubAuthor {
        id: Int
        name: String
    }

    type PublicationConnection {
        publications: [Publication]!
        totalCount: Int!
    }
`;

module.exports = typeDefs;