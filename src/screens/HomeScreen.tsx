import React, { useEffect } from 'react'
import { Text, View, ActivityIndicator, Dimensions, FlatList, ScrollView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { MoviePoster } from '../components/MoviePoster'
import { useMovies } from '../hooks/useMovies'

import Carousel from 'react-native-snap-carousel';
import { HorizontalSlider } from '../components/HorizontalSlider'

const { width: windowWidth } = Dimensions.get('window')

export const HomeScreen = () => {

  const { nowPlaying, popular, topRated, upcoming, isLoading } = useMovies()

  const { top } = useSafeAreaInsets()

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color='red' size={200} />
      </View>
    )
  }

  return (
    <ScrollView>
      <View style={{ marginTop: top + 20 }}>
        {/* Poster Carousel */}
        <View style={{
          height: 440,
        }}>
        <Carousel 
            data={ nowPlaying } 
            renderItem={ ({ item }) : any => <MoviePoster movie={item} /> }
            sliderWidth={windowWidth}
            itemWidth={300}
            inactiveSlideOpacity={0.7}
          />
        </View>

        { /* What's Popular Carousel */}
        <HorizontalSlider title={"What's popular"} movieList={popular}/>

        { /* Academy's Choice Carousel */}
        <HorizontalSlider title={"Top Rated"} movieList={topRated}/>

        { /* Coming Next Carousel */}
        <HorizontalSlider title={'Coming Next'} movieList={upcoming}/>
        
      </View>
    </ScrollView>
  )
}
