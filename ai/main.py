from tensorflow.keras.utils import img_to_array
# from keras.applications import imagenet_utils
from PIL import Image
# import matplotlib.pyplot as plt
from tensorflow.keras import models
import numpy as np
import flask
from flask_cors import CORS
import io
import os

# Flask 애플리케이션과 Keras 모델을 초기화합니다.
app = flask.Flask(__name__)
CORS(app)

model = None

#개 모델 불러오기
def load_model(modelPath):
    return models.load_model(modelPath)



#이미지 전처리
def prepare_image(image, target):
    # 만약 이미지가 RGB가 아니라면, RGB로 변환해줍니다.
    if image.mode != "RGB":
        image = image.convert("RGB")

    # 입력 이미지 사이즈를 재정의하고 사전 처리를 진행합니다.
    image = image.resize(target)
    
    #인풋 이미지 확인 / 콘솔환경 주석
    # plt.imshow(image)
    # plt.show()
    
    image = img_to_array(image)
    image = np.expand_dims(image, axis=0)
    image = image/255.0

    # 처리된 이미지를 반환합니다.
    return image

#예측 결과값 큰순서로 인덱스 n개만큼 리턴
def decode_predictions(arr, n=1):
    #인덱스기준 내림차순 정렬
    ranked = np.argsort(arr)
    largest_indices = ranked[::-1][:n]
   
    return largest_indices

#개품종 분석 라우팅
@app.route("/predictdog", methods=["POST"])
def predictdog():

    print('='*20)
    print("get predict DOG request")

    # view로부터 반환될 데이터 딕셔너리를 초기화합니다.
    data = {"success": False}

    # 이미지가 엔트포인트에 올바르게 업로드 되었는디 확인하세요
    if flask.request.method == "POST":
        if flask.request.files.get("image"):
            # PIL 형식으로 이미지를 읽어옵니다.
            image = flask.request.files["image"].read()
            image = Image.open(io.BytesIO(image))

            # 분류를 위해 이미지를 전처리합니다.
            # 우리 모델은 인풋 300x300
            image = prepare_image(image, target=(300, 300))

            # 입력 이미지를 분류하고 클라이언트로부터 반환되는 예측치들의 리스트를 초기화 합니다.
            preds = dog_model.predict(image)
            # results = imagenet_utils.decode_predictions(preds)
            # 우리모델은 기존 레이블정보 없이 강아지 레이블 만 존재
            # print(preds.shape)
            # 결과값 차원변경
            preds = np.squeeze(preds, axis=0)
            # print(preds.shape)
            data["predictions"] = []
            # 예측값 순서대로 정한 갯수만큼 리턴(argmax)
            results = decode_predictions(preds, n=3)
            
            # 결과를 반복하여 반환된 예측 목록에 추가
            for idx in results:
                #인덱스값 (0~126) > (1~127)
                r = {'label':int(idx + 1), 'probability':float(preds[idx])}
                print(r)
                data['predictions'].append(r)

            # 요청이 성공했음을 나타냅니다.
            data["success"] = True

    # JSON 형식으로 데이터 딕셔너리를 반환합니다.
    return flask.jsonify(data)


#고양이 분석
@app.route("/predictcat", methods=["POST"])
def predictcat():

    print('='*20)
    print("get predict CAT request")

    # view로부터 반환될 데이터 딕셔너리를 초기화합니다.
    data = {"success": False}

    # 이미지가 엔트포인트에 올바르게 업로드 되었는디 확인하세요
    if flask.request.method == "POST":
        if flask.request.files.get("image"):
            # PIL 형식으로 이미지를 읽어옵니다.
            image = flask.request.files["image"].read()
            image = Image.open(io.BytesIO(image))

            # 분류를 위해 이미지를 전처리합니다.
            # 우리 모델은 인풋 300x300
            image = prepare_image(image, target=(300, 300))

            # 입력 이미지를 분류하고 클라이언트로부터 반환되는 예측치들의 리스트를 초기화 합니다.
            preds = cat_model.predict(image)
            # results = imagenet_utils.decode_predictions(preds)
            # 우리모델은 기존 레이블정보 없이 강아지 레이블 만 존재
            # print(preds.shape)
            # 결과값 차원변경
            preds = np.squeeze(preds, axis=0)
            # print(preds.shape)
            data["predictions"] = []
            # 예측값 순서대로 정한 갯수만큼 리턴(argmax)
            results = decode_predictions(preds, n=3)
            
            # 결과를 반복하여 반환된 예측 목록에 추가
            for idx in results:
                #인덱스값 (0~126) > (1~127)
                r = {'label':int(idx + 1), 'probability':float(preds[idx])}
                print(r)
                data['predictions'].append(r)

            # 요청이 성공했음을 나타냅니다.
            data["success"] = True

    # JSON 형식으로 데이터 딕셔너리를 반환합니다.
    return flask.jsonify(data)


# 실행에서 메인 쓰레드인 경우, 먼저 모델을 불러온 뒤 서버를 시작합니다.
if __name__ == "__main__":
    print(("* Loading Keras model and Flask starting server..."
        "please wait until server has fully started"))
    #모델 경로
    # print(os.getcwd())
    # modelPath = './models/EfficientNetV2Sall.h5'
    
    global dog_model
    dog_modelPath = os.path.join(os.getcwd(), 'models', 'EfficientNetV2Sall.h5')
    print(dog_modelPath)
    dog_model = load_model(dog_modelPath)

    global cat_model
    cat_modelPath = os.path.join(os.getcwd(), 'models', 'EfficientNetV2Sall_cat.h5')
    print(cat_modelPath)
    cat_model = load_model(cat_modelPath)
    print('==SERVER READY==')
    app.run(host='0.0.0.0', port=8080)


