import React, { useEffect, useState } from 'react'
import movieDb from '../api/movieDB'
import { Movie, MoviesResponse } from '../interfaces/movieInterface';

interface MoviesState{
  nowPlaying: Movie[],
  popular: Movie[],
  topRated: Movie[],
  upcoming: Movie[]
}

export const useMovies = () => {

  const [ isLoading, setIsLoading ] = useState(true)
  const [ moviesState, setMoviesState ] = useState<MoviesState>({
    nowPlaying:[],
    popular: [],
    topRated: [],
    upcoming: []
  })

  const getMovies = async () => {
    const now_playingPromise =  movieDb.get<MoviesResponse>('/now_playing');
    const popularPromise =  movieDb.get<MoviesResponse>('/popular');
    const topRatedPromise =  movieDb.get<MoviesResponse>('/top_rated');
    const upcomingPromise =  movieDb.get<MoviesResponse>('/upcoming');

    const response = await Promise.all( [ now_playingPromise, popularPromise, topRatedPromise, upcomingPromise ])
    setMoviesState({ nowPlaying: response[0].data.results, 
                    popular: response[1].data.results,
                    topRated: response[2].data.results,
                    upcoming: response[3].data.results
                   })
    setIsLoading(false)
  }



  useEffect(() => {
    getMovies()
  }, [])


  return {
    ...moviesState,
    isLoading
}
}
