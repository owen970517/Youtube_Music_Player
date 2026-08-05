import React from 'react'
import styled, { keyframes } from 'styled-components';

const Top10SkeletonUI = () => {
  return (
    <SkeletonWrapper>
        <SkeletonRankCell>
          <SkeletonIdx/>
        </SkeletonRankCell>
        <SkeletonTrackCell>
          <SkeletonThumb/>
          <SkeletonTitle/>
        </SkeletonTrackCell>
        <SkeletonMetaCell>
          <SkeletonTime/>
        </SkeletonMetaCell>
        <SkeletonMetaCell>
          <SkeletonViews/>
        </SkeletonMetaCell>
    </SkeletonWrapper>
  )
}
const SkeletonWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 1px solid #f1f2f4;

  @media (max-width: 768px) {
    padding: 8px 12px;
  }
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
  background: #e9ecef;
  border-radius: 4px;
  width: 100%;
  height: 100%;
  animation: ${shimmer} 1.5s infinite linear;
`;

const SkeletonRankCell = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`

const SkeletonTrackCell = styled.div`
  flex: 3;
  display: flex;
  align-items: center;
  gap: 14px;

  @media (max-width: 768px) {
    gap: 8px;
  }
`

const SkeletonMetaCell = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`

const SkeletonIdx = styled(LoadingSkeleton)`
  width: 28px;
  height: 24px;
`;

const SkeletonThumb = styled(LoadingSkeleton)`
  flex-shrink: 0;
  width: 56px;
  height: 56px;
  border-radius: 10px;

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    border-radius: 8px;
  }
`;

const SkeletonTitle = styled(LoadingSkeleton)`
  width: 100%;
  height: 16px;
`;

const SkeletonTime = styled(LoadingSkeleton)`
  width: 70%;
  height: 14px;
`;

const SkeletonViews = styled(LoadingSkeleton)`
  width: 70%;
  height: 14px;
`;
export default Top10SkeletonUI