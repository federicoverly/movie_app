import React, { useContext, useEffect } from 'react'
import { Text, View, ActivityIndicator, Dimensions, FlatList, ScrollView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { MoviePoster } from '../components/MoviePoster'
import { useMovies } from '../hooks/useMovies'

import Carousel from 'react-native-snap-carousel';
import { HorizontalSlider } from '../components/HorizontalSlider'
import { GradientBackground } from '../components/GradientBackground'

import ImageColors from 'react-native-image-colors'
import { getImageColors } from '../helpers/getColors'
import { GradientContext } from '../context/GradientContext';


const { width: windowWidth } = Dimensions.get('window')

export const HomeScreen = () => {

  const { nowPlaying, popular, topRated, upcoming, isLoading } = useMovies()

  const { top } = useSafeAreaInsets()

  const { setMainColors } = useContext(GradientContext)

  const getPosterColors = async ( index: number ) => {
    const movie = nowPlaying[index];
    const uri = `https://image.tmdb.org/t/p/w500${ movie.poster_path }`;
    const [ primary = 'green', secondary = 'orange'] = await getImageColors(uri)

    setMainColors({ primary: primary, secondary: secondary})
  }

  useEffect(() => {
    if ( nowPlaying.length > 0 ){
      getPosterColors(0)
    }
  }, [nowPlaying])

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color='red' size={200} />
      </View>
    )
  }

  return (
    <GradientBackground>
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
              onSnapToItem={ index => getPosterColors(index)}
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
    </GradientBackground>
  )
}
