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

# 4. 핵심 기능
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


# 5. 핵심 트러블 슈팅
