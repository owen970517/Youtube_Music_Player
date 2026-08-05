import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'src/store/store'
import { IVideo } from 'src/types/videoProps'
import { formDuration } from 'src/utils/changeTimeFormat'
import styled, { keyframes } from 'styled-components'
import MusicInfoHeader from './MusicInfoHeader'
import Top10SkeletonUI from 'src/layout/Top10SkeletonUI'

const formatViews = (value: string) => {
    const num = Number(value)
    if (Number.isNaN(num)) return value
    return new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(num)
}

const TopCharts = () => {
    const { coverVideo } = useSelector((state:RootState) => state.playlist)
    const top10Charts = coverVideo.slice(0,10)
    const textRef = useRef<HTMLParagraphElement>(null)
    const isHide = textRef.current?.offsetWidth !== undefined && textRef.current?.offsetWidth < textRef.current?.scrollWidth;
  return (
    <>
      <Header>
        <HeaderBar />
        <div>
          <p>Charts Top 10</p>
          <Caption>Ranked by total views</Caption>
        </div>
      </Header>
      <Wrapper>
          <MusicInfoHeader/>
          {top10Charts.length > 0 ? top10Charts.map((chart: IVideo,idx:number) => {
              return (
                  <Chart key={chart.id}>
                      <Rank isTop={idx < 3}>{idx+1}</Rank>
                      <Track>
                        <Thumbnail src={chart?.snippet?.thumbnails?.medium.url} alt="thumbnail" />
                        <Title isHide={isHide}>
                          <p ref={textRef}>{chart.snippet.title}</p>
                        </Title>
                      </Track>
                      <Meta>{formDuration(chart.contentDetails.duration)}</Meta>
                      <Meta>{formatViews(chart.statistics.viewCount)}</Meta>
                  </Chart>
              )
          }) : Array.from({length: 10}).map((_, index) => <Top10SkeletonUI key={index} />)}
      </Wrapper>
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
const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 80%;
  margin: 0 auto;
  text-align: left;

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

const HeaderBar = styled.span`
  width: 4px;
  height: 28px;
  border-radius: 2px;
  background-color: #ea2129;
  flex-shrink: 0;

  @media (max-width: 768px) {
    height: 20px;
  }
`

const Caption = styled.p`
  font-family: 'GmarketSansTTFLight', sans-serif !important;
  font-size: 13px !important;
  font-weight: 400;
  color: #adb5bd;
  margin-top: 2px !important;

  @media (max-width: 768px) {
    font-size: 11px !important;
  }
`

const Wrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 12px 32px rgba(20, 20, 30, 0.08);
`

const Chart = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 1px solid #f1f2f4;
  transition: background-color 160ms ease;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background-color: #ea2129;
    transform: scaleY(0);
    transition: transform 160ms ease;
  }

  &:hover {
    background-color: rgba(234, 33, 41, 0.035);
  }

  &:hover::before {
    transform: scaleY(1);
  }

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    padding: 8px 12px;
  }
`;

const Rank = styled.div<{ isTop: boolean }>`
  flex: 1;
  text-align: center;
  font-family: 'GmarketSansTTFBold', sans-serif;
  font-variant-numeric: tabular-nums;
  font-size: ${(props) => (props.isTop ? '1.6em' : '1.15em')};
  color: ${(props) => (props.isTop ? '#ea2129' : '#343a40')};

  @media (max-width: 768px) {
    font-size: ${(props) => (props.isTop ? '1.2em' : '1em')};
  }
`;

const Track = styled.div`
  flex: 3;
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 0;

  @media (max-width: 768px) {
    gap: 8px;
  }
`

const Thumbnail = styled.img`
  flex-shrink: 0;
  width: 56px;
  height: 56px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(20, 20, 30, 0.12);
  @media (max-width:768px) {
    width: 40px;
    height: 40px;
    border-radius: 8px;
  }
`;

const Title = styled.div<{isHide :boolean}>`
  flex: 1;
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  color: #495057;
  &:hover {
    > p {
      animation:  ${scrollText} 7s linear infinite;
    }
  }
  p {
    margin: 0;
  }
  @media (max-width:768px) {
    p {
      font-size: 10px;
    }
  }
`

const Meta = styled.p`
  flex: 1;
  margin: 0 !important;
  text-align: center;
  font-variant-numeric: tabular-nums;
  color: #868e96;
  font-size: 14px;

  @media (max-width: 768px) {
    font-size: 11px;
  }
`

export default TopCharts