import { ApolloClient, InMemoryCache } from "@apollo/client"
import { offsetLimitPagination } from "@apollo/client/utilities";

const client = new ApolloClient({
    uri: "http://localhost:9100/graphql",
    cache: new InMemoryCache({
        dataIdFromObject: o => (o._id ? `${o.__typename}:${o._id}`: null),
        typePolicies: {
            Query: {
                fields: {
                    authors: {
                        authors: offsetLimitPagination()
                    },
                    publications: {
                        keyArgs: ["searchTerm"],
                        merge(existing, incoming, { args: { offset = 0 } }) {
                            // slicing is necessary because data is immutable in dev
                            const merged = existing ? existing.slice(0) : []
                            for(let i = 0; i < incoming.length; ++i) {
                                merged[offset + i] = incoming[i]
                            }

                            return merged;
                        }
                    },
                    authorPublications: {
                        keyArgs: ["id"],
                        merge(existing, incoming, { args: { offset = 0 } }) {
                            // slicing is necessary because data is immutable in dev
                            const merged = existing ? existing.slice(0) : []
                            for(let i = 0; i < incoming.length; ++i) {
                                merged[offset + i] = incoming[i]
                            }

                            return merged;
                        }
                    },
                },
            },
        },
    }),
})

export default client;