const { gql } = require('apollo-server');

const typeDefs = gql`
    # no need for mutations because we're not modifying data yet
    type Query {
        authors(name: String, topic: String, offset: Int, limit: Int, sorted: String): AuthorConnection!
        author(id: Int): Author!
        authorPublications(id: Int, offset: Int, limit: Int): [Publication!]
        # publications(title: String, offset: Int, limit: Int): PublicationConnection!
        publications(searchTerm: String, offset: Int, limit: Int, sorted: String): [Publication!]
        topPeople(topic: String): [Author]! 
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
    }

    type AuthorConnection {
        authors: [Author]!
        totalCount: Int!
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