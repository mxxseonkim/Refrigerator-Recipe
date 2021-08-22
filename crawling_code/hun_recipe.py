import csv
import json
import time
from selenium import webdriver

driver = webdriver.Chrome(executable_path="/home/mskim/chromedriver") 

# 웹 불러오기
url = 'https://www.10000recipe.com/profile/recipe.html?uid=98587162'
driver.get(url)
time.sleep(3)


# 레시피 url 주소 크롤링
urls = driver.find_elements_by_xpath('.//a[@class="thumbnail"]')
urls = [url.get_attribute('href') for url in urls] # 레시피 url 리스트


# json
doc = {}
col = ['id', 'name','ingredient', 'step', 'image']
idx = 0

# 레시피 내용 크롤링
for num, url in enumerate(urls):
    driver.get(url)
    time.sleep(3)

    # 이름
    name = driver.find_element_by_xpath('.//div[@class="view2_summary st3"]/h3').text.split(',')
    name = name[0]
    
    # 재료
    ingredientBox = driver.find_element_by_xpath('.//div[@id="divConfirmedMaterialArea"]/ul')
    ingredientList = ingredientBox.find_elements_by_xpath('.//li')
    ingredientList = [ingredient.text.replace('\n', ' ') for ingredient in ingredientList]
    ingredients = ""
    for ingredient in ingredientList:
        ingredients = ingredients + "\t" + ingredient

    # 순서
    stepBox = driver.find_element_by_xpath('.//div[@class="view_step"]')
    stepList = stepBox.find_elements_by_xpath('.//div[@class="media-body"]')
    stepList = [step.text.replace("\n","") for step in stepList]
    steps = ""
    for step in stepList:
        steps = steps + "\t" + step

    # 사진
    src = driver.find_element_by_xpath('.//img[@id="main_thumbs"]').get_attribute('src')
    data = [num, name, ingredientList, stepList, src]
    doc[idx] = dict(zip(col, data))
    idx += 1
    

    
# 데이터 저장된 json 파일 저장
location = '/home/mskim/vscode/react/app/data/kimjju.json'
with open(location, "w", encoding="utf-8", newline="") as output:
    json.dump(doc, output, ensure_ascii=False)
