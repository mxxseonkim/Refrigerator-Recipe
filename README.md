# 🙂 냉장고를 부탁해
> 현재 냉장고에 들어있는 재료를 이용하여 만들 수 있는 레시피를 추천해 주는 서비스 입니다. 

👉🏻 스마트 냉장고를 사기엔 돈이 부족한 사회초년생들을 위해 만들어진 어플입니다. <br>
👉🏻 냉장고를 부탁해 어플 하나만 있으면 스마트 냉장고의 기능을 마음껏 쓸 수 있습니다. <br>
👉🏻 냉장고에 들어있는 재료를 분석하여 만들 수 있는 레시피를 친절히 알려드립니다 ! 💙

![](../header.png)

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


## 😀 어플 전개도

(UI 전개도 사진 들어갈 부분)



## 😀 업데이트 내용

* 2021.03.01 ~ ing
    * 작업진행중

