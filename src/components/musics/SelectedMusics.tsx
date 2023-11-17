import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import { videoActions } from '../../store/videoSlice'
import Music from './Music'
import styled from 'styled-components'
import MusicLists from './MusicLists'

const SelectedMusics = () => {
  const dispatch = useDispatch<AppDispatch>()
  const {wantedVideo } = useSelector((state:RootState) => state.video)
  const videoIndex = useSelector((state:RootState)=>state.video.index)

  return (
    <Wrapper>
      <Music/>
      <MusicLists/>
    </Wrapper>
  )
}

const SelectedContainer = styled.ul`
  display: flex;
  flex-direction: column;
  padding : 10px;
  height : 400px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
      width: 8px;
      height: 8px;
      border-radius: 6px;
      background-color: rgba(255,255,255,0.4);
    }
    &::-webkit-scrollbar-thumb {
      background-color: rgba(0,0,0,0.3);
      border-radius:6px;
    }
`

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export default SelectedMusics