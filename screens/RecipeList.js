import React, {useState} from 'react';
import {TouchableOpacity, Text, View, FlatList} from 'react-native';
import style from '../global/style';
import Searchbar from '../components/Searchbar.js';

export default function RecipeList(props) {
  const [search, setSearch] = useState(''); // 검색 키워드
  const [masterData, setMasterData] = useState(); // 전체 데이터
  const [filteredData, setFilteredData] = useState(); // 검색 키워드에 필터링된 데이터

  const DataSet = require('../global/DataSet');

  //-------------------------- Data Select -------------------------------------

  useState(async () => {
    // DB에서 데이터 읽기
    let dataObj = {
      qry: 'SELECT * FROM recipe',
    };
    // 쿼리 전송후 json으로 전달 받음
    let json = await DataSet.getData(dataObj);
    // 받아온 Data로 setState
    setFilteredData(json);
    setMasterData(json);
  }, []);

  //------------------ 검색 키워드로 필터링 하는 함수 ----------------------------

  const filterData = text => {
    // 텍스트를 받아서
    if (text) {
      // 텍스트가 빈 문자열이 아니면
      // 전체 데이터에서 filter 함수를 사용하여 검색어에 따른 데이터를 선별
      const newData = masterData.filter(function (item) {
        // 일단 데이터의 item.name과 text(검색어)를 모두 대문자화 함
        const itemData = item.recipe_name
          ? item.recipe_name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        //  itemData와 textData를 비교해서 -1보다 높으면 filter() 함수에 의해 선별(return) 됨 (-1이 나오면 일치하지 X)
        return itemData.indexOf(textData) > -1;
      });
      // 검색어로 필터링 된 데이터를 검색 필터링 State에 담음
      // 그리고 text를 Searchbar의 props로 보냄
      setFilteredData(newData);
      setSearch(text);
    } else {
      // 텍스트가 빈 문자열이면 전체 데이터를 검색 필터링 State에 담음
      // 그리고 text를 Searchbar의 props로 보냄
      setFilteredData(masterData);
      setSearch(text);
    }
  };

  //---------------------- UI 부분 ---------------------------------------------

  // flatlist의 한 Item의 UI
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={style.itemView_RecipeList}
        onPress={() => {
          // 터치 시 RecipeInfo로 이동 (item 객체를 가지고 감)
          props.navigation.navigate('RecipeInfo', {data: item});
        }}>
        <View style={{width: '80%'}}>
          <Text style={style.itemName_RecipeList}>{item.recipe_name}</Text>
        </View>
        <View style={{width: '20%'}}>
          <Text style={style.itemSimilarity_RecipeList}>67%</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={style.root_RecipeList}>
      {/* SearchBar에 props 전달 */}
      <Searchbar
        search={search}
        setSearch={setSearch}
        filterData={filterData}
        ph="궁금한 레시피를 검색해보셈"
      />
      <View>
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtract={item => item.recipe_id}
        />
      </View>
    </View>
  );

  //----------------------------------------------------------------------------
}
