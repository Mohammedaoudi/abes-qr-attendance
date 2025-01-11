import React, { useState } from "react";
import { Text, View, Button, StyleSheet } from "react-native";

const Emploi = () => {
  const [press1, setPress1] = useState(0);
  const [press2, setPress2] = useState(0);
  const [press3, setPress3] = useState(0);

  const handleClick1 = () => {
    setPress1(press1 + 1);
  };

  const handleClick2 = (stateSetter) => {
    stateSetter((prevState) => prevState + 1);
  };

  return (
    <View>
      <View style={styles.container}>
        <Text>EXO1</Text>
        <View>
          <Text>You clicked me {press1} fois</Text>
          <Button onPress={handleClick1} title="Press Me 1!!" />
        </View>
        <View>
          <Text>You clicked me {press1} fois</Text>
          <Button onPress={handleClick1} title="Press Me 1!!" />
        </View>
      </View>
      <View style={styles.container}>
        <Text>EXO2</Text>
        <View>
          <Text>You clicked me {press2} fois</Text>
          <Button onPress={() => handleClick2(setPress2)} title="Press Me 2!!" />
        </View>
        <View>
          <Text>You clicked me {press3} fois</Text>
          <Button onPress={() => handleClick2(setPress3)} title="Press Me 3!!" />
        </View>
      </View>
    </View>
  );
};

export default Emploi;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
});
