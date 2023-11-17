import React from "react"
import { Route, Routes } from "react-router-dom"
import Home from "./Home"
import Channel from "./Channel"
import Charts from "../components/Charts"
import PlayLists from "src/components/playlists/PlayLists"
import CoverPlaylists from "src/components/playlists/CoverPlaylists"

const Page:React.FC = () =>{
    return (
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/channel/:id" element={<Channel/>}/>
            <Route path='/playlist' element={<PlayLists/>}/>
            <Route path='/charts' element={<Charts/>}/>
            <Route path='/cover' element={<CoverPlaylists/>}/>
            <Route path='/mylist' element={<PlayLists/>}/>
        </Routes>
    )
}

export default Page