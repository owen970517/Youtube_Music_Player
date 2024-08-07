import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'src/store/store'
import { IVideo } from 'src/types/videoProps'
import { formDuration } from 'src/utils/changeTimeFormat'
import styled, { keyframes } from 'styled-components'
import MusicInfoHeader from './MusicInfoHeader'
import Top10SkeletonUI from 'src/layout/Top10SkeletonUI'

const TopCharts = () => {
    const { coverVideo } = useSelector((state:RootState) => state.playlist)
    const top10Charts = coverVideo.slice(0,10)
    const textRef = useRef<HTMLParagraphElement>(null)
    const isHide = textRef.current?.offsetWidth !== undefined && textRef.current?.offsetWidth < textRef.current?.scrollWidth;
  return (
    <>
      <Header>
        <p>Charts Top 10</p>
      </Header>
      <Wrapper>
          <MusicInfoHeader/>
          {top10Charts.length > 0 ? top10Charts.map((chart: IVideo,idx:number) => {
              return (
                  <Chart key={chart.id}>
                      <Rank>{idx+1}</Rank>
                      <Thumbnail src={chart?.snippet?.thumbnails?.medium.url} alt="thumbnail" />
                      <Title isHide={isHide}>
                        <p ref={textRef}>{chart.snippet.title}</p>
                      </Title>
                      <p>{formDuration(chart.contentDetails.duration)}</p>
                      <p>{chart.statistics.viewCount}</p>
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
  width: 80%;
  margin: 0 auto;
  text-align: left;
  font-size: 30px;
  font-weight: 800;
  @media (max-width: 768px) {
    font-size: 20px;
    font-weight: 800;
  }
`

const Wrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 0px 15px rgba(0,0,0,0.1);
`

const Chart = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #dee2e6;
  &:last-child {
    border-bottom: none;
  }
`;

const Rank = styled.div`
  font-size: 1.5em;
  color: #343a40;
  font-weight: bold;
`;

const Thumbnail = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
`;

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

export default TopCharts