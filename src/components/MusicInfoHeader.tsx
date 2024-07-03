import React from 'react'
import styled from 'styled-components'

const MusicInfoHeader = () => {
  return (
    <InfoHeader>
      <HeaderItem width="70px" mw="20px">#</HeaderItem>
      <HeaderItem width="300px" mw="150px">Track/Artist</HeaderItem>
      <HeaderItem width="450px" mw="130px">Time</HeaderItem>
      <HeaderItem width="70px" mw="20px">Views</HeaderItem>
    </InfoHeader>
  );
};

const InfoHeader = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 10px;
`;

const HeaderItem = styled.h3<{ width: string, mw:string }>`
  margin-left: ${(props) => props.width};
  color: #495057;
  font-weight: 700;

  @media (max-width: 768px) {
    margin-left: ${(props) => props.mw};
    font-size: 18px;
  }
`;
export default MusicInfoHeader