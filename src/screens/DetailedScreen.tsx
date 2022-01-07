import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { Image, Text, View, StyleSheet, Dimensions, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { RootStackParams, Navigation } from '../navigation/Navigation';
import { useMovieDetails } from '../hooks/useMovieDetails';
import { MovieDetails } from '../components/MovieDetails';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const screenHeight = Dimensions.get('screen').height

interface Props extends StackScreenProps<RootStackParams, 'DetailedScreen'>{}

export const DetailedScreen = ( { route, navigation }: Props ) => {

  const movie = route.params

  const uri = `https://image.tmdb.org/t/p/w500${ movie.poster_path }`;

  const { isLoading, movieFull, cast } = useMovieDetails(movie.id)

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      </View>
    )
  }

  return (
    <ScrollView>
      <View style={ styles.imageContainer }>
        <View style={ styles.imageBorder }>
          <Image 
            source={{ uri }}
            style={ styles.posterImage }
          />
        </View>      
      </View>
      <View style={ styles.marginContainer}>
        <Text style={ styles.title}>{movie.original_title}</Text>
      </View>
      { isLoading
        ? <ActivityIndicator color='red' size={200} />
        : <MovieDetails movieFull={movieFull} cast={cast}/>
      }
    <TouchableOpacity 
      style={ styles.returnIcon } 
      onPress= { () => navigation.pop()}
    >
      <Icon name='arrow-back-outline' color='white' size={50} /> 
    </TouchableOpacity>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: screenHeight * 0.7,
    paddingBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 25,
    elevation: 9,
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
  },
  imageBorder: {
    overflow: 'hidden',
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
    flex: 1,
  },
  posterImage: {
    flex:1
  },
  marginContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  title: {
    fontSize:20,
    fontWeight: 'bold'
  },
  returnIcon: {
    position: 'absolute',
    zIndex: 999,
    elevation: 9,
    top: 35,
    left: 5
  }
})
