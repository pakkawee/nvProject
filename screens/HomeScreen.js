import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Ionicons } from '@expo/vector-icons';
import React from 'react'
import {
  HeaderButtons,
  HeaderButton,
  Item,
  HiddenItem,
  OverflowMenu,
} from 'react-navigation-header-buttons'
import { AntDesign } from '@expo/vector-icons';

const IoniconsHeaderButton = (props) => (
  // the `props` here come from <Item ... />
  // you may access them and pass something else to `HeaderButton` if you like
  <HeaderButton IconComponent={Ionicons} iconSize={23} {...props} />
);

const HomeScreen = ({ navigation }) => {

  React.useLayoutEffect(() => {
    navigation.setOptions({
      // in your app, you can extract the arrow function into a separate component
      // to avoid creating a new one every time you update the options
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
          <Item title="search" iconName="ios-search" onPress={() => alert('search')} />
          <ReusableItem onPress={() => alert('Edit')} />
          <OverflowMenu
            style={{ marginHorizontal: 10 }}
            OverflowIcon={({ color }) => <Ionicons name="React-logo" size={23} color={color} />}
          >
            <HiddenItem title="hidden1" onPress={() => alert('hidden1')} />
            <ReusableHiddenItem onPress={() => alert('hidden2')} />
          </OverflowMenu>
        </HeaderButtons>
      ),
    });
  }, [navigation]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Ionicons name='home' size={30} color='brown' />
      <AntDesign name="meh" size={24} color="pink" />
      <Button title="Register" onPress={() => navigation.openDrawer()} />
    </View>
  )
}

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 100,height: 100,
    borderRadius: 100 / 2,
    alignSelf: 'center',},})

export default HomeScreen