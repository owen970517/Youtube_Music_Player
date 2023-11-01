import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { videoActions } from '../../store/videoSlice';
import { AppDispatch, RootState } from '../../store/store';
import './Playlist.css'
import Music from 'src/components/musics/Music';
import MusicLists from 'src/components/musics/MusicLists';


const PlayLists = () => {
  const dispatch = useDispatch<AppDispatch>()
  const {filteredVideos} = useSelector((state:RootState) => state.playlist)
  const {index} = useSelector((state:RootState)=>state.video)
  useEffect(() => {
    dispatch(videoActions.currentIndex(0))
  },[])
  useEffect(() => {
    dispatch(videoActions.setSelectedVideo(filteredVideos[index]))
  },[filteredVideos, dispatch, index])
  return (
    <div className='image-bg'>
      <Music />
      <MusicLists />
    </div>
  )
}


export default PlayLists