import React, { createContext, useState } from "react";

export const GradientContext = createContext({} as ContextProps ) // Define Type

interface ImageColors {
  primary: string,
  secondary: string
}

interface ContextProps {
  colors: ImageColors,
  prevColors: ImageColors,
  setMainColors: ( colors : ImageColors) => void,
  setSetPreviousMainColors: ( colors : ImageColors ) => void
}

interface Props {
  children: JSX.Element | JSX.Element[]
}

export const GradientProvider = ( { children } : Props ) => {

  const [ colors , setColors ] = useState<ImageColors>({
    primary: 'transparent',
    secondary: 'transparent'
  })

  const [ prevColors , setPrevColors ] = useState<ImageColors>({
    primary: 'transparent',
    secondary: 'transparent'
  })

  const setMainColors = ( colors: ImageColors ) => {
    setColors(colors)
  }

  const setSetPreviousMainColors = ( colors: ImageColors ) => {
    setPrevColors(colors)
  }

  return(
    <GradientContext.Provider value={{
      colors,
      prevColors,
      setMainColors,
      setSetPreviousMainColors,
    }}>
      { children }
    </GradientContext.Provider>
  )
}



