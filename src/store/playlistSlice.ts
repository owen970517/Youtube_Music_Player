import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IVideo } from "../type/videoProps";
import moment from "moment";

const API_KEY = process.env.REACT_APP_API_KEY;
// PLR2_QUSqS6X0vTlLq8R-eDSA7Ea1hpsWr
const playlistFria = 'PLT84I6XdVQ8W3cAOf-qSDP29hJs08s5CI'
// const liveclip = 'PLBgSCwfdu8IMT2MoCc0qEKAa4Wi2h5_X2'
const friaplaylistId = 'PLR2_QUSqS6X2FxXxOwq3uBRGj6luUoWBk'

export const getFriaPlaylists = createAsyncThunk('get/friaPlaylists',
    async (_, { rejectWithValue }) => {
        try {
            const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistFria}&maxResults=10000&key=${API_KEY}`;
            const res = await fetch(url);
            const data = await res.json();
            return data.items;
          } catch (err) {
            return rejectWithValue('Failed to fetch Fria playlists.'); // 오류 메시지 반환
          }
        }
)
export const getFriaPlaylistInfo = createAsyncThunk('get/playlistsInfo' ,
    async (idLists:string ) => {
        if (idLists) {
            const res = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics${idLists}&key=${API_KEY}`)
            const data = await res.json();
            const sortedVideo = await data?.items?.sort((a:IVideo,b:IVideo) => parseInt(b.statistics.viewCount)-parseInt(a.statistics.viewCount))
            return sortedVideo
          }
    })

interface IPlaylistProps {
    sort : string,
    dailyTime : string,
    weeklyTime : string,
    allData : IVideo[],
    allVideos : IVideo[],
    selectedVideos : IVideo[],
    filteredVideos : IVideo[]
    playlists:IVideo[],
    latestData : IVideo[],
    prevData : IVideo[],
    weeklyData : IVideo[],
    coverVideo : IVideo[],
    friaMusic : IVideo[],
    friaData : IVideo[],
    friaPlaylist : IVideo[],
    clipData : IVideo[],
}

const initialPlaylistState:IPlaylistProps = {
    sort : '누적순',
    dailyTime : moment().format('HH:mm:ss'),
    weeklyTime : moment().format('YYYY-MM-DD'),
    allData : [],
    filteredVideos :[],
    playlists : [],
    allVideos : [],
    selectedVideos:[],
    latestData : [],
    prevData : [],
    weeklyData : [],
    coverVideo : [],
    friaMusic : [],
    friaData : [],
    friaPlaylist : [],
    clipData : [],
}

const playlistSlice = createSlice({
    name : 'playlist',
    initialState : initialPlaylistState,
    reducers : {
        setAllVideos(state,action) {
            state.allVideos = action.payload
        },
        setFilteredVideos(state,action) {
            state.filteredVideos = action.payload
        },
        setPlaylists(state,action) {
            state.playlists = action.payload
        },
        setPrevData(state,action) {
            state.prevData = action.payload
        },
        setWeeklyData(state,action) {
            state.weeklyData = action.payload
        },
        setSelectedVideos(state,action) {
            state.selectedVideos = action.payload
        },
        setSorted(state,action) {
            state.sort = action.payload
        },
        setTimes(state,action) {
            state.dailyTime = action.payload
        },
        setLatestData(state,action) {
            state.latestData = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(getFriaPlaylists.fulfilled, (state, { payload }) => {
            state.allData = payload
        });
        builder.addCase(getFriaPlaylistInfo.fulfilled, (state, { payload }) => {
            if (payload) {
                // state.allVideos = payload
                state.coverVideo = payload
            }
        });
    },
})

export const playlistActions = playlistSlice.actions
export default playlistSlice.reducer