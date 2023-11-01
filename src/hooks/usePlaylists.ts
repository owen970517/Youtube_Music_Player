import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { RootState } from "src/store/store";

export const usePlaylists = () => {
    const { wantedVideo } = useSelector((state: RootState) => state.video);
    const { filteredVideos } = useSelector((state: RootState) => state.playlist);
    const locate = useLocation();
    const nowPlayLists = locate.pathname === '/mylist' ? wantedVideo : filteredVideos;
    
    return nowPlayLists;
};