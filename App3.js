import { View, Text,ActivityIndicator } from 'react-native'
import React,{useEffect,useState} from 'react'
import { FlatList } from 'react-native-gesture-handler';

const App = () => {
    const [isLoading, setloading] = useState(true);
    const[data,setData] = useState([]);
    const getMovie = async () =>{
            try {
                const response =  fetch('http://reactnative.dev/movies.json');
                const json = await response.json();
                setData(json.movies)
            } catch (error) {
                alert(error.message);
            }finally{
                setloading(false);
            }
    }

    useEffect(()=>{
        getMovie();
    },[])

  return (
    <View style ={{flex:1, padding : 20}}>
      {
        isloading ?
       <ActivityIndicator/> : (
        <FlatList
            data = {data}
            keyExtractor = {({id},index)=>id}
            renderItem = {(item)=>(
                <Text>{item.title}, {item.releaseYear}</Text>
            )}
        />
       )
      }
    </View>
  )
}

export default App