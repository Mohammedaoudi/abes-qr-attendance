import React, { useEffect } from 'react';
import { View, Text, Image, FlatList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {images} from '../../constants'
import EmptyState from '../../components/EmptyState';


import { useState } from 'react';
import axios from 'axios';
import Search from '../../components/Search';
import  SearchBar  from '../../components/SearchBar';

export default function Home() {
  const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      const fetchData = async () => {
        setIsLoading(true);
        console.log("response")
        try {
          console.log("hhhhhhhh")

          const response = await axios.get('http://192.168.0.180:3001/api1/v1/seances/etudiant/6645c79b47a059124c90d8d2/seances-aujourdhui');
          console.log(response.data)
          
          setData(response.data);
        } catch (error) {
  console.error('Error fetching data:', error);
  Alert.alert('Error', 'Failed to fetch data');
}
        finally {
          setIsLoading(false);
        }
      };
  
      fetchData();
    }, []);
    /*
    const data = [
      {
        _id: '1',
        nomSeance: 'Mathematics',
        jour: 'Monday',
        heureDebut: '09:00 AM',
        heureFin: '11:00 AM',
        semaine: 'Week 1',
        professeur: 'Professeur ID 1',
        element: 'Element ID 1',
        salle: 'Salle ID 1'
      },
      {
        _id: '2',
        nomSeance: 'Physics',
        jour: 'Tuesday',
        heureDebut: '10:00 AM',
        heureFin: '12:00 PM',
        semaine: 'Week 1',
        professeur: 'Professeur ID 2',
        element: 'Element ID 2',
        salle: 'Salle ID 2'
      },
      {
        _id: '3',
        nomSeance: 'Physics',
        jour: 'Tuesday',
        heureDebut: '10:00 AM',
        heureFin: '12:00 PM',
        semaine: 'Week 1',
        professeur: 'Professeur ID 3',
        element: 'Element ID 3',
        salle: 'Salle ID 2'
      }
      // Add more seance objects as needed
    ];*/
  return (
    

    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
       <View style={{ flex: 1}} >
        <View >
            <View  className='justify-between items-start flex-row mb-6'>
              <View  className='mx-5 '>
                <Text className='font-premium text-2xl text-black  '>
                  Bonjour
                </Text>
                <Text className='text-4xl font-psemibold text-black'>
                  CHOUAY
                </Text>
              </View>
              <View  className='mt-1.5'>
                <Image
                
                source={images.logoSmall}
                className="w-20 h-12 mt-1"
                resizeMode="contain"
                />
              </View>
              
            </View>
            <View  className='mx-5 mt-5 mb-2'>
                <Text className=' text-xl text-black  '>
                  Les seances d'aujourd'hui
                </Text>
            </View>
          </View>
          </View>
          <FlatList
  
  data={data}
  keyExtractor={(item) => item._id.toString()}
  renderItem={({ item }) => (
    <View style={{ flex: 1 }}>
      <Search seance={item} />
    </View>
  )}
  ListEmptyComponent={() => <EmptyState />}
/>

    </SafeAreaView>
  );
}
