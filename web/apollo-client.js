import { ApolloClient, InMemoryCache } from "@apollo/client"
import { offsetLimitPagination } from "@apollo/client/utilities";
import publications from "./pages/publications";

const client = new ApolloClient({
    uri: "http://localhost:9100/graphql",
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    authors: {
                        authors: offsetLimitPagination()
                    },
                    publications: {
                        keyArgs: false,
                        merge(existing, incoming, { args: {offset = 0} }) {
                            // slicing is necessary because data is immutable in dev
                            const merged = existing ? existing.slice(0) : []
                            for(let i = 0; i < incoming.length; ++i) {
                                merged[offset + i] = incoming[i]
                            }

                            return merged;
                        }
                    }
                },
            },
        },
    }),
})

export default client;