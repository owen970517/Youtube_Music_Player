import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import {  playlistActions } from '../store/playlistSlice'
import { AppDispatch, RootState } from '../store/store'
import { videoActions } from '../store/videoSlice'
import MusicInfoHeader from './MusicInfoHeader'
import ChartItem from './ChartItem'

const Charts = () => {
  const dispatch = useDispatch<AppDispatch>()
  const {wantedVideo } = useSelector((state:RootState) => state.video)
  const {coverVideo,allVideos} = useSelector((state:RootState) => state.playlist)
  const params = useLocation()
  const isCharts = params.pathname === '/charts'
  useEffect(() => {
    dispatch(playlistActions.setAllVideos([ ...coverVideo]))
  },[coverVideo, dispatch])
  const handlePlaylistClick = () => {
    dispatch(videoActions.currentIndex(0))
  }
  const handleAllClick = () => {
    dispatch(videoActions.currentIndex(0))
    dispatch(playlistActions.setFilteredVideos(allVideos))
  }

  return (
    <>
      <BtnWrap>
        {isCharts && <Link to='/playlist' onClick={handleAllClick}><AllBtn>모두 재생</AllBtn></Link>}
        {isCharts && wantedVideo.length > 0 ? <Link to='/mylist' onClick={handlePlaylistClick}><AllBtn>내 목록 {wantedVideo.length}</AllBtn></Link> : ''}
      </BtnWrap>
      <Content>
        <MusicInfoHeader/>
        <ChartLists>
          <List>
            <ChartItem/>
          </List>
        </ChartLists>
      </Content>
    </>
  )
}

const BtnWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const AllBtn = styled.button`
  padding: 10px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  margin-right: 10px;
`

const Content = styled.section`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content:center;
  margin: 0 auto;
  height : 500px;
  border-radius: 5px;
`
const ChartLists = styled.div`
  width: 100%;
  height : 450px;
  border-radius: 5px;
  background-color: white;
  overflow-y: scroll;
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
const List = styled.ul`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding-left: 0;
  margin: 0;
`

export default Charts