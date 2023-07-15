import React from "react"
import { Route, Routes } from "react-router-dom"
import Home from "./Home"
import Channel from "./Channel"
import Login from "./Login"
import Profile from "./Profile"
import Charts from "../components/Charts"
import Artist from "../artist/Artist"
import Album from "../album/Album"
import LiveClip from "../components/playlists/LiveClip"
import DailyCharts from "src/components/DailyCharts"
import { IUserObj } from "src/type/userObjProps"
import SelectedVideos from "../components/musics/SelectedMusics"
import PlayLists from "src/components/playlists/PlayLists"
import CoverPlaylists from "src/components/playlists/CoverPlaylists"


const Page:React.FC<IUserObj> = ({userObj ,refreshUser}) =>{
    return (
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/channel/:id" element={<Channel/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/profile" element={<Profile userObj={userObj} refreshUser={refreshUser}/>}/>
            <Route path='/playlist' element={<PlayLists/>}/>
            <Route path='/charts' element={<Charts/>}/>
            <Route path='/cover' element={<CoverPlaylists/>}/>
            <Route path='/mylist' element={<SelectedVideos/>}/>
            <Route path='/liveclip' element={<LiveClip/>}/>
            <Route path='/artist' element={<DailyCharts/>}/>
            <Route path='/album' element={<Album/>}/>
        </Routes>
    )
}

export default Page