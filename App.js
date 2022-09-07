import { StyleSheet, Text, View, Button, LogBox } from "react-native";
import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";


import HomeScreen from "./screens/HomeScreen";
import { SafeAreaView } from "react-native-web";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "rgb(255,45,85)",
  },
};

function FeedScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Feed Screen</Text>
      <Button title="Open Drawer" onPress={() => navigation.openDrawer()} />
      <Button title="Toggle Drawer" onPress={() => navigation.toggleDrawer()} />
    </View>
  );
}

function ArticleScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Article Screen</Text>
    </View>
  );
}

function CustomDrawerContent(props) {
  return (
    <SafeAreaView>
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
        <image 
        source = {require("./assets/react-LogBox.png")}
        style = {style.sideMenuProfileIcon}></image>
        label="Close Drawer"
        onPress={() => props.navigation.closeDrawer()}
      <DrawerItem
        label="Toggle Drawer"
        onPress={() => props.navigation.toggleDrawer()}
      />
    </DrawerContentScrollView>
    </SafeAreaView>
  );
}
const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          width: 240,
        },
      }}
    >



      <Drawer.Screen name="HomeScreen" component={HomeScreen} />
      <Drawer.Screen name="Article" component={ArticleScreen} />
    </Drawer.Navigator>
  );
}
const App = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <MyDrawer />
    </NavigationContainer>
  );
};

export default App;
