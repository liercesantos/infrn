import React from "react";
import { fetchMarkers, saveMarkers } from "../repositories/markers";

export const useAppMarkers = () => {

  const addMarker = async (data, markers, response) => {
    const id = (Math.random()*1e32).toString(36);
    const marker = {...data, id: id};

    markers.push(marker);
    saveMarkers(markers).then((stored) => {
      response(stored);
    });
  }

  const updateMarker = async (marker, markers, response) => {
    const _markers = Object.entries(markers).reduce((current, [id, row]) => {
      if (row.id === marker.id) {
        row = marker;
      }
      current.push(row);
      return current;
    }, []);

    saveMarkers(_markers).then((stored) => {
      response(stored);
    });
  }

  const deleteMarker = (markerId, markers, response) => {
    const _markers = Object.entries(markers).reduce((current, [id, row]) => {
      if (row.id !== markerId) {
        current.push(row);
      }

      return current;
    }, []);


    saveMarkers(_markers).then((stored) => {
      response(stored);
    });
  }

  const getMarkers = (resolve) => {
    fetchMarkers().then(markers => {
      resolve(markers);
    }).catch(err => {
      console.log(err)
      resolve([])
    });
  };

  return {
    addMarker: addMarker,
    updateMarker: updateMarker,
    deleteMarker: deleteMarker,
    getMarkers: getMarkers
  };
};
