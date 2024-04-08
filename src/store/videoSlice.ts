import { createSlice } from '@reduxjs/toolkit';
import { IVideo } from 'src/types/videoProps';


interface IVideoProps {
    selectedVideo? : IVideo
    wantedVideo :IVideo[]
    index : number
    shuffledIndices : number[]
    prevIndex : number[]
    isPlaying:boolean
    isLoop : boolean
    isMuted : boolean
    isRandom : boolean
    isChecked : boolean
    volume :number
    elapsedTime : number
    duration:number
}

const initialVideoState:IVideoProps = {
    wantedVideo : [],
    index : 0,
    shuffledIndices : [],
    prevIndex : [],
    isPlaying:false,
    isMuted:false,
    isLoop : false,
    isRandom : false,
    isChecked :false,
    volume : 0.3,
    elapsedTime : 0,
    duration : 0,
}

const videoSlice = createSlice({
    name : 'video' ,
    initialState :initialVideoState ,
    reducers : {
        initPrevIndex(state) {
            state.prevIndex = []
        },
        setSelectedVideo(state,action) {
            state.selectedVideo = action.payload
        },
        setShuffleIndex(state,action) {
            state.shuffledIndices = action.payload
        },
        addShuffledIndices(state,action) {
            state.shuffledIndices = [action.payload,...state.shuffledIndices]
        },
        shiftShuffledIndices(state) {
            state.shuffledIndices.shift()
        },
        currentIndex(state, action) {
            state.index = action.payload
        },
        addPrevIndex(state,action) {
            state.prevIndex = [action.payload , ...state.prevIndex]
        },
        setPrevIndex(state) {
            state.prevIndex.shift()
        },
        setIsPlaying(state) {
            state.isPlaying = !state.isPlaying
        },
        setIsMuted(state,action) {
            action.payload ? state.isMuted = action.payload : state.isMuted = !state.isMuted
        },
        setIsLoop(state) {
            state.isLoop = !state.isLoop
        },
        setIsRandom(state) {
            state.isRandom = !state.isRandom
        },
        setVolume(state,action) {
            state.volume = action.payload
        },
        setElapsedTime(state,action) {
            state.elapsedTime = action.payload
        },
        setDuration(state,action) {
            state.duration = action.payload
        },
        setWantedVideo(state,action) {
            state.isChecked = action.payload.check
            state.wantedVideo = state.wantedVideo.concat(action.payload.video)
        },
        setRemoveVideo(state,action) {
            state.isChecked = action.payload.check
            state.wantedVideo = state.wantedVideo.filter(video => video.id !== action.payload.video.id)
        }
    }
})

export const videoActions = videoSlice.actions
export default videoSlice.reducer