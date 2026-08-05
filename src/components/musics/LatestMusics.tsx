import React, {useCallback, useEffect, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled, { keyframes } from 'styled-components'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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

  .slick-dots {
    position: static;
    margin-top: 14px;
    line-height: 0;
  }

  .slick-dots li {
    width: 18px;
    height: 6px;
    margin: 0 3px;
  }

  .slick-dots li button {
    width: 18px;
    height: 6px;
    padding: 0;
  }

  .slick-dots li button::before {
    left: 6px;
    top: 0;
    width: 6px;
    height: 6px;
    font-size: 0;
    border-radius: 3px;
    background-color: #d8dadf;
    opacity: 1;
    transition: width 200ms ease, left 200ms ease, background-color 200ms ease;
  }

  .slick-dots li.slick-active button::before {
    left: 0;
    width: 18px;
    background-color: #ea2129;
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
    responsive: [
      {
        breakpoint: 768,
        settings: { slidesToShow: 3, slidesToScroll: 3 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 2, slidesToScroll: 2 },
      },
    ],
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
    <Wrapper>
      <Head>
        <p>New Realeases</p>
        <ButtonDiv>
          <NavButton onClick={prev} aria-label="이전 곡 보기" type="button">
            <ChevronIcon viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15 6l-6 6 6 6" />
            </ChevronIcon>
          </NavButton>
          <NavButton onClick={next} aria-label="다음 곡 보기" type="button">
            <ChevronIcon viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9 6l6 6-6 6" />
            </ChevronIcon>
          </NavButton>
        </ButtonDiv>
      </Head>
      <StyledSlider {...settings} ref={slickRef}>
        {latestData.length > 0 ? latestData.map((video:IVideo) => (
          <VideoDiv key={video.etag}>
            <Thumnail
              src={video.snippet.thumbnails.medium.url}
              alt="video thumbnail"
            />
          </VideoDiv>
        )) : Array.from(new Array(5)).map((_, i) => (
          <VideoDiv key={i}>
            <SkeletonThumnail />
          </VideoDiv>
        ))}
      </StyledSlider>
    </Wrapper>
  )
}

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    margin: 0;
    font-family: 'GmarketSansTTFBold', sans-serif;
    font-size: 30px;
    line-height: 1.2;
  }

  @media (max-width: 768px) {
    p {
      font-size: 20px;
    }
  }
`

const Wrapper = styled.div`
  width: 80vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
`
const ButtonDiv= styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const NavButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  padding: 0;
  border: 1px solid rgba(20, 20, 26, 0.08);
  border-radius: 50%;
  background-color: #fff;
  color: #495057;
  box-shadow: 0 4px 10px rgba(20, 20, 30, 0.08);
  cursor: pointer;
  transition: background-color 160ms ease, border-color 160ms ease, color 160ms ease, transform 160ms ease;

  &:hover {
    background-color: #ea2129;
    border-color: #ea2129;
    color: #fff;
  }

  &:active {
    transform: scale(0.94);
  }

  &:focus-visible {
    outline: 2px solid #ea2129;
    outline-offset: 2px;
  }

  @media (max-width: 768px) {
    width: 28px;
    height: 28px;
  }
`

const ChevronIcon = styled.svg`
  width: 16px;
  height: 16px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;

  @media (max-width: 768px) {
    width: 14px;
    height: 14px;
  }
`

const VideoDiv = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 6px 16px rgba(20, 20, 30, 0.1);
  transition: transform 220ms ease, box-shadow 220ms ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 14px 28px rgba(20, 20, 30, 0.16);
  }
`

const Thumnail = styled.img`
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
`
const shimmer = keyframes`
  0% {
    background-position: -400px 0;
  }
  100% {
    background-position: 400px 0;
  }
`;

const SkeletonThumnail = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 12px;
  background: linear-gradient(90deg, #e9ecef 0%, #f4f5f7 50%, #e9ecef 100%);
  background-size: 800px 100%;
  animation: ${shimmer} 1.6s linear infinite;
`;

export default LatestMusics