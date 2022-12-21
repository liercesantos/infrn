import { gql } from "@apollo/client";

const RESTAURANTS_LIST = gql`
  query Restaurants($latitude: Float!, $longitude: Float!, $offset: Int!) {
    search(latitude: $latitude, longitude: $longitude, offset: $offset) {
      total
      business {
        name,
        distance,
        rating,
        coordinates {
          latitude,
          longitude
        },
        categories {
            alias
        },
        hours {
            is_open_now
        },
        url,
        photos
      }
    }
  }
`;

export default RESTAURANTS_LIST;