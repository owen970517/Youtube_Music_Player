import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { videoActions } from '../store/videoSlice';
import Video from './Video'
import VideoLists from './VideoLists'
import { AppDispatch, RootState } from '../store/store';
import '../components/Playlist.css'

const PlayLists = () => {
  const dispatch = useDispatch<AppDispatch>()
  const {allVideos,filteredVideos} = useSelector((state:RootState) => state.playlist)
  const {index,wantedVideo} = useSelector((state:RootState)=>state.video)
  useEffect(() => {
    dispatch(videoActions.currentIndex(0))
  },[])
  useEffect(() => {
    dispatch(videoActions.setSelectedVideo(filteredVideos[index]))
  },[filteredVideos, dispatch, index])
  return (
    <div className='image-bg'>
      <Video />
      <VideoLists />
    </div>
  )
}


export default PlayLists