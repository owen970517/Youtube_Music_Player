import logo from '../data/Tam logo.png'
import { Link,useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { videoActions } from 'src/store/videoSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';


function Header() {
  const dispatch = useDispatch();
  const location = useLocation()
  const isActive = (path:string) => {
    return location.pathname === path ? 'active' : '';
  };
  useEffect(() => {
    dispatch(videoActions.currentIndex(0)); // Replace with your actual action
  }, [dispatch,location]);
  return (
    <HeaderDiv>
      <Tab>
        <Link to='/'>
          <Logo src={logo} alt="로고" />
        </Link>
      </Tab>
      <Tab>
        <Link to='/charts' style={{marginRight : '50px'}}>
          <Font className={isActive('/charts')}>CHARTS</Font>
        </Link>
        <Link to='/playlist' style={{marginRight : '50px'}}>
          <Font className={isActive('/playlist')}>PLAYLIST</Font>
        </Link>
        <Link to='/mylist' style={{marginRight : '50px'}}>
          <Font className={isActive('/mylist')}>MYLIST</Font>
        </Link>
      </Tab>
    </HeaderDiv>
  );
}
const HeaderDiv = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  width: 100%;
  height: 60px;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  box-sizing: border-box;
  z-index: 10;
`
const Tab = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 50px;
`
const Logo = styled.img` 
  padding-left: 16px;
`
const Font = styled.p`
  color : black;
  font-family: 'gmarket';
  display:inline-block; 
  margin : 0;
  &:hover {   
    display:block;
    content: '';
    border-bottom: solid 3px #ea2129;  
    margin : 0 auto;
   }

  &.active {
    border-bottom: solid 3px #ea2129;
  }
`
export default Header;

