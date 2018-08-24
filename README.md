<h1 align="center">
<br>
<img src="images/logo.png" alt="Kidsday" width="240" height="66">
</h1>

<h4 align="center">Nodejs, javascript 를 이용해 안드로이드 앱 서버를 제작한 프로젝트입니다.</h4>

<p align = "center">

[![GitHub license](https://img.shields.io/github/license/Day8/re-frame.svg)](license.txt) ![npm-image]

</p>


## 프로젝트 설명

SK 테크엑스 _'T아카데미'_ 에서 진행한 프로젝트입니다.<br>
기획자 1명, 안드로이드 개발자 2명, 서버 개발자 1명, 디자이너 2명이 한 팀을 이뤄 3개월동안 작업한 프로젝트이며 저는 서버 개발 및 기획으로 참여했습니다.

<h1 align="center">
<img src="images/intro.png" alt="intro" width="300" height="600">
<img src="images/intro1.png" alt="intro" width="300" height="600">
<img src="images/intro2.png" alt="intro" width="300" height="600">
</h1>


## 서비스 설명

<h1 align="center">
<img src="images/serviceInfo.png" alt="intro" width="800" height="450">
</h1>


## 구현 내용

### 서버 구성

<h1 align="center">
<img src="images/server architecture.png" alt="intro" width="800" height="450">
</h1>

### DB

* DB 선택 : MySQL
    - 정형화된 데이터들이 많기 때문에 RDBMS 선택.

* DB 설계
    - 생각보다 많은 데이터 테이블, 여러 관계들을 놓치지 않기 위해서 큰 줄기(Users, Programs, Teachers)를 먼저 만든 후 테이블 간의 관계를 정립해 확장시켜 설계.
    <h1 align="center">
    <img src="images/server architecture.png" alt="intro" width="400" height="150">
    </h1>

* ERR Diagram 모델링을 먼저 해 효율적인 개발과 Sequelize를 통해 DB define 및 sync.
<h1 align="center">
<img src="images/err.png" alt="intro" width="850" height="550">
</h1>

```sh
//child model sequelize define

const Sequelize = require('sequelize');
const sequelize = require('./dbConnect');


const childs = sequelize.define('childs', {
childId: { type: Sequelize.INTEGER, primaryKey: true, autoIncreament: true },
userId: Sequelize.INTEGER,
birthday: Sequelize.STRING(50),
gender: Sequelize.STRING(50)
}, { timestamps: false });

module.exports.childs = childs;

```

### Npm Sequelize / query

* 관계형 데이터베이스를 다루는 방법으로 ORM이라는 툴이 있다. <br>객체와 모델의 매핑으로, SQL 구문 대신 객체를 다루는 방식으로 데이터베이스에 반영되는데, Node.js에서는 Sequelize라는 툴을 사용한다. 

* Sequelize 의 단점은 레퍼런스가 DBMS Query 보다 적다.

* 다양한 테이블을 조인해 데이터를 전달할 경우 쿼리보다 더 복잡해져 가독성과 생산성이 하락함.

* 간단한 요청과 응답에는 Sequelize가 적합하나 복잡해지면 복잡해질수록 생산성이 하락

* 프로젝트 초기 All Sequelize 가면 갈 수록 Query 이용해 코드 작성했음.



### 구현요소 (구현율)

- 컨트롤 (85%)
<br> 키보드로 성의 화살을 움직여 각도 조절과 발사를 컨트롤, 키보드 숫자 키보드로 유닛 생성

- 유닛 (100%) 
<br> 아군 유닛 지상 4개 ,공중 4개
적 유닛 지상 4개, 공중 4개

- 맵 (100%)
<br> 맵 정적인 배경, 각 오브젝트들 구현

- 사운드 (100%)
<br> 기본 BGM 1곡, 공격 효과음 4곡, 성의 화살 효과음 1곡 

- 애니메이션 (90%)
<br> 유닛 공격/이동 상태, 성 화살 공격, 마나/체력 수치 표시

- 난이도 (100%)
<br> 시간 제한, 적 성의 HP 10%이하일때 적 유닛 증가

## 실행 방법


1. [git clone](https://github.com/jangseongwoo/Kidsday.git) 을 하세요.
```sh
git clone https://github.com/jangseongwoo/Kidsday.git
```

2. 터미널을 열어 해당 폴더에 간 후 npm install 명령어를 입력해주세요.
```sh
npm install
```

3. 
```sh
npm start
```

## 개발 환경

- 사용 OS : 윈도우7 64bit
- 개발 툴 : Visual Studio 2013

## 정보

프로젝트에 대한 더 자세한 정보를 원하신다면,  2dgame 폴더 내에 있는 _SDL_보고서.pptx_ 를 참조해주세요.

장성우 – [@facebook](https://www.facebook.com/profile.php?id=100007028118707&ref=bookmarks) – seongwoo.dev@gmail.com

MIT 라이센스를 준수하며 ``LICENSE``에서 자세한 정보를 확인할 수 있습니다.

[https://github.com/jangseongwoo/github-link](https://github.com/jangseongwoo/github-link)

<!-- Markdown link & img dfn's -->
[npm-image]: https://img.shields.io/npm/v/datadog-metrics.svg?style=flat-square
[npm-url]: https://npmjs.org/package/datadog-metrics
[npm-downloads]: https://img.shields.io/npm/dm/datadog-metrics.svg?style=flat-square
[travis-image]: https://img.shields.io/travis/dbader/node-datadog-metrics/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/dbader/node-datadog-metrics
[wiki]: https://github.com/yourname/yourproject/wiki
