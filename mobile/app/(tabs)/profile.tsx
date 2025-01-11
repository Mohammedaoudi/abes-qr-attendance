import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, TouchableOpacity, View } from 'react-native';

// Fonction MyButton pour créer un composant bouton personnalisé
const MyButton = ({ title, onPress, color }:{ title:any, onPress:any, color:any }) => {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={onPress}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
});

// Fonction profile pour définir le composant de profil
const Profile = () => {
  // Gestion des événements pour les boutons "Début" et "Fin"
  const handlePressDebut = () => {
    alert("Ceci est le début du test 2");
  };

  const handlePressFin = () => {
    alert("Ceci est la fin du test 2");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {/* Utilisation du composant MyButton pour créer deux boutons personnalisés */}
      <MyButton title="Dbut" onPress={handlePressDebut} color="green" />
      <MyButton title="Fin" onPress={handlePressFin} color="cyan" />
    </View>
  );
}

export default Profile;
