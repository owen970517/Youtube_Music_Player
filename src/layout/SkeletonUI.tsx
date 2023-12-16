import React from 'react'
import styled, { keyframes } from 'styled-components';

const SkeletonUI = () => {
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
  width : 80%;
  display: flex;
  justify-content: space-around;
  margin : 0 auto;
  align-items: center;
  border: 1px solid lightgray;
  border-radius: 5px;
  box-shadow: 3px 3px 5px 0px rgba(191, 191, 191, 0.53);
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
  width: 3%;
  height: 20px;
  animation: ${shimmer} 1.5s infinite linear;
`;

const SkeletonThumb = styled(LoadingSkeleton)`
  width: 10%;
  height: 50px;
  animation: ${shimmer} 1.5s infinite linear;
`;

const SkeletonTitle = styled(LoadingSkeleton)`
  width: 45%;
  height: 20px;
  animation: ${shimmer} 1.5s infinite linear;
`;

const SkeletonTime = styled(LoadingSkeleton)`
  width: 7%;
  height: 20px;
  animation: ${shimmer} 1.5s infinite linear;
`;

const SkeletonViews = styled(LoadingSkeleton)`
  width: 10%;
  height: 20px;
  animation: ${shimmer} 1.5s infinite linear;
`;
export default SkeletonUI