import React, {useCallback, useEffect, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NextBtn from '../../data/nextbtn.png'
import PrevBtn from '../../data/prevbtn.png'
import { IVideo } from 'src/types/videoProps'
import { AppDispatch, RootState } from 'src/store/store';
import { playlistActions } from 'src/store/playlistSlice';
export const StyledSlider = styled(Slider)`
  overflow :hidden;
  .slick-list {
    // 부모
    height: 100%;
    box-sizing: border-box;
  }

  .slick-slide > div {
    // 자식 안에 div
    margin: 5px;
    box-sizing: border-box;
  }
`;
const LatestMusics = () => {
  const settings = {
    arrows:false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    lazyload : true,
    autoplay: true,
    autoplaySpeed: 5000,
  };
  const slickRef = useRef<Slider>(null);
  const prev = useCallback(() => slickRef?.current?.slickPrev(), []);
  const next = useCallback(() => slickRef?.current?.slickNext() , []);
  const dispatch = useDispatch<AppDispatch>()
  const {allVideos,latestData} = useSelector((state:RootState) => state.playlist)
  useEffect(() => {
      let arr = [...allVideos]
      const sorted_list = arr.sort((a:IVideo, b:IVideo) => 
      new Date(b.snippet.publishedAt).getTime() - new Date(a.snippet.publishedAt).getTime()
    );
    dispatch(playlistActions.setLatestData(sorted_list.slice(0,10)))
  },[allVideos, dispatch])
  return (
    <>
      {allVideos &&   
        <Wrapper>
          <Head>
            <h1>New Realeases</h1>
            <ButtonDiv>
              <img src={PrevBtn} onClick={prev} style={{marginRight : '20px'}} alt='prev'/>
              <img src={NextBtn} onClick={next} alt='next'/>
            </ButtonDiv>
          </Head>
          <StyledSlider {...settings} ref={slickRef}>
            {latestData.map((video:IVideo) => (
              <VideoDiv key={video.etag}>
                <Thumnail
                  src={video.snippet.thumbnails.medium.url}
                  alt="video thumbnail"
                />
              </VideoDiv>
            ))}
          </StyledSlider>
        </Wrapper>   
      }
    </>
  )
}

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Wrapper = styled.div`
  width: 80vw;
  padding : 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
`
const ButtonDiv= styled.div`
  display: flex;
  padding: 20px;
`
const VideoDiv = styled.div`
  display: flex;
  flex-direction: column;
`

const Thumnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  flex: none;
`

export default LatestMusics