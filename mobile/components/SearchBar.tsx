import {
    Pressable,
    StyleSheet,
    TextInput,
    View,
    Text,
    useColorScheme,
    ColorSchemeName,
  } from "react-native";
  import { EvilIcons, MaterialCommunityIcons } from "@expo/vector-icons";
  
  import * as Device from "expo-device";
  import {Card} from "react-native-shadow-cards";
  import { LogBox } from "react-native";

  const SearchBar = (props:any) => {
    const colorScheme: ColorSchemeName = useColorScheme();
  
    const { searchedBook, setSearchedBook, openBarcodeScanner, seance } = props;
    const { element, professeur } = seance
    LogBox.ignoreAllLogs();
    return (
      <View
        style={[
          styles.container,
          
        ]}
      >
        <View
          style={[
            styles.inputContainer,
           
          ]}
        >
          <Card style={{padding: 10}}>
          <Text className='font-bold text-xl ' style={{color:'#1450A3'}}>{element.libelleElement}</Text>
          <Text className='font-semilight mt-1 mb-2' style={{color:'#337CCF'}}>{professeur.nom} {professeur.prenom} </Text>
  
          
  <MaterialCommunityIcons
    name="barcode-scan"
    size={30}
    onPress={openBarcodeScanner}
  />
          </Card>
          
        </View>
      </View>
    );
  };
  
  export default SearchBar;
  
  const styles = StyleSheet.create({
    container: {
        flex: 1,
      paddingTop: 20,
      paddingBottom: 5,
    },
    inputContainer: {
         flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "90%",
      alignSelf: "center",
      borderRadius: 5,
      paddingHorizontal: 5,
    },
    input: {
      flex: 1,
      marginLeft: 10,
      padding: Device.deviceType === 2 ? 12 : 7,
    },
    clearBtn: {
      alignItems: "center",
      justifyContent: "center",
      padding: 4,
    },
  });