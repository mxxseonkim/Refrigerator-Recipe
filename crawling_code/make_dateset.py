import csv
import re


# 크롤링 데이터 csv 파일 읽기
file = open('Recipe/data.csv', 'r', encoding='utf-8-sig')
data = [row for row in csv.DictReader(file)]

# 레시피 설명 형식이 아닌 데이터 제외 (조건 : '[재료]' 키워드 포함 여부)
data = [row for row in data if '[재료]' in row['내용'] or '[ 재료 ]' in row['내용']]

# 예외 데이터 기록할 exception.csv 파일 생성
file = open('Recipe/exception.csv', 'w', encoding='utf-8-sig')
writer = csv.writer(file)
writer.writerow(['주소', '내용'])



result = []

for row_idx, row in enumerate(data):


    parts = row['내용'].split('[')
    
    # 재료 부분 / 순서 부분
    ing_idx, step_idx = [None, None]
    for part_idx, part in enumerate(parts):
        if re.match('^재료 *]', part.strip()):
            ing_idx = part_idx # 재료 부분
        elif re.match('^만드는 *법 *]|^조리법]', part.strip()):
            step_idx = part_idx # 순서 부분

    # 예외
    if not ing_idx or not step_idx or ing_idx + 1 != step_idx:
        writer.writerow(row.values())
        continue


    # 이름/인분
    info = parts[ing_idx-1].split('\n')
    info = [line for line in info if line][-1]
    info = re.findall('[가-힣0-9~+ ]+', info)
    info = [line.strip() for line in info if line.strip()]
    
    # 예외
    if len(info) == 0:
        writer.writerow(row.values())
        continue
    
    name = info[0]
    standard = ''
    if len(info) == 2:
        if re.match('^약|^[0-9]+', info[1]):
            standard = info[1]
        
        # 예외
        else:
            writer.writerow(row.values())
            continue

    
    # 재료/인분
    ing_list = parts[ing_idx].split('\n')   
    
    if ing_list[0].strip()[-1] != ']':
        info = ing_list[0].split(']')[-1].strip()
        standard = re.findall('[0-9가-힣- ]+', info)[0]

    ing_list = [ing.strip() for ing in ing_list if ing][1:]
    ingredient = ''
    possible = True

    for ing in ing_list:

        if '*' in ing:
            ingredient += '\n' + ing + '\n'
        
        else:
            wds = ing.replace('½', '1/2').replace('¼', '1/4').replace('¾', '3/4').split()
            ing_name, ing_volume = [None, None]

            volume_wds = ['약', '약간', '적당량', '전량']
            volume_reg = re.compile('^[0-9]+|^약[0-9]+|^약간[()0-9g]*')
            
            if len(wds) == 2 and re.match('^[0-9]+', wds[1]):
                ing_name, ing_volume = wds
            
            elif [wd for wd in wds if wd in volume_wds]:
                idx = [i for i, wd in enumerate(wds) if wd in volume_wds][0]
                ing_name, ing_volume = [' '.join(wds[:idx]), ' '.join(wds[idx:])]
        
            elif [wd for wd in wds if volume_reg.match(wd)]:
                idx = [i for i, wd in enumerate(wds) if volume_reg.match(wd)][0]
                ing_name, ing_volume = [' '.join(wds[:idx]), ' '.join(wds[idx:])]
            
            else:
                possible = False
                break

            ingredient += ing_name + '@' + ing_volume + '$'
    
    # 예외
    if not possible:
        writer.writerow(row.values())
        continue

    
    # 순서
    step_list = parts[step_idx].split('\n')[1:]
    step_list = [step for step in step_list if re.search('[가-힣]+', step)]
    step = ' \n'.join(step_list)

    result.append([name, standard, ingredient.strip('\n'), step, row['주소']])



# 레시피 저장
file = open('Recipe/result.csv', 'w', encoding='utf-8-sig')
writer = csv.writer(file)
writer.writerow(['name', 'standard', 'ingredient', 'step', 'url'])
writer.writerows(result)