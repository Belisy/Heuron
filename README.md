<div >

# **Heuron**

## **1. 사용 기술**

**1-1.필수 요구 기술**  
 ES6 이상의 JavaScript
 TypeScript
 React 
 <br/>  

 **1-2.선택 기술 및 설치 라이브러리**  
 react-router-dom  
 Styled-components  
 axios  
 craco  
 Eslint  
 husky  
 lint-staged  
 react-error-boundary  

<br/>
<br/>

## **2. 요구 사항**

 **2-1. 공통**
- [x] 모든 페이지 이동은 새 탭이나 새 창이 아닌 페이지 전환입니다.  
- [x] 모든 페이지는 별도로 URL 이 부여되어야 하며, 브라우저 입력창에 URL 을 직접 입력해도 페이지에 접근이 가능해야 합니다.  
- [x] API 호출 시 로딩 표시가 나타나야 하며, 응답이 완료되었을 때 로딩 표시가 사라져야
합니다.  
- [x] API 호출 실패 등 API 관련 모든 에러는 발생 시 예외 처리되며, 사용자의 액션을
방해하지 않아야 합니다.
         <br/>

 **2-2. 목록 화면**
- [x] Lorem Picsum - API (https://picsum.photos/v2/list)를 활용해서 목록 화면을
구성합니다.   
- [x] 응답 받은 데이터 목록으로 테이블 화면을 작성하며, 그 중 썸네일 이미지를 테이블에
표시합니다.
<br/>

 **2-3. 상세 화면**
- [x] Lorem Picsum - API (https://picsum.photos/v2/list)를 활용해서 상세 화면 – 이미지
갤러리를 구성합니다. 
- [x] 동일한 API 로 목록 화면과 상세 화면을 구현하기 때문에 적절한 JSON 데이터의 가공이
필요합니다 
- [x] 불러온 이미지 목록 중에 Canvas API 를 통해 1 개의 이미지만 표시되게끔 처리합니다.
- [ ] 마우스 휠 이벤트에 따라 Canvas 에 이미지가 순차적으로 표시되어야 합니다.
- [x] 마우스 (왼쪽 클릭 + 드래그) 이벤트 발생 시 이미지 확대/축소가 되어야 합니다.
- [x] 마우스 (오른쪽 클릭 + 드래그) 이벤트 발생 시 이미지 회전이 되어야 합니다.
<br/>

**2-4. 선택 사항**
- [x]  Eslint, gitignore 등 협업을 위한 최소한의 설정들을 적용합니다. 
<br/>

**2-4. 추가 구현**
- [x] 목록 화면 무한스크롤 적용
- [x] 무한스크롤 적용하지 않은 파일 추가 (DifferentHome / Router는 적용하지 않았습니다.)


<br/>

## **3. 상세 설명**

1. Lorem Picsum API 불러오는 방식  
 1-1. 리액트 쿼리를 사용할지 고민했는데, 프로젝트 규모가 작기 때문에 axios만으로도 충분하다고 판단이 되어서 라이브러리를 따로 사용하지 않았습니다. 하지만, 실무에서는 프로젝트의 특성이나 규모에 따라 적절한 라이브러리를 사용하는 것은 개발의 능률을 높일 수 있기 때문에 적절하게 선택하는 것이 좋다고 생각합니다.  
 1-2. axios를 바로 불러오지 않고, axios라는 폴더를 생성하여 재사용할 수 있도록 컴포넌트화 했습니다.
<br/>

2. 환경 설정   
 2-1. 절대 경로를 사용하기 위해 Paths를 설정해야 하는데, CRA를 이용했기 때문에 craco를 설치하여 'tsconfig.paths.json'파일에 경로를 설정했습니다.  
 2-2. 개인 프로젝트이지만 협업하듯이 진행하기 위해 Eslint와 husky, lint-staged를 설정하였습니다.  
 2-3. react-error-boundary를 설치하였는데 그 이유는, React에서 제공하는 ErrorBoundary는 생명주기 메서드와 관련이 되어 class함수에서만 사용할 수 있기 때문에 hook에서 사용하기 위해 설치했습니다.  
 2-4. 스타일을 입히기 위해 styled-components를 설치하였고, styled-reset을 설치해서 브라우저마다 각기 다르게 보일 수 있는 스타일들을 초기화 시켜준 후, Global 스타일을 만들어서 통일성을 주었습니다.  
<br/>
 
3. 목록 화면  
 3-1. 목록화면에서 이미지 테이블들은 InfiniteScroll 컴포넌트로 불러오도록 하였으며,  
 Intersection Observer API를 이용하여 목록화면에 무한스크롤을 적용하였습니다.   
 3-2. 무한스크롤을 적용하지 않은 파일(DifferentHome)도 참고하실 수 있도록 임시로 만들어서 저장해놓았으며, 대신 라우터설정은 하지 않았습니다.  
 3-3. 무한스크롤을 적용하지 않은 상태에서는 api호출시 로딩 또는 에러일때 각각의 UI부분이 간단하게 구현이 되었지만, 무한스크롤을 적용한 페이지에서는 생각대로 작동하지 않아서 시간상 주석처리 후, push해 놓았습니다.  
 3-4. axios로 받아온 데이터 목록들을 가공하였습니다. 그런데, 요구사항에 나와있는 thumbnail이라는 key값은 api응답 목록에 존재하지 않아서 download_url을 thumbnail의 key값에 넣어서 사용했습니다.  
 가공한 데이터 중, name같은 경우 각 이미지 아래에 넣기 위해 설정했으나, 구현시 사용하지는 않았습니다. 추후 리팩토링시 이미지 아래에 name을 넣거나 또는 삭제할 예정입니다.  
<br/>
 
4. 상세 화면  
 4-1. 데이터를 받아오는 방식을 두 가지 경우로 나눴습니다.  
 첫째, 목록 화면에서 Link를 눌러 이동한 경우  
 둘째, 직접 url을 입력하여 이동한 경우  
 데이터를 계속 서버에서 불러오는 것은 비효율적이라고 생각하여 첫번째 경우, Link의 state로 넘겨서 useLocation으로 url을 받아오는 방식을 적용했습니다.
 두번째 경우, url을 목록 화면에서 받아올 수 없기 때문에 axios로 데이터를 받아왔습니다.  
 그리고, 각각의 경우는 if문으로 분기처리를 했습니다.  
 4-2. 마우스 이벤트와 관련된 것들과 canvas와 관련된 코드들을 각각 나누어 커스텀 훅으로 만들어서 모듈화 시켰습니다.  
 4-3. InfiniteScroll파일과 Detail>index.tsx파일에서 fetchData함수 안의 일부 코드가 중복이 되어,  hooks폴더에 있는 useFetchData파일을 생성하여 이 곳으로 옮기려고 하였지만 아직 분리를 하지 못한 상태로 고민을 더 해봐야 합니다.  
 4-4. 회전 및 사이즈 변경은 캔버스 안에서만 유효합니다. (캔버스범위는 분홍색 박스로 구분할 수 있게 해놨습니다. 캔버스 범위 바깥에서는 작동되지 않습니다.)  
 4-5. 회전 및 사이즈 변경은 마우스 클릭한 채로 끌면(드래그) 이미지 회전 및 확대/축소가 됩니다. (개발자도구를 열지 않은 상태에서 진행해주세요.)   
 4-6. 캔버스의 최대 축소값은 '0.1'로 설정하였고, 최대 확대값은 '10'으로 설정했습니다.  
 <br/>
 
5. 기타  
5-1. 전역에서 사용하는 상수와 함수를 utils폴더 내부에 각각 넣어놓았습니다.  


<br/>

## **4. 프로젝트를 마치며 (아쉬운 점)**

과제를 수행하면서, 개발의 효율성을 높이기 위해 코드의 재사용성을 많이 고민했고, 최적화를 고려하려고 했습니다.  
처음에는 목록 화면에서 이미지를 lazy loading을 시키려 했으나, 무한스크롤 특성상 lazy loading을 굳이 적용하지 않아도 된다고 생각하여 lazyloading을 적용하지는 않았습니다.  

다만, 현재 아쉬운 부분은 Detail > index.tsx 파일에서 커스텀 훅을 lazy loading을 적용시키면 어땠을까 생각이 되나, 제출 시간이 임박하여 수정하지는 않았습니다.  
또한, 타입에 any를 사용한 곳이 있는데 이 부분은 개발을 하면서 임시로 넣어놨던 상태로 미처 수정하지 못하고 commit을 하게 되었습니다.  
이 두가지 부분과 시간상 구현하지 못했던 마우스 휠 관련 부분은 과제전형 발표 이후, 코드 리팩토링하면서 보완할 예정입니다.  

