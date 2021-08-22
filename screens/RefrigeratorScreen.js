import * as React from 'react';
import {Text, View} from 'react-native';
import List1 from '../components/List1';

export default function ColdStorageScreen({route}) {

  const type = route.params.grocerytype;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{type}</Text>
      <List1 />
    </View>
  );
}
