import React, { Component } from 'react';
import {
    TouchableOpacity,
    Text,
    View,
    Image,
    FlatList,
    ScrollView
} from 'react-native';
import style from '../style';


export default function RecipeInfo(props) {

    constructor(){
        super()
        this.state={
            data: [],
            //레시피 DB 저장되는 배열(json파일)
        };
    }
    
        jsonData()=>{
        fetch(`http://3.35.18.154/phpdir/recipe_select.php`)
        .then(response=>response.json())
        .then(responseJson=>{
            this.setState({
                data: responseJson,
            })
        });
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>레시피 정보 화면</Text>
        </View>
    );
}






// export default class Receipt extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {data: []};
//     var img;
//     var name;
//   }
//   componentDidMount() {
//     const ref = database.ref('0/');
//     ref.on('value', snapshot => {
//       this.setState({data: snapshot.val()});
//       this.img = snapshot.val().image;
//       this.name = snapshot.val().name;
//       this.steps = snapshot.val().steps;
//     });
//   }
//   render() {
//     return (
//       <ScrollView style={style.container_Receipt}>
//         <View style={[style.view_Receipt, {width: charWidth}]}>
//           <Image source={{uri: this.img}} style={style.img_Receipt}></Image>
//         </View>
//         <View style={style.view1_Receipt}>
//           <Text style={style.itemName_Receipt}>{this.name}</Text>
//           <Text style={style.itemDiv_Receipt}>● 재료 </Text>
//           <IngreList />
//           <Text style={style.itemDiv_Receipt}>● 레시피 </Text>
//           <StepList />
//         </View>
//       </ScrollView>
//     );
//   }
// }





// export default class IngreList extends Component {
//     constructor(props) {
//       super(props);
//       this.state = {data: []};
//       var ingredients;
//     }
  
//     componentDidMount() {
//       const ref = database.ref('0/' + '/ingredient');
  
//       ref.on('value', snapshot => {
//         this.setState({data: snapshot.val()});
//         this.ingredients = snapshot.val();
//       });
//     }
  
//     render() {
//       return (
//         <View style={style.root_IngreList}>
//           <FlatList
//             data={this.ingredients}
//             renderItem={({item}) => (
//               <View style={style.item_IngreList}>
//                 <Text style={style.font_IngreList}>{item}</Text>
//               </View>
//             )}
//           />
//         </View>
//       );
//     }
//   }





// export default class StepList extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {data: []};
//     var steps;
//   }

//   componentDidMount() {
//     const ref = database.ref('0/' + '/step');

//     ref.on('value', snapshot => {
//       this.setState({data: snapshot.val()});
//       this.steps = snapshot.val();
//     });
//   }

//   render() {
//     return (
//       <View style={style.root_StepList}>
//         <FlatList
//           data={this.steps}
//           renderItem={({item, index}) => (
//             <View style={style.item_StepList}>
//               <Text style={style.font_StepList}>
//                 {index + 1}. {item}
//               </Text>
//             </View>
//           )}
//         />
//       </View>
//     );
//   }
// }
