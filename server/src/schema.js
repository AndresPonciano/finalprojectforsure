const { gql } = require('apollo-server');

const typeDefs = gql`
    # no need for mutations because we're not modifying data yet

    type Query {
        launches: [Launch]!
        profiles: [Profile]
        profile(id: ID): Profile
    }

    type Profile {
        id: ID!
        name: String!
        scholar_id: String
        url_picture: String
        topics: [Topic]
    }

    type Topic {
        id: ID!
        name: String
        # author_id: Int
    }

    type Publication {
        id: ID!
        title: String!
        abstract: String!
        num_citations: Int
        # TODO: add profileList or nah idk how to do relations in graphql
    }

    type Launch {
        id: ID!
        site: String
        mission: Mission
        rocket: Rocket
        isBooked: Boolean!
    }

    type Rocket {
        id: ID!
        name: String
        type: String
    }

    type Mission {
        name: String
        missionPatch(size: PatchSize): String
    }

    enum PatchSize {
        SMALL
        LARGE
    }

`;

module.exports = typeDefs;