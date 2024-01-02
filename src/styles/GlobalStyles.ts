import { createGlobalStyle } from "styled-components";
import GmarketSansTTFBold from '../data/GmarketSansTTFBold.ttf';
import GmarketSansTTFMedium from '../data/GmarketSansTTFMedium.ttf'

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'GmarketSansTTFBold';
    src: url(${GmarketSansTTFBold}) format('truetype');
    font-weight: bold; 
    font-style: normal;
  }

  @font-face {
    font-family: 'GmarketSansTTFMedium';
    src: url(${GmarketSansTTFMedium}) format('truetype');
    font-weight: medium;
    font-style: normal;
  }

  h1 {
    font-family: 'GmarketSansTTFBold', sans-serif;
  }
  p,h3 {
    font-family: 'GmarketSansTTFMedium', sans-serif;
  }
`