import AsyncStorage from '@react-native-async-storage/async-storage';

const saveMarkers = async (markers) => {
  try {
    await AsyncStorage.setItem('@markers', JSON.stringify(markers));
    return true;
  } catch (e) {
    return false;
  }
}

const fetchMarkers = async (done) => {
  /*const _markers = [
    {
      id: 1,
      color: '#000099',
      name: 'mark1',
      coords: {
        latitude: -22.8645029,
        longitude: -42.3352284,
      }
    },
    {
      id: 2,
      color: '#00E98D',
      name: 'mark2',
      coords: {
        latitude: -22.8645629,
        longitude: -42.3312084
      }
    },
    {
      id: 3,
      color: '#4F0099',
      name: 'mark3',
      coords: {
        latitude: -22.8643409,
        longitude: -42.3344144
      }
    }
  ]
  await AsyncStorage.setItem('@markers', JSON.stringify(_markers));*/
  //await AsyncStorage.setItem('@markers', JSON.stringify([]));

  const storage = await AsyncStorage.getItem('@markers');

  return new Promise((resolve, reject) => {
    try {
      const markers = storage !== null ? JSON.parse(storage) : [];

      if(markers.length > 0){
        resolve(markers);
      }
      reject('MarkersNotFound');
    }
    catch (e) {
      reject(e);
    }
  });
}

export {saveMarkers, fetchMarkers};
