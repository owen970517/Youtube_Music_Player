import React, { useEffect, useState } from 'react';
import styled from "styled-components"
import HomeImg from '../data/main.png'
import LatestMusics from 'src/components/musics/LatestMusics';
import TopCharts from 'src/components/TopCharts';

function Home() {
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    const imageLoader = new Image();
    imageLoader.src = HomeImg;
    imageLoader.onload = () => setImgLoaded(true);
  }, []);

  return (
    <Main>
      <ImgWrapper>
        {imgLoaded ? (
            <Img src={HomeImg} alt='bgimg' />
          ) : (
            <SkeletonBg />
          )}
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

const SkeletonBg = styled.div`
  margin: 0 auto;
  width : 80%;
  height: 500px;
  background-color :#b9b6b6;
`

export default Home
