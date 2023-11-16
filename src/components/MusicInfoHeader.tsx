import React from 'react'
import styled from 'styled-components'

const MusicInfoHeader = () => {
  return (
    <InfoHeader>
      <h3 style={{marginLeft:'225px'}}>#</h3>
      <h3 style={{marginLeft:'250px'}}>Track/Artist</h3>
      <h3 style={{marginLeft:'350px'}}>Time</h3>
      <h3 style={{marginLeft:'32px'}}>Views</h3>
    </InfoHeader>
  )
}
const InfoHeader = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`
export default MusicInfoHeader