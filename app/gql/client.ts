import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: process.env.API_URL,
  //uri: "http://localhost:8080/query",
  cache: new InMemoryCache(),
});
