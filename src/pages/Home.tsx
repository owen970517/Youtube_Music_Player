import React from 'react';
import styled from "styled-components"
import HomeImg from '../data/main.png'
import LatestMusics from 'src/components/musics/LatestMusics';
import Charts from 'src/components/Charts';
import TopCharts from 'src/components/TopCharts';

function Home() {
  return (
    <Main>
      <ImgWrapper>
        <Img src={HomeImg} alt='bgimg'/>
      </ImgWrapper>
      <TopCharts/>
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
