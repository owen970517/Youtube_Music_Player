import React, { useCallback, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import SkeletonUI from 'src/layout/SkeletonUI'
import { RootState } from 'src/store/store'
import { videoActions } from 'src/store/videoSlice'
import { IVideo } from 'src/types/videoProps'
import { formDuration } from 'src/utils/changeTimeFormat'
import styled, { keyframes } from 'styled-components'

const ChartItem = () => {
  const dispatch = useDispatch()
  const {wantedVideo } = useSelector((state:RootState) => state.video)
  const {allVideos} = useSelector((state:RootState) => state.playlist)
  const params = useLocation()
  const isCharts = params.pathname === '/charts'
  const textRef = useRef<HTMLParagraphElement>(null)
  const isHide = textRef.current?.offsetWidth !== undefined && textRef.current?.offsetWidth < textRef.current?.scrollWidth;
  const handleCheckBtn = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
      if (e.target.checked) {
        dispatch(videoActions.setWantedVideo({ check: e.target.checked, video: allVideos[index] }));
      } else {
        dispatch(videoActions.setRemoveVideo({ check: e.target.checked, video: allVideos[index] }));
      }
    },
    [dispatch, allVideos]
  );
  return (
    <>
      {allVideos.length > 0 ?
        allVideos?.map((video:IVideo,index:number) => {
          return ( 
            <Video key={video.etag}>
              {isCharts && <input type='checkbox' onChange={(e) => handleCheckBtn(e,index)} checked={wantedVideo?.map((video:any) => video?.id).includes(video?.id) ? true : false}/>}
              {index+1}
              <Thumnail src={video?.snippet?.thumbnails?.medium.url} alt="video thumbnail"/>
              <Title isHide={isHide}>
                <p ref={textRef}>{video.snippet.title}</p>
              </Title>
              <p>{formDuration(video.contentDetails.duration)}</p>
              <p>{video.statistics.viewCount}</p>
            </Video>
          )
        }) : 
          Array.from({length: 10}).map((_, index) => <SkeletonUI key={index} />)
      }
    </>
  )
}

const scrollText = keyframes`
  0% {
    transform: translateX(0);
  }
  
  100% {
    transform: translateX(-100%);
  }
`
const Video = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border: 1px solid #dee2e6;
  border-radius: 10px;
  box-shadow: 0px 0px 15px rgba(0,0,0,0.1);
  margin-bottom: 20px;
  background-color: #f8f9fa;
`

const Title = styled.div<{isHide :boolean}>`
  width: 45%;
  overflow: hidden;
  white-space: nowrap;
  color: #495057;
  &:hover {
    > p {
      animation:  ${scrollText} 7s linear infinite;
    }
  }
`

const Thumnail = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
`
export default ChartItem