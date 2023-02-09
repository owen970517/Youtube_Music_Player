import { createSlice } from '@reduxjs/toolkit';
import { IVideo } from '../type/videoProps';

interface IVideoProps {
    selectedVideo : IVideo[]
    index : string
    isPlaying:boolean
    isMuted : boolean
    volume :number
    elapsedTime : string
    progressTime :number
    currentSeek :number
    duration:number
}

const initialVideoState:IVideoProps = {
    selectedVideo : [],
    index : '',
    isPlaying:false,
    isMuted:false,
    volume : 0.3,
    elapsedTime : '00:00',
    progressTime : 0,
    currentSeek : 0,
    duration : 0,
}

const videoSlice = createSlice({
    name : 'video' ,
    initialState :initialVideoState ,
    reducers : {
        setSelectedVideo(state,action) {
            state.selectedVideo = action.payload
        }
        ,
        currentIndex(state, action) {
            state.index = action.payload
        },
        setIsPlaying(state) {
            state.isPlaying = !state.isPlaying
        },
        setIsMuted(state,action) {
            action.payload ? state.isMuted = action.payload : state.isMuted = !state.isMuted
        },
        setVolume(state,action) {
            state.volume = action.payload
        },
        setElapsedTime(state,action) {
            state.elapsedTime = action.payload
        },
        setProgressTime(state,action) {
            state.progressTime = action.payload
        },
        setCurrentSeek(state,action) {
            state.currentSeek = action.payload
        },
        setDuration(state,action) {
            state.duration = action.payload
        },
    }
})

export const videoActions = videoSlice.actions
export default videoSlice.reducer