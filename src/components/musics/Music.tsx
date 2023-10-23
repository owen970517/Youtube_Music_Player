import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import ReactPlayer from 'react-player/lazy'
import Record from '../../data/음반.png'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { useDispatch } from 'react-redux/es/exports'
import { videoActions } from '../../store/videoSlice'
import { AppDispatch, RootState } from '../../store/store'
import { useLocation } from 'react-router-dom'
import MusicControl from './MusicControl'
import { formDuration } from '../utils/changeTimeFormat'

const Music = () => {
  const locate = useLocation()
  const dispatch = useDispatch<AppDispatch>()
  const {isPlaying,isMuted,volume,isLoop,isRandom,duration,wantedVideo} = useSelector((state:RootState) => state.video)
  const {filteredVideos } = useSelector((state:RootState) => state.playlist)
  const videoIndex = useSelector((state:RootState) => state.video.index)
  const videoRef = useRef<ReactPlayer>(null)
  const nowVideoLists = locate.pathname==='/mylist' ? wantedVideo : filteredVideos
  const handleNextVideo = () => {
    if (videoIndex === nowVideoLists.length -1 ) {
      dispatch(videoActions.currentIndex(0))
    } else if (isRandom) {
      let randomIndex = Math.floor(Math.random() * nowVideoLists.length)
      dispatch(videoActions.currentIndex(randomIndex))
    } else {
      dispatch(videoActions.currentIndex(videoIndex+1))
    }
  }
  useEffect(() => {
    dispatch(videoActions.setDuration(formDuration(nowVideoLists[videoIndex]?.contentDetails?.duration)))
  },[duration, videoIndex, nowVideoLists])

  return (
    <MusicContainer>
      <Thumbnails src={nowVideoLists[videoIndex]?.snippet.thumbnails.medium.url || Record} alt='thumbnails'/>
      <ReactPlayer 
        ref={videoRef}
        url={`https://www.youtube.com/watch?v=${nowVideoLists[videoIndex]?.id}`} 
        volume={volume}
        loop={isLoop}
        muted={isMuted}
        playing={isPlaying}
        onProgress = {(progress) => dispatch(videoActions.setElapsedTime(progress.playedSeconds))}
        onEnded ={handleNextVideo}
        style={{display : 'none'}}
        config={{
          youtube: {
            embedOptions: {
              host: "https://www.youtube-nocookie.com",
            },
            playerVars: {
              origin: `${window.location.origin}/playlist`,
            },
          },
        }}
      />
      <MusicControl videoRef={videoRef} handleNextVideo={handleNextVideo}/>
    </MusicContainer>
  )
}

const MusicContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  width: 400px;
  height: 400px;
  border : 1px solid #fff;
  border-radius: 20px;
  box-shadow: 3px 3px 5px 0px rgba(191, 191, 191, 0.53);
  margin-right: 30px;
  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    width: 50%;
    height: 100%;
    margin-bottom: 30px;
  }
`
const Thumbnails = styled.img`
  width : 40%;
  height: 40%;
  border-radius: 20px;
  @media (max-width: 768px) {
    width: 50%;
    height: 50%;
  }
`
export default React.memo(Music)