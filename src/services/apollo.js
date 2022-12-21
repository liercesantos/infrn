import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { ApolloLink } from "apollo-link";

const restaurants = new HttpLink({
  uri: 'https://api.yelp.com/v3/graphql',
  headers: {
    Authorization: "Bearer Bjblka5mZ0ujB-bJaTpauQUC27Ru390-2SlqG0HrCe7m1DLsi_0bRYt0-3nkN5w4uJcGQXOrLwyM3vrO7XKedK0rLE0GEzKX4cZ6sy8CVDBJMRZNyJuxsP39E_qgY3Yx",
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