import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../store/store'
import { videoActions } from '../store/videoSlice'
import { IVideo } from '../type/videoProps'
import Video from './Video'
import VideoItem from './VideoItem'

const SelectedVideos = () => {
  const dispatch = useDispatch<AppDispatch>()
  const {wantedVideo } = useSelector((state:any) => state.video)
  const videoIndex = useSelector((state:any)=>state.video.index)
  useEffect(() => {
    dispatch(videoActions.setSelectedVideo(wantedVideo[videoIndex]))
  },[dispatch, videoIndex, wantedVideo])
  return (
    <>
      <Video/>
      {wantedVideo?.map((video:IVideo,index:number) => (
        <VideoItem
            video={video}
            idx ={index}
            key={video.id}
        />
      ))}
    </>
  )
}

export default SelectedVideos