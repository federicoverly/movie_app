import React from 'react'
import { FlatList, Text, View } from 'react-native'
import { Movie } from '../interfaces/movieInterface'
import { MoviePoster } from './MoviePoster'

interface Props {
  title: string,
  movieList: Movie[]
}

export const HorizontalSlider = ({ movieList, title } : Props ) => {
  return (
    <View style={{
      height: 260,
      marginVertical: 5,
    }}>
      <Text style={{
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: 10,
      }}>{ title }</Text>
    <FlatList 
        data={ movieList } 
        renderItem={ ({ item } : any) => (
          <MoviePoster 
            movie={item} 
            key={item.id}
            width={140}
            height={200}
          />
          )
        }
        keyExtractor={ (item) => item.id.toString()}
        horizontal={ true } 
        showsHorizontalScrollIndicator= { false }
        />        
    </View>

  )
}
