import { useEffect } from 'react';
import React from 'react';
import styled from "styled-components"
import { useDispatch, useSelector } from 'react-redux';
import { getFriaPlaylistInfo, getFriaPlaylists, playlistActions } from '../store/playlistSlice';
import { AppDispatch, RootState } from '../store/store';
import HomeImg from '../data/main.png'
import LatestMusics from 'src/components/musics/LatestMusics';
import Charts from 'src/components/Charts';
import { IVideo } from 'src/types/videoProps';

function Home() {
  const dispatch = useDispatch<AppDispatch>()
  const {allData,coverVideo} = useSelector((state:RootState) => state.playlist)
  const formatIdString = (list:IVideo[]) => {
    return list?.map((x) => "&id=" + x.snippet.resourceId.videoId).join("");
  }
  const friaPlaylistId = formatIdString(allData)

  useEffect(()=> {
    dispatch(getFriaPlaylists())
    dispatch(getFriaPlaylistInfo(friaPlaylistId))
  },[dispatch, friaPlaylistId])

  useEffect(() => {
    let list:IVideo[] = []
    if (coverVideo ) {
      list = [...coverVideo]  
      list.sort((a:IVideo,b:IVideo) => parseInt(b.statistics.viewCount)-parseInt(a.statistics.viewCount))  
    }
    dispatch(playlistActions.setAllVideos(list))
    dispatch(playlistActions.setFilteredVideos(list))
  },[coverVideo, dispatch])
  return (
    <Main>
      <ImgWrapper>
        <Img src={HomeImg} alt='bgimg'/>
      </ImgWrapper>
      <Charts/> 
      <LatestMusics/> 
    </Main>  
  )
}
const ImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`
const Img = styled.img`
  width: 80%;
`
const Main = styled.div`
  margin-top : 10px;
`

export default Home
