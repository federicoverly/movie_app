import React from 'react'
import { FlatList, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Cast, MovieFull } from '../interfaces/movieInterface';
import { CastCard } from './CastCard';

interface Props{
  movieFull?: MovieFull,
  cast?: Cast[]
}

export const MovieDetails = ( { movieFull, cast } : Props ) => {
  return (
    <View>

      {/* Details */}

      <View style={{ marginHorizontal: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon name='star-outline' color='gray' size={ 20 } />
          <Text style={{ marginLeft: 5}}>{movieFull?.vote_average}</Text>
          <Text style={{ marginLeft: 5}}>
            { movieFull?.genres.map(genre => genre.name).join(', ')}
          </Text>
        </View>
        <Text style={{ fontSize: 20, marginTop: 10, fontWeight: 'bold'}}>
          Overview
        </Text>
        <Text style={{ fontSize: 16, marginTop: 10}}>
          { movieFull?.overview }
        </Text>
      </View>

      {/* Casting */}

      <View style={{ marginTop: 10, marginBottom: 100 }}>
        <Text style={{ fontSize: 20, marginTop: 10, fontWeight: 'bold', marginHorizontal: 20}}>
            Cast
        </Text>
        <FlatList 
          data={cast}
          keyExtractor={ (actor) => actor.id.toString()}
          renderItem={ ({ item }) => <CastCard actor={item} /> }
          horizontal={ true }
          showsHorizontalScrollIndicator={ false }
          style= {{ marginTop: 10, height: 70 }}
          />
      </View>

      {/* Back Button */}
      
    </View>
  )
}
