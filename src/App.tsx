import { BrowserRouter} from 'react-router-dom';
import './App.css';
import Page from './pages/Page';
import Header from './layout/Header';
import Footer from './layout/Footer';
import { getFriaPlaylistInfo, getFriaPlaylists, playlistActions } from './store/playlistSlice';
import { IVideo } from './types/videoProps';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store/store';
import { formatIdString } from './utils/formatIdString';

const App:React.FC= () => {
  const dispatch = useDispatch<AppDispatch>()
  const {allData,coverVideo} = useSelector((state:RootState) => state.playlist)
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
    <BrowserRouter>
      <Header />
      <Page />
      <Footer/>
    </BrowserRouter>
  );
}

export default App;

