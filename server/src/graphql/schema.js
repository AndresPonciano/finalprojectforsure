const { gql } = require('apollo-server');

const typeDefs = gql`
    type Query {
        people(name: String, topic: String, offset: Int, limit: Int, sorted: String): PersonConnection!
        person(id: Int): Person!
        personPublications(id: Int, offset: Int, limit: Int, sorted: String): [Publication!]
        publications(searchTerm: String, offset: Int, limit: Int, sorted: String): [Publication!]
        topPeople(topic: String): [Person]!
        peopleSuggestedSearch(prefix: String): [Person]
        pubSuggestedSearch(prefix: String): [Publication]
    }

    type Person {
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

    type PersonConnection {
        people: [Person]!
        totalCount: Int!
    }

    type Publication {
        title: String!
        abstract: String!
        num_citations: Int
        pub_authors: [PubAuthor]!
        highlight: PubHighlight
    }

    type PubHighlight {
        title: [String]
        abstract: [String]
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