# RewardLotteryWeb
## 프로젝트 목표
 * 킹덤원 추첨을 원활하게 하기 위한 웹 페이지를 만들어본다. 
 
## 프로젝트 결과
 * ~
 
## 기술명세
#### BackEnd & FrontEnd
  * Javascript
#### UI 
  * HTML
#### 라이브러리
  * animate.css
#### 외부API
  * Google SpreadSheets API
  * Google CloudVision API
  * Google Font API

## 기능명세
1. 기본 환경 셋팅
    * .NET MAUI Core 셋팅
      * Windows에서 앱 실행 셋팅
      * Android 물리적 디바이스 앱 실행 셋팅
      * Android Emulator 앱 실행 셋팅
      * 셋팅 상세 내용 : https://www.notion.so/akino0205/NET-MAUI-89fa112cac034fbb8eab51cf5d1a2e89?pvs=4#4870993a7f6c478bb1e897f97671da58
    * VS Code 셋팅
    * git 및 github 연결
    
2. 화면 설계
    * 킹덤원 입력 및 추첨 페이지 1장 (예정)
    * PPT 파일로 작성 (예정)
    
3. 기능 구현 (예정)
    1) 킹덤원 입력 시, 자동완성 기능
        * 자동완성 기능 구현
        * 자동완성 dropdown에 제시될 킹덤원 명단을 킹덤원 명단이 입력된 Google SpreadSheets에서 데이터 가져옴(GoogleSpreadSheets API)
    2) 참여자 및 공헌자 이미지 텍스트 추출 기능
        * 참여자 및 공헌자 관련 이미지 파일 업로드 시, 킹덤원 명단을 토대로 이름을 추출할 수 있도록 함. (GoogleCloudVision API)
    3) 희망자 명단
        * radio 로 희망상품 선택할 수 있도록 함. (ex. 전체, 상품1, 상품2, 상품3...) 
          => 전체는 희망자 상관없이 모든 인원을 대상으로 함. 
        * 킹덤원 명단이 입력된 Google SpreadSheets에서 데이터 가져옴
