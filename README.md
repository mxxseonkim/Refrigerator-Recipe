# 🙂 냉장고를 부탁해
> 현재 냉장고에 들어있는 식재료를 인식하여 레시피를 추천해주는 어플리케이션입니다.

1. 서비스 설명
2. 냉장고를 부탁해
3. 영수증 인식 및 사물 인식
4. 레시피 추천
![](../header.png)

## 😀 1. 서비스 설명

### 1) 개발 동기
1. 상대적으로 금전적 여유가 적은 자취생들을 위해 냉장고 식재료 관리 및 레시피 추천 서비스 제공
2. 레시피 추천과 식재료 유통기한 관리를 통해 냉장고에 방치되는 식재료 부패 방지

### 2) 시스템 구성
![](https://user-images.githubusercontent.com/78461009/153702809-55db6723-f538-44f0-afbd-67b78b2a79a6.png)

- Youtube : 레시피 추천 시, 사용자가 레시피를 쉽게 이해할 수 있도록 유튜브 API를 통해 해당 레시피 조리 영상을 제공
- Google Cloud Vision API : 영수증 인식 및 사물 인식을 위해 사용되는 API
- Python : 레시피 정보를 저장하기 위해 파이썬 웹크롤링 사용
- Amazon webservices : 서버 구축

### 3) 서비스 화면

![](https://user-images.githubusercontent.com/78461009/153703102-70aff28f-0642-4ce4-879d-9c4aec50fde1.png)
![](https://user-images.githubusercontent.com/78461009/153703121-ddaeebba-24b6-4c5b-ba4c-0e7583d611c4.png)

## 😀 2. 냉장고를 부탁해
### 1) 화면 설명
#### 1-1) 로그인 화면
사용자가 앱을 실행하면 가장 먼저 보이는 화면은 로그인 화면입니다. 

![](https://user-images.githubusercontent.com/78461009/153704357-7eac0cc3-c9eb-4af1-bb73-de3384118b11.png)
+ 아이디 및 비밀번호가 있을 시, 최초 로그인 이후에 로그인이 계속 유지되도록 코드를 구성하였습니다. 
+ 서버(DB)에 저장된 아이디와 사용자가 입력한 아이디가 같으면 0을, 다르면 1을 **result** 변수에 저장합니다.
```sh
    //로그인 체크 쿼리
    let login_check = {
      qry:
        "SELECT * FROM `member` WHERE user_id = '" +
        userId +
        "' and user_pw = '" +
        userPassword +
        "'",
    };
    let result = await DataSet.overlabCheck(login_check);

    // DB 연결 후 loading 해제
    setLoading(false);
``` 
+ result가 1이면 전역변수 userID에 아이디를 저장합니다. result가 0이면 경고창을 띄웁니다.
```sh
if (Number(result)) {
      // 로그인 성공
      //global 모듈에 id 등록 -> 냉장고 테이블
      memberID.userID = userId;
      //로컬에 아이디 저장 -> 자동로그인
      await AsyncStorage.setItem('user_id', userId);
      //성공 후 DrawerTab 이동
      navigation.navigate('DrawerTab');
    } else {
      //로그인 실패
      Alert.alert('경고', '아이디 및 비밀번호를 다시 확인해주세요.');
    }
``` 
## 😀 3. 영수증 인식 및 사물 인식
Google Vision API를 사용하여 영수증에 적힌 글자들을 인식하고 머신러닝 모델로 재료를 인식하여 자동으로 냉장고에 재료 정보가 추가되도록 하였습니다.

![](https://user-images.githubusercontent.com/78461009/153704110-67840d4d-98ed-4567-b100-c3253e475e25.gif)
+ Google Vision API를 사용하기 위해 구글에서 고유 넘버를 받아서 이를 React Native와 연결해주었습니다.
```sh
{
    "googleTranslation": {
      "api": "https://translation.googleapis.com/language/translate/v2?key=",
      "apiKey": "(비공개)"
    }
  }
``` 
```sh
{
    "googleCloud": {
      "api": "https://vision.googleapis.com/v1/images:annotate?key=",
      "apiKey": "(비공개)"
    }
  }
``` 
+ Google Vision과 React Native가 연결되면 구글에 사용자가 카메라로 찍은 이미지를 전송하여 텍스트를 추출합니다. 추출된 정보는 JSON 형태로 받아와서 필요한 정보만 파싱하여 사용합니다. 최종적으로 추출된 정보는 result 변수에 저장하여 값을 넘겨줍니다.
```sh
const textDetection = async imgPath => {
  let url =
    googleVisionKey.googleCloud.api + googleVisionKey.googleCloud.apiKey;
  let tmp = '';
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      requests: [
        {
          image: {
            content: imgPath,
          },
          features: [{type: 'TEXT_DETECTION', maxResults: 5}],
        },
      ],
    }),
  });
  const res = await response.json();
  tmp = res.responses[0].fullTextAnnotation.text;
  let result = tmp.split('\n');
  console.log(result);
  return result;
};
``` 
+ Google Vision의 단점은 사물 인식을 진행했을 시, 결과가 영어로 출력되는 것입니다. 이를 해결하기 위해 Google Vision에서 제공하는 번역 API를 사용하였습니다. 영어를 한글로 번역하여 텍스트 추출을 보다 용이하도록 하였습니다.
```sh
const textTranslation = async textArr => {
  let result = [];
  let url =
    googleTranslationKey.googleTranslation.api +
    googleTranslationKey.googleTranslation.apiKey;
  let fromLang = 'en';
  let toLang = 'kor';

  for (let i = 0; i < textArr.length; i++) {
    let text = textArr[i].ingredient;
    url += '&q=' + encodeURI(text);
    url += `&source=${fromLang}`;
    url += `&target=${toLang}`;
    await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(res => res.json())
      .then(response => {
        let name = response.data.translations[i].translatedText;
        let prob = textArr[i].prob;
        result.push({ingredient: name, prob: prob});
      })
      .catch(error => {
        console.log('There was an error with the translation request: ', error);
      });
  }
  return result;
};
``` 
+ 실시간으로 재료 사진을 찍어 사물을 인식하기 위해선 텍스트 추출과 다른 머신러닝 모델을 사용해야했습니다. Google Vision에서 제공하는 라벨 인식 모델을 불러와 재료를 사물 인식이 가능토록 했습니다.
```sh
const labelDetection = async imgPath => {
  let url =
    googleVisionKey.googleCloud.api + googleVisionKey.googleCloud.apiKey;
  let tmp = '';
  await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      requests: [
        {
          image: {
            content: imgPath,
          },
          features: [{type: 'LABEL_DETECTION', maxResults: 10}],
        },
      ],
    }),
  })
    .then(res => res.json())
    .then(data => {
      tmp = data.responses[0].labelAnnotations;
    })
    .catch(err => console.log('error : ', err));

  return tmp;
};
``` 
### 3-1) Google Vision을 사용하며 겪은 문제
+ 휴대폰 카메라로 찍은 사진을 Google Vision OCR API로 넘겨 인식을 진행해야하는데, 계속 이미지 링크로 인한 오류가 발생했습니다. 이유가 무엇인지 계속 추궁하다가 Google vision docs를 읽고 해결하였습니다.

![](https://user-images.githubusercontent.com/78461009/153738966-4f4e9963-4c71-4202-b42e-4867f62dd63f.png)

> 친절한 docs에 의하면, Google Vision OCR API는 로컬 이미지 링크가 아닌 ```base64``` 형태로 이미지 링크를 넣어줘야 합니다. 멍청한 개발자는 이 사실을 모른 채, ```textDetection```에 로컬 링크를 함수 인자로 전달했습니다. 밑 빠진 독에 열심히 물을 퍼나른 셈이죠. 개발자는 재빨리 코드를 수정했습니다. <br><br>휴대폰 카메라로 사진을 찍고 이미지 링크를 API 함수로 넘겨줄 때, 로컬 링크가 아닌 base64로 인코딩하여 함수 인자를 전달했습니다. <br><br>로컬 이미지 링크를 base64로 인코딩하는 방법은 다양했습니다. react-native-base64 오픈 소스를 활용하면 쉽게 인코딩이 가능했죠. <br><br>하지만 이는 맥에서만 잘 돌아가고 윈도우에선 버전 호환 오류가 생겼습니다. ```React Native``` 버전과 ```react-native-base64```의 버전이 맞지 않아 설치가 되지 않았던 거죠. 다시 곤경에 빠진 개발자는 1초에 3개씩 팔린다는 서브웨이보다 더 많이 구글링이라는 발품을 팔았습니다. 다행히 해결책을 발견할 수 있었습니다. 등잔 밑이 어둡다는 옛 선조들의 말씀은 틀리지 않았습니다. <br><br>휴대폰 카메라로 사진을 찍을 때 사용되는 ```react-native-image-crop-picker```에서 imagePath를 생성할 때, ```includeBase64```를 **true**로 변경하면 이미지 링크가 base64 형태로 인코딩 되어 생성됩니다. 이로써 이미지 링크 오류를 해결할 수 있었습니다.

```sh
const imagePath = await ImagePicker.openCamera({
                  width: 768,
                  height: 1024,
                  includeBase64: true,
                  cropping: true,
                }).catch(e => console.log(e));
let result = await filterArr(imagePath.data);
navigation.navigate('CameraResult', {detectionArr: result});
``` 
## 😀 4. 레시피 일치율

레시피에 필요한 재료가 얼마나 충족되었는지 사용자에게 직관적으로 보여주기 위해, 레시피 재료와 사용자의 식재료를 비교하여 일치율을 제공합니다.


<!-- pseudo code -->
```sh
recipe_and_refrigerator_ingredients = array[]

FOR recipe_ingredient ← recipe_ingredients DO
  IF (refrigerator_ingredients['name'] INCLUDES recipe_ingredient['name']) AND
     (refrigerator_ingredient['vol'] >= recipe_ingredient['vol'])
        THEN recipe_and_refrigerator_ingredients.push(recipe_ingredient)
  ENDIF
ENDFOR

match_rate = number(recipe_and_refrigerator_ingredients) /
             number(recipe_ingredients)

RETURN match_rate, recipe_and_refrigerator_ingredients
```

### 4-1)


### 4-2) 레시피 일치율 알고리즘을 구현하며 겪은 문제


일치율을 계산하기 위해서 **_모든 식재료의 이름과 단위를 맞춰야_** 했습니다. <br><br>하지만 같은 식재료임에도 이름과 단위가 다양하여 통일하기가 번거로웠습니다. 그 이유는 사용자가 식재료를 추가할 때 직접 식재료명을 입력했고, 영수증을 통해 식재료를 인식했을 때 영수증마다 찍힌 식재료명과 단위가 달랐기 때문입니다. <br><br>그래서 저희는 식재료명과 단위를 직접 통일하여 데이터 베이스에 모아두었습니다.  

![](https://user-images.githubusercontent.com/78461009/153780224-ce9936d7-9824-4861-989a-7f0cf00e22a6.png)

```developer_ingredient``` : 식재료에 대한 정보를 저장하는 데이터 베이스 테이블입니다.
```d_ingredientName``` : 식재료명
```d_ingredientUnit``` : 식재료 단위

>```developer_ingredient``` 테이블에 개발자가 직접 (식재료명, 단위) 데이터를 추가했습니다. <br><br> 식재료명은 문자 비교가 용이하도록 최대한 간단하게, 단위는 일반적으로 많이 쓰이는 ‘개’, ‘kg’ 등으로 제한하였습니다.<br><br>또한 사용자가 식재료를 추가할 시, ```developer_ingredient```를 참조하여 DB에 존재하는 식재료만 추가할 수 있도록 사용자의 자유도를 낮췄습니다. 단위도 식재료마다 정해진 단위만 사용할 수 있도록 알고리즘을 짰습니다.



**레시피 재료 데이터** 또한 통일된 식재료명이 아니었기 때문에, ```developer_ingredient```에 맞춰 레시피 재료 데이터를 수정해야 했다. 레시피 테이블(```recipe```)에 **식재료명을 통일한 재료 정보(```recipe_developerArea```) 요소를 추가**했다. 식재료명을 통일하는 과정은 레시피 재료 정보(```recipe_ingredient```)를 기반으로 ① 사용자가 냉장고에 추가하지 않았을 것 같은 기본적인 재료(예. 물, 얼음, 식용유 등) 배제 ② ```developer_ingredient```의 식재료명으로 수정 ③ ```developer_ingredient```의 단위로 양 변환 순으로 진행됐다.

**한계와 향후 계획**  
위 해결 방안은 개발자가 직접 개입하여 수정한 것이다. 당시 마감기한이 있었고, 레시피 데이터 양이 적었기 때문에 확장성보다는 당장의 문제 해결에 적합한 해결 방안을 선택했다. 하지만 이 시스템에서 레시피 데이터의 양은 서비스 품질과 밀접하기 때문에 확장성에 더 집중하여 생산적인 해결 방안을 필요로 한다.<br>
레시피 재료 데이터의 수정 과정에서 개발자의 개입을 최소화하기 위해 수정 과정을 데이터화하여, 이후 등장하는 동일한 상황에서는 개입 대신 데이터 기반으로 변환하는 방안을 생각 중이다. 기본 재료로 고려되어 수정 시 삭제되는 식재료(물, 얼음, 식용유 등)에 대한 데이터셋, 통일 식재료명으로 변환되기 전의 식재료명에 대한 데이터셋을 생성한다. 하지만 이 또한 새로운 식재료의 등장 등의 예외가 존재하기 때문에 사람의 더블 체크와 데이터셋의 꾸준한 관리가 필수적이다.<br>
수정 전 기존 식재료명과 통일 식재료명의 데이터셋이 커진다면 다중 분류(multi classification) 기법을 활용할 수 있다. 새로운 식재료가 입력될 경우, 해당 식재료(Data)의 통일 식재료명(Label)를 유추할 수 있지 않을까 생각 중이다. 이 경우도 서비스의 정확도를 위해 더블 체크가 필요하다. 하지만 이 업무에서 사람의 개입은 어쩔 수 없이 필요하고, 이를 최소한으로 줄이는 것이 중요하다.

<br>

## 😀 DB 구성

![냉장고 DB ERD](https://user-images.githubusercontent.com/78461009/139594880-cbe2a043-2cc3-4905-8c04-d98724a56326.png)

🙋‍♀️ member(회원) DB

```sh
🟡 user_id : 회원 아이디(ID)
🟡 user_pw : 회원 비밀번호(PW)
🟡 user_name : 회원 실명
🟡 user_nickname: 회원 닉네임
🟡 user_email : 회원 이메일
🟡 user_bookmark : 회원 북마크
```

🙋 refrigerator(개인 냉장고) DB

```sh
🟢 no : 식별 번호 (auto)
🟢 ingredient_name : 재료명
🟢 ingredient_vol : 재료양
🟢 ingredient_buyDate: 구매일자
🟢 ingredient_expiryDate : 유통기한
🟢 ingredient_type : 재료유형 (냉장/냉동/조미료/실온)
🟢 ingredient_delChecked : 삭제여부 (0: 삭제 ❌ / 1: 삭제 ⭕️)
🟢 ingredient_imgPath : 재료 이미지 경로
➡ 외래키 : member 테이블의 userID
``` 

🙋‍♂️ recipe(레시피) DB

```sh
🔵 recipe_id : 레시피 고유번호
🔵 recipe_name : 레시피 이름
🔵 recipe_inbun : 레시피 인분
🔵 recipe_ingredient : 레시피 재료
🔵 recipe_cookStep : 조리방법
🔵 recipe_youtube : 레시피 유튜브 링크
🔵 recipe_developerArea : 레시피 재료 관련 개발자 사용 칼럼
➡ 외래키 : member 테이블의 userID
``` 

🐰 developer_ingredient(개발자 사용 재료 데이터) DB

```sh
⚫️ d_ingredientName : 개발자 지정 재료명
⚫️ d_ingredientUnit : 개발자 지정 재료 단위
``` 





## 😀 업데이트 내용

* 2021.03.01 ~ 2021.12.03
