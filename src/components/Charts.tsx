import React, { useCallback, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import {  playlistActions } from '../store/playlistSlice'
import { AppDispatch, RootState } from '../store/store'
import { videoActions } from '../store/videoSlice'
import { IVideo } from 'src/type/videoProps'
import dayjs from 'dayjs'

const Charts = () => {
  const dispatch = useDispatch<AppDispatch>()
  const {wantedVideo } = useSelector((state:RootState) => state.video)
  const {liveClips,coverVideo,allVideos,sort} = useSelector((state:RootState) => state.playlist)
  const textRef = useRef<HTMLParagraphElement>(null)
  const isHide = textRef.current?.offsetWidth !== undefined && textRef.current?.offsetWidth < textRef.current?.scrollWidth;
  const formDuration = (value:string) => {
    const timeDuration = dayjs.duration(value)
    const minutes = timeDuration.minutes();
    const seconds = timeDuration.seconds();
    return `${minutes > 10 ? minutes : `0${minutes}`}:${seconds < 10 ? `0${seconds}` : seconds}`;
  }
  useEffect(() => {
    dispatch(playlistActions.setAllVideos([ ...coverVideo , ...liveClips]))
  },[coverVideo, dispatch, liveClips])
  const handlePlaylistClick = () => {
    dispatch(videoActions.currentIndex(0))
    dispatch(playlistActions.setFilteredVideos(wantedVideo))
  }
  const handleAllClick = () => {
    dispatch(videoActions.currentIndex(0))
    dispatch(playlistActions.setFilteredVideos(allVideos))
  }
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
  const onSortedBtn = useCallback(() => {
    const nowSortType = sort === '누적순' ? '일간순' : '누적순';
    dispatch(playlistActions.setSorted(nowSortType))
  },[dispatch, sort])
  return (
    <>
      <Link to='/playlist' onClick={handleAllClick}><button>전체 재생</button></Link>
      <button onClick={onSortedBtn}>일간</button>
      <button onClick={onSortedBtn}>누적</button>
      {wantedVideo.length > 0 ? <Link to='/mylist' onClick={handlePlaylistClick}><button>내 목록 {wantedVideo.length}</button></Link> : ''}
      <Content>
        {/* <ChartList>
          {sort ==='누적순' && <VideoLists/>}
        </ChartList> */}
        <Wrapper>
          <List>
            <ListsHeader>
              <h3>#</h3>
              <h3>Track/Artist</h3>
              <h3>Time</h3>
              <h3>Views</h3>
              <h3>Plays</h3>
            </ListsHeader>
            <Lists>
              {allVideos?.map((video:IVideo,index:number) => {
                  return ( 
                  <Video key={video.etag}>
                    <input type='checkbox' onChange={(e) => handleCheckBtn(e,index)} checked={wantedVideo?.map((video:any) => video?.id).includes(video?.id) ? true : false}/>
                    {index+1 < 10 ? `0${index+1}` : `${index+1}`}
                    <Thumnail src={video?.snippet?.thumbnails?.medium.url} alt="video thumbnail"/>
                    <Title isHide={isHide}>
                      <p ref={textRef}>{video.snippet.title}</p>
                    </Title>
                    <p>{formDuration(video.contentDetails.duration)}</p>
                    <p>{video.statistics.viewCount}</p>
                    <button>재생</button>
                  </Video>
                  )
              })}
              </Lists>
            </List>
        </Wrapper>
      </Content>
    </>
  )
}

const Content = styled.section`
  width: 100%;
  height : 500px;
  padding : 10px;
  overflow-y: scroll;
  border-radius: 5px;
  background-color: white;
  &::-webkit-scrollbar {
      width: 5px;
      height: 5px;
      border-radius: 6px;
      background-color: rgba(255,255,255,0.4);
    }
    &::-webkit-scrollbar-thumb {
      background-color: rgba(0,0,0,0.3);
      border-radius:6px;
    }
`

const Wrapper = styled.div`
  width: 55%;
  display: flex;
  justify-content:center;
  margin: 0 auto;
`
const List = styled.div`
  width: 100%;
  height : 500px;
  margin: 0 10px;
  overflow-y: scroll;
  border-radius: 5px;
  background-color: white;
  &::-webkit-scrollbar {
      width: 5px;
      height: 5px;
      border-radius: 6px;
      background-color: rgba(255,255,255,0.4);
    }
    &::-webkit-scrollbar-thumb {
      background-color: rgba(0,0,0,0.3);
      border-radius:6px;
    }
`
const Lists = styled.ul`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding-left: 0;
  margin: 0;
`
const ListsHeader = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`
const Video = styled.div`
  width : 100%;
  display: flex;
  justify-content: space-around;
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
export default Charts