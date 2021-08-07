import React, { useState, useEffect, Component } from 'react';
import {
    TouchableOpacity,
    Text,
    View,
    Image,
    FlatList,
    ScrollView
} from 'react-native';
import style from '../style';
import Searchbar from '../components/Searchbar.js'


export default function RecipeList(props) {

    /*

    레시피 DB 구현 후
    레시피 리스트 화면 구현

    */

    const [search, setSearch] = useState('');

    return (
        <View style = {{flex: 1}}>
            <Searchbar search={search} setSearch={setSearch}/>
            <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text> 레시피 추천 화면 {search} </Text>
            </View>
        </View>
    );
}





// export default class ReceiptList extends Component {
//       constructor(props) {
//         super(props);
//         this.state = {data: []};
//       }
    
//       componentDidMount() {
//         const ref = firebase.ref();
    
//         ref.on('value', snapshot => {
//           this.setState({data: snapshot.val()});
//         });
//       }
    
//       render() {
//         return (
//           <View style={style.root_ReceiptList}>
//             <FlatList
//               data={this.state.data}
//               renderItem={this.renderItem}
//               keyExtract={item => item.id}
//             />
//           </View>
//         );
//       }
    
//       renderItem = ({item}) => {
//         return (
//           <TouchableOpacity
//             style={style.itemView_ReceiptList}
//             onPress={() => {
//               this.props.navigation.navigate('recipet');
//             }}>
//             <Image
//               source={{uri: item.image}}
//               style={style.itemImg_ReceiptList}></Image>
//             <View style={{flexDirection: 'column'}}>
//               <Text style={style.itemName_ReceiptList}>{item.name}</Text>
//               <Text style={style.itemMsg_ReceiptList}>★ 3.5</Text>
//             </View>
//             <View style={style.itemLike_ReceiptList}>
//               <Text>찜</Text>
//             </View>
//           </TouchableOpacity>
//         );
//       };
//     }





