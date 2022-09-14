import { View, Text, Button,SafeAreaView , Image} from "react-native";
import React from "react";
import { NavigationContainer,DefaultTheme} from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "rgb(255,45,85)",
  },
};

function CustomDrawerContent(props) {
  return (
    <SafeAreaView>
      <Image
        source={require("./assets/react_logo.png")}
      />
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
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
      <Drawer.Screen name="Home" component={MyTab}/>
      {/* <Drawer.Screen name="Feed" component={FeedScreen} /> */}
      <Drawer.Screen name="Setting" component={MyTab} />
    </Drawer.Navigator>
  );
}

function HomeScreen({navigation}) {
  return (
    
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Ionicons name="home" size={30} color="red" />
      <Text>Home Screen</Text>
    </View>
  );
}

function SettingScreen({navigation}) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Setting!</Text>
      <Button title="Go to Home" onPress={()=>navigation.navigate("Home")}/>
    </View>
  );
}
const Tab = createBottomTabNavigator();

function MyTab() {
  return (
    <Tab.Navigator  screenOptions={({ route }) => ({
      tabBarIcon: ({focused, color, size}) => {
        let iconName;
        if(route.name ==='Home') {
          iconName = focused
          ? 'ios-information-circle'
          : 'ios-information-circle-outline'
        }else if (route.name === 'Setting'){
          iconName = focused ? 'ios-list-box' : 'ios-list'
        }
        return <Ionicons name={iconName} size={size} color={color}/>
      },
      tabBarActiveTintColor:'tomato',
      tabBarInactiveTintColor:'gray'
    })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Setting" component={SettingScreen} />
    </Tab.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <MyDrawer/>
    </NavigationContainer>
  );
};

export default App;