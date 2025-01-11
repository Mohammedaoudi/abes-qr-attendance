import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
  useColorScheme,
  ColorSchemeName,
} from "react-native";
import { FC, useEffect, useState } from "react";
import { Camera } from "expo-camera";
import { AntDesign } from "@expo/vector-icons";
import { CameraView } from 'expo-camera';
import { Dimensions } from 'react-native';
import axios from 'axios';



const BarcodeScanner = (props: any) => {
  const colorScheme: ColorSchemeName = useColorScheme();
  const { searchedBook, setSearchedBook, closeBarcodeScanner } = props;
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [showInterface, setShowInterface] = useState(false); // New state variable
  

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({ type, data }: { type: any, data: any }) => {
    if (data === "123") {
      try {
        const response = await axios.put('http://192.168.0.121:3001/api1/v1/liste/upd/664613cf0f17ad663ec2786b/6645c79b47a059124c90d8d2/presence');
        if (response.status === 200) {
          setSearchedBook("Success");
          setShowInterface(true); // Show interface on successful scan
        } else {
          setSearchedBook("Fail");
        }
      } catch (error) {
        console.error('Error updating presence:', error);
        setSearchedBook("Fail");
      }
    } else {
      setSearchedBook("Success");
    }
  };

  const handleCloseButtonPress = () => {
    setShowInterface(false); // Hide interface when close button is pressed
    closeBarcodeScanner(); // Close barcode scanner
  };

  if (hasPermission === null) {
    return (
      <View style={[styles.container]}>
        <ActivityIndicator color="blue" size="large" />
        <Text style={[styles.scannerText]}>Requesting for camera permission</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={[styles.container]}>
        <Text style={[styles.scannerText]}>No access to Camera</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {showInterface && ( // Conditionally render the interface
        <View style={styles.scannerContainer}>
          <Text style={styles.scannerText}>Valid Code Scanned</Text>
          <Pressable onPress={handleCloseButtonPress} >
            <Text >Close</Text>
          </Pressable>
        </View>
      )}
      <CameraView
        onBarcodeScanned={searchedBook ? undefined : handleBarCodeScanned}
        style={styles.cameraContainer}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "pdf417"],
        }}
      />
      <View style={styles.scannerContainer}>
        <Pressable style={styles.closeBtn} onPress={closeBarcodeScanner}>
          <AntDesign name="closecircle" size={35} color="white" />
        </Pressable>
        <View style={styles.scanner}>
          <Text style={styles.scannerText}>Scan the Barcode given by the professor</Text>
        </View>
      </View>
    </View>
  );
};

export default BarcodeScanner;

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: width,
    height: height,
  },
  cameraContainer: {
    width: width,
    height: height,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  closeBtn: {
    position: "absolute",
    top: 50,
    right: 20,
  },
  scannerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanner: {
    height: 300,
    width: 300,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 5,
    borderStyle: "dashed",
  },
  scannerText: {
    fontSize: 18,
    fontWeight: "500",
    textTransform: "capitalize",
  },
});
