import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import { videoActions } from '../../store/videoSlice'
import { IVideo } from '../../type/videoProps'
import Music from './Music'
import MusicItem from './MusicItem'


const SelectedMusics = () => {
  const dispatch = useDispatch<AppDispatch>()
  const {wantedVideo } = useSelector((state:RootState) => state.video)
  const videoIndex = useSelector((state:RootState)=>state.video.index)
  useEffect(() => {
    dispatch(videoActions.setSelectedVideo(wantedVideo[videoIndex]))
  },[dispatch, videoIndex, wantedVideo])
  return (
    <>
      <Music/>
      {wantedVideo?.map((video:IVideo,index:number) => (
        <MusicItem
            video={video}
            idx ={index}
            key={video.id}
        />
      ))}
    </>
  )
}

export default SelectedMusics