import { ApolloClient, InMemoryCache } from "@apollo/client"
import { offsetLimitPagination } from "@apollo/client/utilities";

const client = new ApolloClient({
    uri: "http://localhost:9100/graphql",
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    authors: offsetLimitPagination()
                },
            },
        },
    }),
})

export default client;