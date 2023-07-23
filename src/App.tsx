import { useEffect, useState } from 'react';
import { BrowserRouter} from 'react-router-dom';
import './App.css';
import { authService} from './firebase';
import Page from './pages/Page';
import Header from './layout/Header';
import { IUser } from './type/userType';
import Footer from './layout/Footer';

const App:React.FC= () => {
  const [isLogin , setIsLogin] = useState(false);
  const [userObj , setUserObj] = useState<IUser>();
  useEffect(()=> {
    authService.onAuthStateChanged((user)=> {
        if(user) {
            setIsLogin(true);
            setUserObj({
              displayName : user.displayName! ,
              uid:user.uid,
              updateProfile : (args:IUser) => user.updateProfile(args),
            })
        }else{
            setIsLogin(false)
        }
    })
},[])
const refreshUser = () => {
  const user = authService.currentUser;
  if (user) {
    setUserObj({
      displayName : user.displayName!,
      uid : user.uid,
      updateProfile : (args) => user.updateProfile(args),
    })
  }
}
  return (
    <BrowserRouter>
      <Header isLogin={isLogin} userObj={userObj}/>
      <Page userObj={userObj} refreshUser={refreshUser}/>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;

