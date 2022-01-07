import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Movie } from '../interfaces/movieInterface'

interface Props {
  movie: Movie;
  height?: number,
  width?: number
}

export const MoviePoster = ( { movie, height = 420, width = 300} : Props ) => {

  const uri = `https://image.tmdb.org/t/p/w500${ movie.poster_path }`;

  const navigation = useNavigation()

  return (
    <TouchableOpacity
      onPress={ () => navigation.navigate('DetailedScreen', movie)}
      activeOpacity={0.6}
      style={{ 
        width, 
        height, 
        marginHorizontal: 2, 
        paddingBottom: 20, 
        paddingHorizontal: 5
      }}
    >
      <View style={ styles.imageContainer}>
        <Image 
        source={{uri}}
        style={styles.image}
        />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  imageContainer:{
    borderRadius: 18,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 10,
    flex: 1,
  },
  image: {
    flex: 1,
    borderRadius: 18,
  }
})