import React from 'react'
import { Waveform } from '@uiball/loaders'

function Loader() {
  return (
    <Waveform 
      size={50}
      lineWeight={3.5}
      speed={1} 
      color="black" 
    />
  )
}

export default Loader