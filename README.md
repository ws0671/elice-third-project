# auto build 사용법

두 개의 shell script는 mongoDB와 MySQL을 사용하는 프로젝트를 생성한다.  
백엔드는 node js를 이용한 3계층 구조로 생성된다.  
mongoDB 프로젝트는 service에서 쿼리문을 사용하는 형식으로 되어 있다.  
MySQL 프로젝트는 Sequelize를 사용하는 구조로 되어 있으며 sequelize-cli를 전역으로 설치한 후 sequelize 초기화를 해 준다.

프론트는 두 경우 모두 react를 사용했으며, public 파일에서 사용하지 않는 파일을 삭제해준다.

## git clone

```shell
git clone https://github.com/nowgnas/project-auto-build.git
```

git clone으로 repository를 작업 공간에 clone한다.

```shell
sudo rm -r .git
```

clone한 경로에서 .git 폴더를 삭제해준다.

```shell
# mongoDB build
sh mongobuild.sh
# mysql build
sh mysqlbuild.sh
# nest build
sh nestbuild.sh
```

원하는 데이터베이스에 따라 명령어를 선택해 실행해 준다.

## 폴더 구조

### mysql build

```shell
.
└── src
    ├── controller
    ├── db
    │   ├── config
    │   ├── migrations
    │   └── models
    ├── middlewares
    ├── routes
    └── services
```

### mongoDB build

```shell
.
└── src
    ├── controllers
    ├── db
    │   └── schemas
    ├── middlewares
    ├── routes
    └── services
```

폴더 구조는 다음과 같다.

### nest build

back은 nest 프레임워크로 구성된다. 기본 패키지 관리자는 yarn이다
