import { useEffect, useState } from "react"
import movieDb from "../api/movieDB"
import { Cast, Credits, MovieFull } from "../interfaces/movieInterface"

interface MovieDetails{
  isLoading: boolean,
  movieFull?: MovieFull,
  cast?: Cast[],
}

export const useMovieDetails = ( movieId : number) => {
  const [ movieState , setMovieState ] = useState<MovieDetails>({
      isLoading: true,
      movieFull: undefined,
      cast: undefined,
  })
  
  const getMovieDetails = async () => {
    const movieDetailsPromise = await movieDb.get<MovieFull>(`/${movieId}`)
    const creditsPromise = await movieDb.get<Credits>(`/${movieId}/credits`) 

    const response = await Promise.all( [ movieDetailsPromise, creditsPromise ])
    setMovieState({
      isLoading: false, 
      movieFull: response[0].data,
      cast: response[1].data.cast,
    })
  }

  useEffect(() => {
    getMovieDetails()
  }, [])

  return {
    ...movieState 
  }
}
