import { createGlobalStyle } from "styled-components";
import GmarketSansTTFBold from '../data/GmarketSansTTFBold.ttf';
import GmarketSansTTFMedium from '../data/GmarketSansTTFMedium.ttf'
import GmarketSansTTFLight from '../data/GmarketSansTTFLight.ttf'

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

  @font-face {
    font-family: 'GmarketSansTTFLight';
    src: url(${GmarketSansTTFLight}) format('truetype');
    font-weight: 300;
    font-style: normal;
  }
  p,h1 {
    font-family: 'GmarketSansTTFBold', sans-serif;
  }
  p,h3 {
    font-family: 'GmarketSansTTFMedium', sans-serif;
  }
  *, *::before, *::after {
    box-sizing: border-box;
  }



`