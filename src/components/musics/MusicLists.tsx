import React, { useRef } from 'react'
import {useDispatch } from 'react-redux'
import styled from 'styled-components'
import MusicItem from './MusicItem'
import { AppDispatch } from 'src/store/store'
import { playlistActions } from 'src/store/playlistSlice'
import { videoActions } from 'src/store/videoSlice'
import { IVideo } from 'src/types/videoProps'
import { Members } from 'src/constants/member'
import { useLocation } from 'react-router-dom'
import { usePlaylists } from 'src/hooks/usePlaylists'

const MusicLists = () => {
  const nowPlaylists = usePlaylists();
  const locate = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const listsRef = useRef<HTMLUListElement>(null);
  const handleFilterClick = (value: string , altValue?:string) => {
    if (listsRef.current) { 
      listsRef.current.scrollTo(0, 0); 
    }
    dispatch(videoActions.currentIndex(0))
    const filtered = nowPlaylists.filter((v: IVideo) =>
      v?.snippet.title.includes(value) || v?.snippet.title.includes(altValue!)
    );
    dispatch(playlistActions.setFilteredVideos(filtered));
  }

  return (
    <Wrapper>
      <Title>Playlist</Title>
      <FilterBtn>
        {locate.pathname==='/playlist' && Members.map((member) => 
          <MemberBtn key={member.name} onClick={() => handleFilterClick(member.value,member.altValue)}>{member.name}</MemberBtn>
        )}
      </FilterBtn>
      <Lists ref={listsRef}>
        {nowPlaylists.length <= 0  && <h3>음악이 존재하지 않습니다.</h3>}
        {nowPlaylists?.map((video: IVideo, index: number) => (
          <MusicItem video={video} idx={index} key={video?.id} />
        ))}
      </Lists>
    </Wrapper>
  );
}
const Title = styled.h1`
  margin-left:10px;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 400px;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 3px 3px 5px 0px rgba(191, 191, 191, 0.53);
  @media (max-width: 768px) {
    width: 50%;
    height: 70%;
  }
`

const Lists = styled.ul`
  padding : 10px;
  height : 400px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
      width: 8px;
      height: 8px;
      border-radius: 6px;
      background-color: rgba(255,255,255,0.4);
    }
    &::-webkit-scrollbar-thumb {
      background-color: rgba(0,0,0,0.3);
      border-radius:6px;
    }
`
const FilterBtn = styled.div`
  display: flex;
  justify-content: space-around;
`

const MemberBtn = styled.button`
  padding: 10px;
  border-radius: 10px;
  border: none;
`

export default React.memo(MusicLists)