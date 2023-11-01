import React, { useCallback} from 'react'
import { useDispatch, useSelector } from 'react-redux/es/exports';
import styled from 'styled-components';
import { IVideo } from 'src/types/videoProps';
import { videoActions } from 'src/store/videoSlice';
import { RootState } from 'src/store/store';
import { useLocation } from 'react-router-dom';

const MusicItem =   ({video , idx} : {video : IVideo,idx:number}) => {
  const dispatch = useDispatch()
  const params = useLocation();
  const isCharts = params.pathname === '/charts'
  const {wantedVideo,selectedVideo} = useSelector((state:RootState) => state.video)
  const {filteredVideos} = useSelector((state:RootState) => state.playlist)
  const onClick = useCallback(() => {
    dispatch(videoActions.currentIndex(idx))
  }, [dispatch, idx]);
  const onCheckBtn = (e:React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      dispatch(videoActions.setWantedVideo({check : e.target.checked , video}))
    } else {
      dispatch(videoActions.setRemoveVideo({check : e.target.checked , video}))
    }
  }
  const isActive = (idx:number) => {
    return selectedVideo?.id === filteredVideos[idx]?.id ? 'active' : ''
  };
  
  return (
    <Container onClick={onClick}>
      <Video className={isActive(idx)}>
        <MetaDiv>
          { isCharts && <input type='checkbox' onChange={onCheckBtn} checked={wantedVideo?.map((video:IVideo) => video.id).includes(video?.id) ? true : false}/>}
          <Title>{video?.snippet.title}</Title>
          <h5>{video?.statistics.viewCount}회</h5>
        </MetaDiv>
      </Video>
    </Container>
  );
}

const Container = styled.li`
  list-style: none;
  background-color: #fff;
`
const Video = styled.div`
  cursor: pointer;
  transition: transform 250ms ease-in;
  border: 1px solid lightgray;
  box-shadow: 3px 3px 5px 0px rgba(191, 191, 191, 0.53);
  border-radius: 10px;
  margin-bottom:10px;
  &.active {
    background-color: red;
    color : #fff;
  }
`
const MetaDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const Title = styled.p`
  width: 50%;
  margin-left: 10px;
  margin-right: 10px;
  font-size: 0.8rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
export default MusicItem