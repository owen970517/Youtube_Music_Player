import React from 'react'
import styled, { keyframes } from 'styled-components';

const Top10SkeletonUI = () => {
  return (
    <SkeletonWrapper>
        <SkeletonIdx/>
        <SkeletonThumb/>
        <SkeletonTitle/>
        <SkeletonTime/>
        <SkeletonViews/>
    </SkeletonWrapper>
  )
}
const SkeletonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #dee2e6;
`
const shimmer = keyframes`
  0% {
      opacity: 1;
  }

  50% {
      opacity: 0.5;
  }

  100% {
      opacity: 1;
  }
`;

const LoadingSkeleton = styled.div`
  background: gray;
  border-radius: 4px;
  width: 100%;
  height: 100%;
`;

const SkeletonIdx = styled(LoadingSkeleton)`
  width: 5%;
  height: 30px;
  animation: ${shimmer} 1.5s infinite linear;
`;

const SkeletonThumb = styled(LoadingSkeleton)`
  width: 70px;
  height: 70px;
  animation: ${shimmer} 1.5s infinite linear;
`;

const SkeletonTitle = styled(LoadingSkeleton)`
  width: 45%;
  height: 20px;
  animation: ${shimmer} 1.5s infinite linear;
`;

const SkeletonTime = styled(LoadingSkeleton)`
  width: 5%;
  height: 20px;
  animation: ${shimmer} 1.5s infinite linear;
`;

const SkeletonViews = styled(LoadingSkeleton)`
  width:5%;
  height: 20px;
  animation: ${shimmer} 1.5s infinite linear;
`;
export default Top10SkeletonUI