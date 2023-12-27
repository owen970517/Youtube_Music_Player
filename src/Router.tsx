import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import PlayLists from "./components/playlists/PlayLists";
import Charts from "./components/Charts";
import Header from "./layout/Header";
import NotFound from "./pages/NotFound";

export const Router = createBrowserRouter([
    {
        path : '/',
        element : <App/>,
        children : [
            {
                path : '' ,
                element : <Home/>,
            },
            {
                path :"playlist" ,
                element : <PlayLists/>
            },
            {
                path : 'charts',
                element : <Charts/>
            },
            {
                path : 'mylist',
                element : <PlayLists/>
            }
        ],
        errorElement: (
            <>
                <Header />
                <NotFound errorStatus={404} />
            </>
        ),
    }
])