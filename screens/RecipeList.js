import React, {useState, useEffect} from 'react';
import {TouchableOpacity, Text, View, FlatList, ActivityIndicator} from 'react-native';
import style from '../global/style';
import Searchbar from '../components/Searchbar.js';

export default function RecipeList({navigation, chk, mark, bookmarkList, setBookmarkList}) {
  const [my, setMy] = useState([]); // 냉장고 데이터
  const [search, setSearch] = useState(''); // 검색 키워드
  const [masterData, setMasterData] = useState([]); // 전체 데이터
  const [filteredData, setFilteredData] = useState([]); // 검색 키워드에 필터링된 데이터
  const [mainData, setMainData] = useState([]);
  const [bookmarkData, setBookmarkData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const DataSet = require('../global/DataSet');
  const memberID = require('../global/Global');   

  const calMatchRate = ingre => {
    const ingre_list = ingre
      .split(/\$/gi)  
      .map(function (i) {
        if (!i) return null;
        var info = i.split(/@/gi);
        var name = info[0];
        var vol = info[1].includes('/')
          ? parseFloat(info[1].split('/')[0]) /
            parseFloat(info[1].split('/')[1].slice(0, -1))
          : parseFloat(info[1].slice(0, -1));
        return name && vol ? {name: name, vol: vol} : null;
      })
      .filter(i => i);

    const exist_list = ingre_list.filter(i => (
        my.map(e => e.name).includes(i.name) &&
        i.vol <= parseFloat(my.find(e => (e.name == i.name ? true : false)).vol)
    ));

    const match_rate = (exist_list.length / ingre_list.length) * 100;
    return match_rate.toFixed(1);
  };

  //-------------------------- Data Select -------------------------------------

  useEffect(async () => {
    let dataObj = {
      qry: 'SELECT * FROM ' + memberID.userID,
    };
    let my_data = await DataSet.getData(dataObj);

    const my_list = my_data.map(function (e) {
      return {name: e.ingredient_name, vol: parseFloat(e.ingredient_vol)};
    });
    setMy(my_list);
  }, [chk]);

  useEffect(async () => {
    let dataObj = {
      qry: 'SELECT * FROM temp',
    };
    let recipe_data = await DataSet.getData(dataObj);

    const recipe_data_with_match_rate = recipe_data.map(function (e) {
      e['match_rate'] = calMatchRate(e['recipe_developerArea']);
      return e;
    });
    const recipe_data_sorted = recipe_data_with_match_rate.sort((a, b) => {
      return parseFloat(a['match_rate']) < parseFloat(b['match_rate']);
    });
    setFilteredData(recipe_data_sorted);
    setMasterData(recipe_data_sorted);
    setIsLoading(false);
  }, [my]);

  useEffect(async() => {
    let get_data = {
      qry:
        "SELECT user_bookmark FROM member WHERE user_id='" +
        memberID.userID +
        "'",
    };
    let bookmark_json = await DataSet.getData(get_data);
    setBookmarkList(
      bookmark_json[0].user_bookmark ?
      bookmark_json[0].user_bookmark.split('/').filter(e=>e) : []
    );
  }, []);

  useEffect(() => {
    setBookmarkData(
      masterData.filter(e => bookmarkList.includes(e.recipe_id))
    );
  }, [bookmarkList, masterData]);

  useEffect(() => {
    if(mark) {
      setMainData(bookmarkData);
      setFilteredData(bookmarkData);
    } else {
      setMainData(masterData);
      setFilteredData(masterData);
    }
  }, [mark]);

  //------------------ 검색 키워드로 필터링 하는 함수 ----------------------------

  const filterData = text => {
    // 텍스트를 받아서
    if (text) {
      // 텍스트가 빈 문자열이 아니면
      // 전체 데이터에서 filter 함수를 사용하여 검색어에 따른 데이터를 선별
      const newData = mainData.filter(function (item) {
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
      setFilteredData(mainData);
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
          navigation.navigate('RecipeInfo', {data: item});
        }}>
        <View style={{width: '80%'}}>
          <Text style={style.itemName_RecipeList}>{item.recipe_name}</Text>
        </View>
        <View style={{width: '20%'}}>
          <Text style={style.itemSimilarity_RecipeList}>
            {item.match_rate} %
          </Text>
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
      {isLoading ? (
        <View style={style.ActivityIndicatorView_RefrigeratorScreen}>
          <ActivityIndicator size="large" color="salmon" />
        </View>
      ) : (
        <View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={filteredData}
            keyExtractor={item => item.recipe_id}
            renderItem={renderItem}
          />
        </View>
      )}
    </View>
  );

  //----------------------------------------------------------------------------
}
