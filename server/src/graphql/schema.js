const { gql } = require('apollo-server');

const typeDefs = gql`
    # no need for mutations because we're not modifying data yet
    type Query {
        launches(
            # number of results to show. default is 20. must be >= 1
            pageSize: Int
            # cursor to items after the ones on this launches object
            after: String
        ): LaunchConnection!
        profiles(
            pageSize: Int
            after: String
        ): ProfileConnection!
        profile(id: ID): Profile
        authors(name: String, topic: String, offset: Int, limit: Int): [Author]
        publications: [Publication]
    }

    type Author {
        id: ID!
        name: String!
        scholar_id: String
        url_picture: String
        topics: [String!]!
    }

    type Profile {
        id: ID!
        name: String!
        scholar_id: String
        url_picture: String
        # topics: [Topic]
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

    type LaunchConnection {
        cursor: String!
        hasMore: Boolean!
        launches: [Launch]!
    }

    type ProfileConnection {
        edges: [Edge]
        pageInfo: PageInfo!
    }

    type Edge {
        # cursor here will be the offset
        cursor: String!
        # node will be the list of nodes
        node: Profile
    }

    type PageInfo {
        endCursor: String!
        hasNextPage: Boolean!
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