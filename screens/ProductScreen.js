import { StyleSheet, Text, View, ActivityIndicator, FlatList, Image, SafeAreaView, TouchableOpacity } from 'react-native'
import axios from 'axios'
import React, { useState, useEffect, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native';


const ProductScreen = ({navigation}) => {

    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const getData = async () => {
        try {
            setLoading(true);
            const res = await axios.get("https://api.codingthailand.com/api/course");
            setProduct(res.data.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error); //set errorr ไปที่ state ของ error ว่าเกิดจาก axios หรือ ตัวอื่น
        }
    };
    useFocusEffect(
        useCallback(() => {
            getData();
        }, [])
    )

    if (error) { // ถ้ามี error เกิดขึ้นจะ return ui ต่อไปนี้กลับไป
        return (
            <View style={styles.container}>
                <Text>{error.message}</Text>
                <Text>เกิดข้อผิดพลาดไม่สามารถติดต่อกับ Server ได้</Text>
            </View>
        )
    }

    if (loading === true) {
        return (
            <View>
                <ActivityIndicator color='#f4511e' size='large' />
            </View>
        )
    }

    const _onRefresh = () => {
        getData();
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

    const _renderItem = ({ item }) => {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <TouchableOpacity
                    style={styles.addButtonStyle}
                    onPress = {()=>{
                        navigation.navigate('Detail',{
                            id:item.id,
                            title:item.title
                        })
                    }}
                >
                    <View style={styles.container}>
                        <View style={styles.dataContent}>
                            <Image
                                resizeMode="cover"
                                source={item.picture}
                                style={styles.thumbnail}
                            />
                        </View>
                        <View style={styles.dataContainer}>
                            <View style={styles.dataContent}>
                                <Text style={styles.title}>{item.title}</Text>
                                <Text style={styles.detail}>{item.detail}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </SafeAreaView>
        );
    };

    return (
        <View style={{ flex: 1, alignItems: "center" }}>
            <FlatList
                data={product}
                keyExtractor={(item, index) => item.id.toString()}
                ItemSeparatorComponent={ItemSeparatorView}
                renderItem={_renderItem}
                refreshing={loading}
            // onRefresh = {_onRefresh}
            />
        </View>
    );
};

export default ProductScreen;

const styles = StyleSheet.create({
    container: {
        height: 80,
        elevation: 3,
        borderColor: "gray",
        borderRadius: 5,
        flexDirection: "row",
        marginHorizontal: 20,
    },
    dataContainer: {
        flex: 1,
    },
    thumbnail: {
        width: 70,
        height: 70,
    },
    dataContent: {
        marginTop: 5,
        marginLeft: 15,
    },
    title: {
        color: "#444",
        fontSize: 18,
        fontWeight: "bold",
    },
    detail: {
        fontSize: 16,
        color: "#888",
        fontWeight: "700",
    },
});