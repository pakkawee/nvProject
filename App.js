import { StatusBar } from 'expo-status-bar';
import { Text, View, Button,TextInput} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import react from 'react';

function HomeScreen ({navigation,route}){
  react.useEffect(()=>{
    if(route.params?.post){
      //Post updated, do something with 'route.parms.post'
      //ex. sent the post to server
    }
  },[route.params?.post]);
  return(
    <View style = {{flex:1,alignItems:'center',justifyContent:'center'}}>
    <Button title = 'Create post' 
    onPress={()=>navigation.navigate('CreatePost')}/>
    <Text style={{margin : 10}}>Post:{route.params?.post}</Text>
    </View>
  )
}

function CreatePostScreen({navigation,route}){
  const[postTest,setPostText] = React.useState('');
  return(
    <>
    <TextInput
    multiline
    placeholder = 'Please text here '
    style = {{height:200,padding:10,backgroundColor:'white'}}
    onChangeText = {setPostText}
    value = {postText}
    />
    <Button
    title='click'
    onPress = {() => {
      navigation.navigate('Home',{post:postText})
    }}/>
    </>
  )
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'
      screenOptions={{
        headerStyle:{backgroundColor: '#008b8b'},
        headerTintColor:'#ffff',
        headerTitleStyle:{fontWeight:'bold',fontSize:30}
      }}>
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='CreatePost' component={CreatePostScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}