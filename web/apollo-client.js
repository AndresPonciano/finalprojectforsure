import { ApolloClient, InMemoryCache } from "@apollo/client"
import { offsetLimitPagination } from "@apollo/client/utilities";

const client = new ApolloClient({
    uri: "http://localhost:9100/graphql",
    cache: new InMemoryCache({
        dataIdFromObject: o => (o._id ? `${o.__typename}:${o._id}`: null),
        typePolicies: {
            Query: {
                fields: {
                    people: {
                        people: offsetLimitPagination()
                    },
                    publications: {
                        keyArgs: ["searchTerm", "sorted"],
                        merge(existing, incoming, { args: { offset = 0 } }) {
                            // slicing is necessary because data is immutable in dev
                            const merged = existing ? existing.slice(0) : []
                            for(let i = 0; i < incoming.length; ++i) {
                                merged[offset + i] = incoming[i]
                            }

                            return merged;
                        }
                    },
                    personPublications: {
                        keyArgs: ["id", "sorted"],
                        merge(existing, incoming, { args: { offset = 0 } }) {
                            // slicing is necessary because data is immutable in dev
                            const merged = existing ? existing.slice(0) : []
                            for(let i = 0; i < incoming.length; ++i) {
                                merged[offset + i] = incoming[i]
                            }

                            return merged;
                        }
                    },
                    peopleSuggestedSearch: {
                        keyArgs: ["name"],
                    },
                    pubSuggestedSearch: {
                        keyArgs: ["title"],
                    }
                },
            },
        },
    }),
})

export default client;