import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const AboutScreen = ({route}) => {
//    const {email} = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>AboutScreen</Text>
      {/* <Text>Email : {email} </Text> */}
      <Text>Email : {route.params.email} </Text>
 
    </View>
  )
}

export default AboutScreen