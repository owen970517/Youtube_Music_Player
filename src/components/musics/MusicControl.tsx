import React, { useState } from 'react'
import styled from 'styled-components'
import { formatElapsed } from '../../utils/changeTimeFormat'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/store/store'
import ReactPlayer from 'react-player'
import { videoActions } from 'src/store/videoSlice'
import MuteSpeaker from '../../data/Mute_Icon.svg'
import Speaker from '../../data/Speaker_Icon.svg'
import Play from '../../data/play.svg'
import Pause from '../../data/pause.svg'
import Prev from '../../data/prev.svg'
import Next from '../../data/next.svg'
import Loop from '../../data/loop-69.svg'
import NotLoop from '../../data/loop-none.svg'
import Random from '../../data/random.svg'

const MusicControl = ({videoRef,handleNextVideo}:{videoRef:React.RefObject<ReactPlayer>,handleNextVideo:() => void}) => {
  const dispatch = useDispatch<AppDispatch>()
  const [isHovered, setIsHovered] = useState(false);
  const {isPlaying,isMuted,volume,isLoop,elapsedTime,duration} = useSelector((state:RootState) => state.video)
  const videoIndex = useSelector((state:RootState) => state.video.index)
  const totalTime = videoRef?.current?.getDuration() || 0
  let nowTime = formatElapsed(elapsedTime)
  const togglePlaying = () => {
    dispatch(videoActions.setIsPlaying())
  }
  const onVolumeChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value)/100
    dispatch(videoActions.setVolume(newValue))
  }
  const handlePrevVideo = () => {
    if (videoIndex > 0) {
      dispatch(videoActions.currentIndex(videoIndex-1))
    }
  }
  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLInputElement>) => {
    const newElapsedTime = parseInt(e.currentTarget.value);
    dispatch(videoActions.setElapsedTime(newElapsedTime));
    videoRef.current?.seekTo(newElapsedTime);
  };
  const onMutedToggle = () => {
    dispatch(videoActions.setIsMuted(null))
  }
  const onToggleLoop = () => {
    dispatch(videoActions.setIsLoop())
  }
  const onRandomToggle = () => {
    dispatch(videoActions.setIsRandom())
  }

  return (
    <ControlContainer>
      <span>{nowTime} | {duration}</span>
      <ProgressBar max={totalTime} value={elapsedTime} onChange={handleSeekChange} onClick={handleSeekChange}/>
      <div style={{display:'flex' , justifyContent : 'center', cursor:'pointer' }}>
        <img src={Random} alt='random_btn' onClick={onRandomToggle} style={{width :'30px', height : '30px'}}/>
        <img src={Prev} alt='prev' onClick={handlePrevVideo} style={{width :'30px', height : '30px'}}></img>
        {isPlaying ? <img src={Pause} alt='pause' style={{width :'30px', height : '30px'}} onClick={togglePlaying}/> : <img src={Play} alt='play' style={{width :'30px', height : '30px'}} onClick={togglePlaying}/>}
        <img src={Next} alt="next" onClick={handleNextVideo} style={{width :'30px', height : '30px'}}></img>
        {isLoop ? <img src={Loop} alt='loop' onClick={onToggleLoop} style={{width :'30px', height : '30px'}}/> : <img src={NotLoop} alt='not loop' onClick={onToggleLoop} style={{width :'30px', height : '30px'}}/>}
        <VolumeControls volume={volume * 100} isMuted={isMuted} isHovered={isHovered} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
          <input type='range' value={isMuted ? 0 : volume * 100} min='0' max='100' onChange={onVolumeChange} step='10'/>
          {isMuted || volume * 100 === 0 ? <img src={MuteSpeaker} alt='muted' style={{width :'30px', height : '30px'}} onClick={onMutedToggle}/> : <img src={Speaker} alt='speaker' style={{width :'30px', height : '30px'}} onClick={() => onMutedToggle()}/>}
        </VolumeControls>
      </div>
    </ControlContainer>
  )
}
const ControlContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const VolumeControls = styled.div<{ volume: number; isMuted: boolean; isHovered: boolean }>`
  display :flex;
  align-items: center;
  height: 100%;
  position: relative;
  flex-direction: ${(props) => (props.isHovered ? 'column' : '')};

  input[type='range'] {
    display: ${(props) => (props.isHovered ? 'block' : 'none')};
    transform: rotate(-90deg);
    position: absolute;
    top:-70px;
    -webkit-appearance: none;
    background: #d9d9d9;
    outline: none;
    opacity: 0.7;
    transition: opacity 0.2s;

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 12px;
      height: 12px;
      background: #ffffff;
      border-radius: 50%;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    &::-webkit-slider-thumb:hover {
      background-color: #bfbfbf;
    }

    &::-webkit-slider-thumb:active {
      background-color: #999999;
    }
    &::-webkit-slider-runnable-track {
      height: 0.6rem;
      background: ${(props) =>
        props.volume && !props.isMuted
          ? `linear-gradient(to right, red ${props.volume}%, rgba(229, 231, 235, 0.5)
        ${props.volume}% 100%)`
          : "#E5E7EB"};
      border-radius: 20px;
      transition: all 0.5s;
      cursor: pointer;
    }
  }
`
const ProgressBar = styled.input.attrs(props => ({
    type: 'range',
    min: '0',
    max: props.max ? props.max : '0',
    value: props.value,
  }))`
    width: 100%;
    height: 10px;
    background-color: #ddd;
    outline: none;
    opacity: .7;
    
     /* Chrome */
     &::-webkit-slider-thumb {
      -webkit-appearance:none;
      width:20px;
      height :20px;
      background-color:#4CAF50; 
     }
    
  `;
export default MusicControl
