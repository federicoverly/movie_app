import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Cast } from '../interfaces/movieInterface'

interface Props {
  actor: Cast
}

export const CastCard = ( { actor } : Props ) => {

  const uri = `https://image.tmdb.org/t/p/w500${ actor.profile_path }`;
 
  return (
    <View style={ styles.cardContainer }>
      { actor.profile_path && 
        <Image 
        style={{
          height: 50,
          width: 50
        }}
        source={{ uri }}
      />
      }
      <View style={ styles.actorInfo }>
          <Text style={{ fontSize: 18, fontWeight: 'bold'}}> 
            {actor.name}
          </Text>
          <Text style={{ fontSize: 16, opacity: 0.7 }}> 
            {actor.character}
          </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: 'white',
    marginHorizontal: 20,
    paddingRight: 15,
    paddingTop: 3,
    height: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 7,
    elevation: 9,
  },
  actorInfo: {
    marginLeft: 10,
    textAlign: 'center',
    height: 50
  }
})