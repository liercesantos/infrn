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
