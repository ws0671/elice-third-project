# poetry 설치 - 파이썬 의존성 패키지 관리 툴

## pip 로 설치
pip install --user poetry

## 맥/리눅스
curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py | python -

## 윈도우
(Invoke-WebRequest -Uri https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py -UseBasicParsing).Content | python -


## poetry 설치 이후 쉘 리스타트 필요
poetry 환경 패스 적용 때문.

# 정상작동 버전 확인
poetry --version 


## 패키지 인스톨
poetry install


# 모델 넣기
ai 폴더 안에 models 폴더 생성

디스코드 ai 공유 카테고리에 올라온 링크에서 
- EfficientNetV2Sall.h5
- EfficientNetV2Sall_cat.h5

두 개의 모델파일을 다운 받아서 models 폴더 안에 저장

# ai 서버 실행
ai폴더 이동
main.py 실행
poetry run python main.py


# API
포트 : 5005

개 품종 분석 
[POST] "http://localhost:5005/predictdog"

고양이 품종 분석 
[POST] "http://localhost:5005/predictcat"

### ==request==
json 페이로드로 이미지 파일 첨부하여 요청
requests.post(KERAS_REST_API_URL, files=payload).json()
이미지 전처리는 서버에서 진행. 이미지를 담아보내기만 하면됨

### ==response==
JSON 파일포멧
data['success'] : 정상 동작체크 True/False
data['predictions'] : 예측 항목(딕셔너리)들 배열
  ㄴ {'label':레이블인덱스, 'probability':확률(0.0~1.0)}
  예측 항목은 기본 3개로 설정됨


### 참조 문서 
https://mattpy.tistory.com/entry/Pyenv-Poetry%EB%A1%9C-Python-%EA%B0%9C%EB%B0%9C%ED%99%98%EA%B2%BD-%EB%A7%8C%EB%93%A4%EA%B8%B0

