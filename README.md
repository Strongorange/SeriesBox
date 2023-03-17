# 📌 SeriesBox

> 온라인 사진, 동영상 앨범 서비스 </br>
> http://bit.ly/3yJ9S8k

</br>

# 1. 제작 기간 & 참여 인원
- 2022.12.26 ~ 2023.03.15 </br>
- 개인 프로젝트

</br>

# 2. 사용 기술
> 언어 </br>
- TypeScript 4.9.4

> Front-End </br>
- Next.JS 13.1.1 
- TailwindCSS
- zustand

> DB
- Firebase Firestore 9

> Storage
- Firebase Storage 9

</br>

# 3. 핵심 기능
SeriesBox 의 핵심 기능은 컨텐츠 시리즈(=앨범)와 아이템(=사진,영상) 을 추가, 삭제, 조회, 저장 하는 것 입니다. </br>
사용자는 핸드폰의 갤러리 앱 처럼 타인과 공유하거나 클라우드에 저장하고 싶은 사진을 시리즈화 시켜 저장해 어느 기기에서든 확인 할 수 있습니다.</br>
**아래는 서비스의 간단한 흐름도입니다.**

<details>
  <summary><h3>핵심 기능 설명 펼치기</h3></summary>
  <div>
    <div>
      <img src="https://user-images.githubusercontent.com/74127841/225640029-f732b82a-08f5-4087-8bd7-d9ad1e1e38e6.png" />
    </div>
  </div>
  <ul>
    <li>
      <h3>Firebase 의 Firestore, Storage 를 사용해 데이터를 저장, 관리 합니다</h3></br>
      - Firestore 에서 onSnapshot 을 사용해 게스트 계정과 게스트가 아닌 계정을 분류해 실시간으로 데이터를 받아옵니다.
        <a href="https://github.com/Strongorange/SeriesBox/blob/05b2dfdaa922ea8ca40fac49bc182cb2d2b2cfd6/pages/_app.tsx#L26-L51">📌 코드확인
        </a>
        </br>
      - 새로운 시리즈를 만들기 위해 시리즈 이름, 썸네일, 미디어(사진, 영상)을 업로드합니다. 
        <a href="https://github.com/Strongorange/SeriesBox/blob/05b2dfdaa922ea8ca40fac49bc182cb2d2b2cfd6/components/modals/AddSeriesModal.tsx#L98-L205">📌          코드확인
        </a>
        </br>
      - 만들어진 시리즈에 미디어를 업로드 합니다.
         <a href="https://github.com/Strongorange/SeriesBox/blob/05b2dfdaa922ea8ca40fac49bc182cb2d2b2cfd6/components/modals/PushToSeriesModal.tsx#L69-L115">📌 코드확인
        </a>
        </br>
      - Next 서버 사이드 함수를 사용해 페이지 렌더링 전 fileType:image | video 을 알아내어 에러없이 화면을 출력합니다
         <a href="https://github.com/Strongorange/SeriesBox/blob/05b2dfdaa922ea8ca40fac49bc182cb2d2b2cfd6/pages/serieses/%5Bsid%5D/%5Bdetail%5D.tsx#L21-L35">📌 타입확인
        </a>
        <a href="https://github.com/Strongorange/SeriesBox/blob/05b2dfdaa922ea8ca40fac49bc182cb2d2b2cfd6/pages/serieses/%5Bsid%5D/%5Bdetail%5D.tsx#L195-L212">📌 화면 렌더링
        </a>
        </br>
      - 새로고침 이후에도 오류없는 화면을 만들어냅니다
         <a href="https://github.com/Strongorange/SeriesBox/blob/05b2dfdaa922ea8ca40fac49bc182cb2d2b2cfd6/pages/serieses/%5Bsid%5D/%5Bdetail%5D.tsx#L85-L96">📌 serverSide 함수 이용
        </a>
        <a href="https://github.com/Strongorange/SeriesBox/blob/05b2dfdaa922ea8ca40fac49bc182cb2d2b2cfd6/pages/serieses/%5Bsid%5D/index.tsx#L96-L120">📌 localstorage 이용
        </a>
        </br>
    </li>
  </ul>
</details>
</br>


# 4. 핵심 트러블 슈팅 </br>
**4.1 Firebase 의 기본적인 CRUD 기능 처리**</br>
- 혼자 프로젝트의 모든 기능을 제작해야했기에 별도의 백엔드 서버를 추가로 개발하는 것은 기능에 비해 시간이 너무 많이 소요된다고 생각해 사용 경험이있는 Firebase를 사용했습니다.</br>
  하지만 Firestore DB 의 기본이 잡힌 상태가아닌 과거의 경험과 프로젝트, 공식문서를 봐도 쉽게 이해가 가지 않아 생각보다 기능을 습득하는데 시간을 많이 소요했습니다.</br>
- 학습중 [Firestore 구조 알아보기 Part1](https://www.youtube.com/watch?v=dYzbnge59TM) [Firestore 구조 알아보기 Part2](https://www.youtube.com/watch?v=xFi43Ushq9I&t=686s) 유튜브 영상을 보고 기본적인 구조를 익히는 것으로 더 빠르게 학습할 수 있었습니다. </br>

**4.2 Next.JS Image 사용시 이미지 로딩이 너무 늦게 되는 현상** </br>
- 본 프로젝트에서 모든 이미지는 Next/Image 를 사용하여 표시되었습니다.</br>
  - 하지만 이미지를 불러올때까지 PC 환경에서는 평균 3초대 모바일 환경에서는 6초대라는 너무 많은 시간이 걸렸습니다.</br>
  - 또한 이미지가 표시될때까지 해당 영역에는 아무것도 표시되지 않아 사용자는 이미지가 표시될 것을 기대할 수 없었습니다.
  
- 이를 해결하기 위해 다음의 방법을 시도해보았습니다
  - [방법1](https://techblog.wclub.co.kr/posts/0002.nextjs-fast-image/Next.js%20%EC%9D%B4%EB%AF%B8%EC%A7%80%20%EB%8A%A6%EA%B2%8C%20%EB%9C%A8%EB%8A%94%20%EC%9D%B4%EC%8A%88%20%EA%B0%9C%EC%84%A0) priority prop 을 true 로 [📌 코드](https://github.com/Strongorange/SeriesBox/blob/94e1bc97f2e46931b683ede53010978edecb69c1/components/SeriesIem.tsx#L88-L96) 
  - [방법2](https://stackoverflow.com/questions/66637391/next-images-components-are-too-slow-to-appear)  sharp 패키지를 사용하여 이미지 처리속도 향상
  - [방법3] (https://nextjs.org/docs/api-reference/next/image) 이미 로딩된 이미지를 31536000s 동안 캐시하여 추후 로딩시간 제거
  - [방법4](https://nextjs.org/docs/api-reference/next/image) blurDataUrl prop 을 사용해 이미지 로딩 중 회색 영역을 띄워 이미지가 로딩중임을 나타냄 [📌 코드](https://github.com/Strongorange/SeriesBox/blob/94e1bc97f2e46931b683ede53010978edecb69c1/components/SeriesIem.tsx#L88-L96)
  
- 해결된 문제
  - 방법1을 사용하여 이미지 로딩 시간의 개선이 존재했습니다.
  - 방법2를 시도했지만 local 상황에서는 적용되지 않아 해당 방법은 포기하였습니다.
  - 방법3으로 한번 로딩한 이미지는 다음 로딩시 거의 즉시 표시되는 것을 확인했습니다.
  - 방법4로 유저는 이미지가 로딩중임을 알 수 있었습니다.
  
  </br>
  
# 5. 그외 트러블 슈팅 
  
<details>
  <summary>새로고침시 데이터 유지</summary>
  <div>
    <ul>
      <li>화면을 렌더링하는데 필요한 state 가 새로고침시에 초기화되어 오류가나는 문제를 해결하기 위해 localstorage 에 필요한 데이터를 담음</li>
      <ul>
        <li>useEffect를 사용하여 localstorage 에 저장된 데이터를 state 로 옮긴 후 loading state 를 바꿔줌으로 해결 <a href="https://github.com/Strongorange/SeriesBox/blob/afc1137c194360188c19c85b6b129a964f0a86fa/pages/serieses/%5Bsid%5D/index.tsx#L96-L120">📌 코드</a>
        </li>
      </ul>
        <li>
      detail 페이지는 표시되는 사진이 매번 달라 서버 사이드 함수를 사용하여 미디어 표시를 위한 데이터를 받는 형식으로 해결
        </li>
        <ul>
      <li>
        페이지 렌더링 전 서버측에서 미디어의 url, fileType 등의 정보를 전달 <a href="https://github.com/Strongorange/SeriesBox/blob/afc1137c194360188c19c85b6b129a964f0a86fa/pages/serieses/%5Bsid%5D/%5Bdetail%5D.tsx#L21-L35">📌 코드          </a>
      </li>
    </ul>
    </ul>
  
    
  </div>
</details>



<details>
  <summary>업로드시 Storage 에 업로드 확인후 DB 에 저장</summary>
   <div>
    <ul>
      <li>Storage 에 미디어가 올라간 후 DB 업데이트가 아닌 Storage 에 올라갈 것이라고 생각되는 4초뒤에 DB 업데이트 프로세스를 실행시킴</li>
      <li>정상적으로 Storage 에 미디어가 올라간 것을 확인 후 DB 업데이트 프로세스를 진행
        <a href="https://github.com/Strongorange/SeriesBox/commit/41dc8d5f62f0437384607a00950f79e5f0988d81">📌 코드</a>
      </li>
    </ul>
  </div>
</details>

<details>
  <summary>애니메이션 적용시 컴포넌트 종료 애니메이션이 적용 안되던 문제</summary>
   <div>
    <ul>
      <li>컴포넌트가 unMount 될때 의도한 애니메이션이 실행되는 것이 아닌 애니메이션 없이 즉시 사라지는 문제 발견</li>
      <li>컴포넌트 unMount 발생시 delay 이후에 unMount 되게 수정
        <a href="https://github.com/Strongorange/SeriesBox/blob/afc1137c194360188c19c85b6b129a964f0a86fa/components/modals/AddSeriesModal.tsx#L211-L224">📌 코드</a>
      </li>
    </ul>
  </div>
</details>
    
<details>
  <summary>배포시 Guest 모드로 배포</summary>
   <div>
    <ul>
      <li>본 프로젝트는 본인이 사용할 프로젝트와 공개용 프로젝트로 나뉨</li>
      <li>처음에는 branch 를 나누어 branch 마다 state 를 다르게하여 배포할 생각이었지만 기능상 다름이 없는 불필요한 branch 가 나뉘는 것이 싫었음</li>
      <li>ENV 에 개인, 배포 boolean 나누어 배포환경의 환경변수를 다르게하여 다른 버전으로 동작하게 함</li>
    </ul>
  </div>
</details>


# 6.회고/느낀점




