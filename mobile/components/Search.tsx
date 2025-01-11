import React from "react";
import { SafeAreaView, StyleSheet, Alert, View, Text, Image } from "react-native";
import SearchBar from "./SearchBar";
import { useState, useEffect } from "react";
import {images} from '../constants'
import * as Location from 'expo-location';

import BarcodeScanner from "./BarcodeScanner";
type LocationObject = Location.LocationObject;
const haversine = require('haversine')


const Search = ({ seance }: any) => {
  const [searchedBook, setSearchedBook] = useState<string>("");
  const [scannerIsVisible, setScannerIsVisible] = useState<boolean>(false);
  const [location, setLocation] = useState();

  const openBarcodeScanner = async () => {
    try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log("Please grant location permissions");
            Alert.alert("Please grant location permissions");
            return;
        }

        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
        console.log("Location:");
        console.log(currentLocation);

        // Define start coordinates
        const start = {
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude
        };

        // Define target coordinates
        const end = {
            latitude: 33.244849,
            longitude: -8.497633
        };

        // Calculate distance using haversine formula
        const distance = haversine(start, end, { unit: 'meter' });

        // Check if the distance is within 5 meters
        if (distance <= 20) {
            setScannerIsVisible(true);
        } else {
            Alert.alert("You are not within the 5 meter perimeter");
        }
    } catch (error) {
        console.error(error);
        Alert.alert("Error fetching location");
    }
};



  const closeBarcodeScanner = () => {
    setScannerIsVisible(false);
  };

  useEffect(() => {
    if (searchedBook) {
      Alert.alert("Présence attesté", searchedBook);
    }
  }, [searchedBook]);

  return (
    <SafeAreaView style={styles.container}>
      
      {scannerIsVisible ? (
        <BarcodeScanner
        className="flex-1"
          closeBarcodeScanner={closeBarcodeScanner}
          setSearchedBook={setSearchedBook}
          searchedBook={searchedBook}
        />
      ) : (
        <SearchBar
          searchedBook={searchedBook}
          setSearchedBook={setSearchedBook}
          openBarcodeScanner={openBarcodeScanner}
          seance={seance}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Search;
