import React, { useEffect, useState } from 'react';
import styled, { keyframes } from "styled-components"
import { Link } from 'react-router-dom';
import HomeImg from '../data/main.png'
import LatestMusics from 'src/components/musics/LatestMusics';
import TopCharts from 'src/components/TopCharts';

function Home() {
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    const imageLoader = new Image();
    imageLoader.src = HomeImg;
    imageLoader.onload = () => setImgLoaded(true);
  }, []);

  return (
    <Main>
      <Hero>
        {imgLoaded ? (
          <HeroImg src={HomeImg} alt="Fria" />
        ) : (
          <HeroSkeleton />
        )}
        <Scrim />
        <HeroContent>
          <Eyebrow>
            <Pulse />
            Official Playlist
          </Eyebrow>
          <Title>Fria Music</Title>
          <Subtitle>모든 프리아 커버곡을 들을 수 있습니다.</Subtitle>
          <Cta to="/playlist">
            <PlayIcon viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </PlayIcon>
            Play the Playlist
          </Cta>
        </HeroContent>
      </Hero>
      <TopCharts/>
      <LatestMusics/>
    </Main>
  )
}

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(234, 33, 41, 0.55);
  }
  70% {
    box-shadow: 0 0 0 6px rgba(234, 33, 41, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(234, 33, 41, 0);
  }
`

const shimmer = keyframes`
  0% { background-position: -400px 0; }
  100% { background-position: 400px 0; }
`

const Main = styled.div`
  display: flex;
  flex-direction: column;
  gap: 56px;
  margin-top: 24px;
  padding-bottom: 8px;

  @media (max-width: 768px) {
    gap: 36px;
    margin-top: 14px;
  }
`

const Hero = styled.div`
  position: relative;
  width: 80%;
  aspect-ratio: 21 / 9;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 20px;
  background-color: #14141a;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.18);

  @media (max-width: 768px) {
    width: 92%;
    aspect-ratio: 4 / 5;
    border-radius: 16px;
  }
`

const HeroImg = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const HeroSkeleton = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, #cfcfd6 0%, #e7e7ec 50%, #cfcfd6 100%);
  background-size: 800px 100%;
  animation: ${shimmer} 1.6s linear infinite;
`

const Scrim = styled.div`
  position: absolute;
  inset: 0;
  background:
    linear-gradient(
      180deg,
      rgba(6, 6, 9, 0.18) 0%,
      rgba(6, 6, 9, 0.4) 42%,
      rgba(6, 6, 9, 0.93) 78%,
      rgba(6, 6, 9, 0.97) 100%
    ),
    linear-gradient(
      100deg,
      rgba(6, 6, 9, 0.8) 0%,
      rgba(6, 6, 9, 0.25) 40%,
      rgba(6, 6, 9, 0) 58%
    );
`

const HeroContent = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  padding: 40px;
  animation: ${fadeInUp} 700ms ease-out both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }

  @media (max-width: 768px) {
    padding: 22px;
    gap: 10px;
  }
`

const Eyebrow = styled.p`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  color: rgba(255, 255, 255, 0.85);
  font-family: 'GmarketSansTTFLight', sans-serif;
  font-size: 13px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: 11px;
  }
`

const Pulse = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #ea2129;
  animation: ${pulse} 2s ease-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const Title = styled.h1`
  margin: 0;
  color: #fff;
  font-family: 'GmarketSansTTFBold', sans-serif;
  font-size: clamp(30px, 4.4vw, 54px);
  letter-spacing: -0.01em;
  line-height: 1.05;
  text-shadow: 0 4px 18px rgba(0, 0, 0, 0.55);
`

const Subtitle = styled.p`
  margin: 0;
  max-width: 440px;
  color: rgba(255, 255, 255, 0.82);
  font-family: 'GmarketSansTTFMedium', sans-serif;
  font-size: 15px;
  line-height: 1.5;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: 13px;
  }
`

const Cta = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  padding: 13px 24px;
  border-radius: 999px;
  background-color: #ea2129;
  color: #fff;
  font-family: 'GmarketSansTTFBold', sans-serif;
  font-size: 14px;
  box-shadow: 0 12px 24px rgba(234, 33, 41, 0.35);
  transition: transform 200ms ease, background-color 200ms ease;

  &:hover {
    background-color: #ff2f38;
    color: #fff;
    transform: translateY(-2px);
  }

  &:focus-visible {
    outline: 2px solid #fff;
    outline-offset: 3px;
  }

  @media (max-width: 768px) {
    padding: 11px 20px;
    font-size: 13px;
  }
`

const PlayIcon = styled.svg`
  width: 14px;
  height: 14px;
  fill: currentColor;
`

export default Home
