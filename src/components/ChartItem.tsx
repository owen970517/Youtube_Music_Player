import React, { useCallback, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
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
      {allVideos?.map((video:IVideo,index:number) => {
        return ( 
          <Video key={video.etag}>
          {isCharts && <input type='checkbox' onChange={(e) => handleCheckBtn(e,index)} checked={wantedVideo?.map((video:any) => video?.id).includes(video?.id) ? true : false}/>}
          {index+1 < 10 ? `0${index+1}` : `${index+1}`}
          <Thumnail src={video?.snippet?.thumbnails?.medium.url} alt="video thumbnail"/>
          <Title isHide={isHide}>
              <p ref={textRef}>{video.snippet.title}</p>
          </Title>
          <p>{formDuration(video.contentDetails.duration)}</p>
          <p>{video.statistics.viewCount}</p>
          </Video>
        )
      })}
    </>
  )
}
const Video = styled.div`
  width : 80%;
  display: flex;
  justify-content: space-around;
  margin : 0 auto;
  align-items: center;
  border: 1px solid lightgray;
  border-radius: 5px;
  box-shadow: 3px 3px 5px 0px rgba(191, 191, 191, 0.53);
`
const scrollText = keyframes`
  0% {
    transform: translateX(0);
  }
  
  100% {
    transform: translateX(-100%);
  }
`

const Title = styled.div<{isHide :boolean}>`
  width: 45%;
  overflow: hidden;
  white-space: nowrap;
  &:hover {
    > p {
      animation:  ${scrollText} 7s linear infinite;
    }
  }
`

const Thumnail = styled.img`
  width: 10%;
  height: 50px;
  border-radius: 5px;
  z-index: 0;
`

export default ChartItem