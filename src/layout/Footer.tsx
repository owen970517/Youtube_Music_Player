import React from 'react'
import styled from 'styled-components'
import FooterImg from '../data/하단 Tam logo.png'
const Footer = () => {
  return (
    <FooterDiv>
      <Img src={FooterImg} alt='footer'/>
    </FooterDiv>
  )
}
const FooterDiv = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`
const Img = styled.img`
  width: 90px;
  height: 90px;
  
  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }
`
export default Footer