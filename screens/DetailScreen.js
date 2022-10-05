import { StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useFocusEffect } from '@react-navigation/native'
// 
const DetailScreen = ({ navigation, route }) => {
  const { id, title } = route.params;
  const [detail, setDetail] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: title
    }, [navigation, title])
  })
  const getData = async (id) => {
    try {
      setLoading(true);
      const res = await axios.get("https://api.codingthailand.com/api/course/" + id);
      setDetail(res.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error); //set errorr ไปที่ state ของ error ว่าเกิดจาก axios หรือ ตัวอื่น
    }
  };

  useEffect(() => {
    getData(id);
  }, [id])

  if (loading === true) {
    return (
      <View>
        <ActivityIndicator color='#f4511e' size='large' />
      </View>
    )
  }
  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: "100%",
          backgroundColor: "#C8C8C8",
        }}
      />
    );
  };
  const _renderItem = ({ item, index }) => {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, flexDirection: 'row', margin: 5 }}>
          <Text style={styles.thumbnail}>{index + 1}</Text>
          <View style={styles.dataContainer}>
            <View style={styles.dataContent}>
              <Text style={styles.title}>{item.ch_title}</Text>
              <Text note numberOfLines={1}>{item.ch_dateadd}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };
  const _onRefresh = () => {
    getData(id);
  }
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <FlatList
        data={detail}
        keyExtractor={(item, index) => Math.random().toString()}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={_renderItem}
        refreshing={loading}
        onRefresh={_onRefresh}
      />
    </View>
  );


  return (
    <View>
      <Text>{id} {title}</Text>
    </View>
  )
}

export default DetailScreen

const styles = StyleSheet.create({})