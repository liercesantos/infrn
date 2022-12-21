import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { ApolloLink } from "apollo-link";
import Config from "react-native-config";

const restaurants = new HttpLink({
  uri: 'https://api.yelp.com/v3/graphql',
  headers: {
    Authorization: `Bearer ${Config.YELP_TOKEN}`,
  },
});

//adicionar outra API para utilizar mutations
const custom = new HttpLink({
  uri: '/graphql',
});

const client = new ApolloClient({
  link: ApolloLink.split(
    operation => operation.getContext().clientName === "restaurants",
    restaurants,
    custom
  ),
  cache: new InMemoryCache({
    typePolicies: {
      RESTAURANTS_LIST: {
        fields: {
          business: {
            merge(existing, incoming){
              return [...existing, ...incoming];
            }
          }
        }
      }
    }
  }),
});

export default client;