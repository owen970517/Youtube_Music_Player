# youtube clone 

## 설치 방법 및 실행

- git clone https://github.com/owen970517/youtube_clone.git
- npm install
- npm start

## 화면 구성 

| 메인 페이지 |

<img width="100%" alt="issueList_gif" src="https://github.com/owen970517/pre_onboarding_4th/assets/75247323/9f1f7e1a-8792-45f3-ab0e-5fc0ec49e436" /> 

| 플레이리스트 |

<img width="100%" alt="issueDetail_gif" src="https://github.com/owen970517/pre_onboarding_4th/assets/75247323/9497fd41-cd8a-4a70-98da-ebbd836a06a5" />

| 원하는 플레이리스트 | 

<img width="100%" alt="issueDetail_gif" src="https://github.com/owen970517/Youtube_Music_Player/assets/75247323/2250eccb-9d48-443e-b6c5-119abb22a3ec" />


## 사용한 라이브러리

- ReactJS
- TypeScript 
    - 좋은 자동완성과 안전한 개발을 위해 사용
- styled-components
    - UI 컴포넌트를 작성하기 위해 사용
- React-Player 
    - 유튜브 동영상을 음악 플레이어처럼 만들기 위해 사용
- react-router-dom
    - 페이지 이동을 위해 사용
- useNavigate
    - 페이지 전환 시 파라미터를 전달하기 위해 사용 
- useParams
    - query string의 매개변수 값을 받아오기 위해 사용 
- redux toolkit
    - 상태관리를 위해 사용 
- react-slick 
    - 슬라이더 기능을 구현하기 위해 사용

## 기능

- 메인페이지 
    - 커버곡과 라이브 클립을 각각 내림차순으로 정렬하여 보여줌 
    - 최근에 업로드 된 10곡을 react-slick을 사용하여 슬라이더 형식으로 보여줌 

- 차트페이지 
    - 커버곡, 라이브 클립을 합친 후 내림차순으로 보여줌
    - 전체곡을 재생할 수 있는 버튼을 만듦
    - checkbox를 사용하여 자신이 원하는 곡만 들을 수 있도록 만듦

- 플레이리스트
    - react-player를 사용하여 만듦
    - 재생,멈춤,다음곡,이전곡,랜덤재생, 반복재생,볼륨 조절 기능을 구현
    - 필터 버튼을 만들어 해당 값이 포함된 곡만 보여주도록 구현

## 트러블 슈팅

### 1. SameSite 에러 

- **youtube api로 동영상을 불러올 때 마다 console issues에 에러 발생**

    <br/>
    <img width='100%' src='https://github.com/owen970517/youtube_clone/assets/75247323/a689e914-ed01-46a1-99da-c9474f9a9fda'>
    <br/>

- **해결 방법**
  - 유튜브가 기본적으로 추적 쿠키를 설정하기 때문에 클라이언트 단에서 완전히 없애긴 불가
  - ReactPlayer 컴포넌트 내부에 아래 코드 추가 
    <details>
      <summary><b>👈코드 보기</b></summary>
        <div markdown="1">
            <ul>
                https://github.com/owen970517/Youtube_Music_Player/blob/c15ea24b2a3cbca2fe5624dd5e117c42817ba007/src/components/musics/Music.tsx#L104-L113
            </ul>
        </div>
    </details>
  - 처음보단 숫자가 줄어든 것을 확인할 수 있었습니다. 
    <br/>
    <img width='100%' src='https://github.com/owen970517/youtube_clone/assets/75247323/9b6c581e-a0ba-495a-8193-cc6513eb0505'>
    <br/>


### 2. 랜덤 재생 시 같은 곡이 또 재생되는 현상 발생 

- **원인**
    - 매번 math.random을 사용해서 0 ~ 전체 길이 사이에서 랜덤한 값을 뽑았기 때문에 같은 곡이 또 재생되었음

- **해결 방법**
    - 랜덤 재생 시 랜덤으로 배열을 만든 후 앞에서 부터 차례로 재생하도록 구현

    - 랜덤 배열 만드는 코드 
        <details>
        <summary><b>👈코드 보기</b></summary>
            <div markdown="1">
                <ul>
                    https://github.com/owen970517/Youtube_Music_Player/blob/6c5811ec3af9f6529987a60566bf46dee140d179/src/utils/shufflePlay.ts#L1-L16
                </ul>
            </div>
        </details>

    - 랜덤 배열의 앞에서 부터 차례로 실행되는 코드
        <details>
        <summary><b>👈코드 보기</b></summary>
            <div markdown="1">
                <ul>
                    https://github.com/owen970517/Youtube_Music_Player/blob/6c5811ec3af9f6529987a60566bf46dee140d179/src/components/musics/Music.tsx#L23-L33
                </ul>
            </div>
        </details>

    - 랜덤 재생 중 전부 실행됐을 때 다시 새로운 배열 생성
        <details>
        <summary><b>👈코드 보기</b></summary>
            <div markdown="1">
                <ul>
                    https://github.com/owen970517/Youtube_Music_Player/blob/6c5811ec3af9f6529987a60566bf46dee140d179/src/components/musics/Music.tsx#L35-L42
                </ul>
            </div>
        </details> 
