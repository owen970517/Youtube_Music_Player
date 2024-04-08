import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import ReactPlayer from 'react-player/lazy'
import Record from '../../data/음반.png'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { useDispatch } from 'react-redux/es/exports'
import { videoActions } from '../../store/videoSlice'
import { AppDispatch, RootState } from '../../store/store'
import MusicControl from './MusicControl'
import { formDuration } from '../../utils/changeTimeFormat'
import { shuffle } from '../../utils/shufflePlay'
import { usePlaylists } from 'src/hooks/usePlaylists'

const Music = () => {
  const dispatch = useDispatch<AppDispatch>()
  const nowPlaylists = usePlaylists();
  const {isPlaying,isMuted,volume,isLoop,isRandom,duration,shuffledIndices} = useSelector((state:RootState) => state.video)
  const videoIndex = useSelector((state:RootState) => state.video.index)
  const videoRef = useRef<ReactPlayer>(null)
  const handleNextVideo = () => {
    if (!isRandom) {
      const nextIndex = videoIndex === nowPlaylists.length - 1 ? 0 : videoIndex + 1;
      dispatch(videoActions.currentIndex(nextIndex));
    } else {
      dispatch(videoActions.addPrevIndex(videoIndex));
      let nextIndex= shuffledIndices[0];
      dispatch(videoActions.shiftShuffledIndices());
      dispatch(videoActions.currentIndex(nextIndex));
    }
  }

  useEffect(() => {
    if (isRandom && shuffledIndices.length === 0) {
      const newArray: number[] =[...Array(nowPlaylists.length).keys()];
      newArray.splice(videoIndex, 1);
      dispatch(videoActions.setShuffleIndex(shuffle(newArray)));
      dispatch(videoActions.initPrevIndex());
    }
    dispatch(videoActions.setDuration(formDuration(nowPlaylists[videoIndex]?.contentDetails?.duration)))
  },[duration, videoIndex, nowPlaylists, isRandom, shuffledIndices.length])
  return (
    <MusicContainer>
      <Thumbnails src={nowPlaylists[videoIndex]?.snippet.thumbnails.medium.url || Record} alt='thumbnails'/>
      <ReactPlayer 
        ref={videoRef}
        url={`https://www.youtube.com/watch?v=${nowPlaylists[videoIndex]?.id}`} 
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