import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import Animais from '../Components/Animais';


export default function Home() {

  const [animals, setAnimals] = useState([]);

  async function getAnimals() {
    await fetch('http://10.139.75.15:5251/api/Animal/GetAllAnimal', {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(json => setAnimals( json ) )
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getAnimals();
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      getAnimals();
    }, [])
  );

  return (
    <View style={css.container}>
      {animals.length > 0 ?
        <>
          <FlatList
            data={animals}
            renderItem={({ item }) => <Animais nome={item.animalNome} image={item.animalFoto} />}
            keyExtractor={(item) => item.animalId}
            contentContainerStyle={{ height: (animals.length * 600) + 110 }}
          />
        </>
        :
        ( animals.length == 0 ? 
            <>
              <Text style={css.text}>Sem animais para exibir</Text>
              <Text style={css.text}>Teste Desculpa julio</Text>
            </>
          :
            <ActivityIndicator size="large" color="#3097ff" />
        )
      }
    </View>
  )
}
const css = StyleSheet.create({
  container: {
    backgroundColor: "#191919",
    flexGrow: 1,
    color: "white",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: "white"
  },
  stories: {
    width: "100%",
    height: 100
  }
})