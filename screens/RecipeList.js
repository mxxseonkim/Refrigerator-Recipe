import React, { useState, useEffect, Component } from 'react';
import {
    TouchableOpacity,
    Text,
    View,
    FlatList,
} from 'react-native';
import style from '../style';
import Searchbar from '../components/Searchbar.js'


export default function RecipeList(props) {

    const [search, setSearch] = useState(''); // 검색 키워드
    const [masterData, setMasterData] = useState() // 전체 데이터
    const [filteredData, setFilteredData] = useState() // 검색 키워드에 필터링된 데이터


    useState(() => { // DB에서 데이터 읽기
        fetch(`http://3.35.18.154/phpdir/recipe_select.php`)
        .then(response => response.json())
        .then(responseJson =>{
            setFilteredData(responseJson);
            setMasterData(responseJson);
        });
    }, []);


    const filterData = (text) => { // 검색 키워드로 필터링 하는 함수
        if(text) {
            const newData = masterData.filter(
                function(item) {
                    const itemData = item.name
                        ? item.name.toUpperCase()
                        : ''.toUpperCase();
                    const textData = text.toUpperCase();
                    return itemData.indexOf(textData) > -1;
                
            });
            setFilteredData(newData);
            setSearch(text);
        } else {
            setFilteredData(masterData);
            setSearch(text);
        }
    }


    const renderItem = ({item}) => {
        return (
            <TouchableOpacity style={style.itemView_RecipeList}
                onPress={() => {props.navigation.navigate('RecipeInfo',{
                    data: item, title: item.name });}}>
                <View style={{width: '80%'}}>
                    <Text style={style.itemName_RecipeList}>{item.name}</Text>
                </View>
                <View style ={{width: '20%'}}>
                    <Text style={style.itemSimilarity_RecipeList}>67%</Text>
                </View>
            </TouchableOpacity>
        );
    };

    
    return (
        <View style = {style.root_RecipeList}>
            <Searchbar  search={search} setSearch={setSearch}
                filterData = {filterData}
                ph = '궁금한 레시피를 검색해보셈'/>
            <View>
                <FlatList
                data={filteredData}
                renderItem={renderItem}
                keyExtract={item => item.id}
                />
            </View>
        </View>
    );
}
