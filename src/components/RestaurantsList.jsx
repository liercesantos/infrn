import { Fragment, useEffect, useMemo } from "react";
import { useLazyQuery  } from "@apollo/client";
import RESTAURANTS_LIST from "../repositories/restaurants";
import { Text, FlatList } from "react-native";
import RestaurantRow from "./RestaurantRow";

const RestaurantsList = ({latitude, longitude, navigation}) => {
  const [getRestaurants, {loading, error, data, refetch, fetchMore}] = useLazyQuery (RESTAURANTS_LIST);
  const params = {
    notifyOnNetworkStatusChange: true,
    variables: {
      latitude,
      longitude,
      offset: 0
    },
    fetchPolicy: "cache-and-network",
    context: {
      clientName: 'restaurants'
    }
  }

  const RestaurantCard = ({index, item}) =>
    <RestaurantRow data={item} navigation={navigation} />;

  useEffect(() => {
    getRestaurants(params).then(res => { });
  }, []);

  return(
    <Fragment>
      { data ?
        <FlatList
          refreshing={data.networkStatus === 4}
          onRefresh={() => refetch()}
          onEndReachedThreshold={0.5}
          onEndReached={() => fetchMore({
            variables: { offset: data.search.business.length },
            updateQuery: (prev, {fetchMoreResult}) => {
              if(!fetchMoreResult) return prev;
              return {search: { total: prev.search.total, business: [...prev.search.business, ...fetchMoreResult.search.business] }}
            }
          })}
          data={data.search.business}
          renderItem={RestaurantCard} /> : null
      }
    </Fragment>
  );
}

export default RestaurantsList;