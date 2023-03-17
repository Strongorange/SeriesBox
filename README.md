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
아래는 서비스의 간단한 흐름도입니다.

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
  
  
  



 


