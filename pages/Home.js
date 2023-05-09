import React, { useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Button,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";

import Folder from "../components/Folder";
import Note from "../components/Note";

function Home({ navigation }) {
    const [searchText, setSearchText] = useState("");

    const handleSearch = () => {
        // 검색 버튼이 눌렸을 때 수행할 동작
        console.log("검색어:", searchText);
        // 검색 기능을 추가하려면 여기에 검색 로직을 작성하면 됩니다.
    };

    return (
        <View style={styles.home}>
            <View
                style={{
                    paddingHorizontal: 20,
                    paddingTop: 20,
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <TextInput
                    style={{
                        flex: 9,
                        height: 40,
                        backgroundColor: "white",
                        paddingHorizontal: 10,
                        borderRadius: 5,
                    }}
                    placeholder="검색어를 입력하세요."
                    onChangeText={(text) => setSearchText(text)}
                    returnKeyType="search"
                    value={searchText}
                />
                <TouchableOpacity
                    style={{
                        flex: 1,
                    }}
                >
                    <FontAwesome
                        name="sort-amount-desc"
                        size={20}
                        color="#555"
                        style={{
                            textAlign: "center",
                        }}
                    />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.list}>
                <View style={styles.listRow}>
                    <Folder name="Food Recipes"></Folder>
                    <Folder name="Project"></Folder>
                </View>
                <View style={styles.listRow}>
                    <Folder name="Secret"></Folder>
                    <Folder name="Reference"></Folder>
                </View>
                <View style={styles.listRow}>
                    <Note></Note>
                </View>
            </ScrollView>

            <View style={styles.menu}>
                <TouchableOpacity
                    activeOpacity="0.6"
                    style={{
                        ...styles.menuTab,
                        borderTopLeftRadius: 10,
                        borderBottomLeftRadius: 10,
                        borderRightWidth: 1,
                        borderRightColor: "#eee",
                    }}
                    onPress={() => navigation.navigate("작성하기")}
                >
                    <View>
                        <Feather name="file-plus" size={24} color="black" />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity="0.6"
                    style={{
                        ...styles.menuTab,
                        borderTopRightRadius: 10,
                        borderBottomRightRadius: 10,
                    }}
                    // onPress={() => navigation.navigate("작성하기")}
                >
                    <View>
                        <Feather name="folder-plus" size={24} color="black" />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    home: {
        width: "100%",
        height: "100%",
    },
    list: {
        width: "100%",
        paddingHorizontal: 20,
    },
    listRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 15,
    },
    menu: {
        position: "absolute",
        left: "0%",
        bottom: 10,
        flexDirection: "row",
        // borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowOffset: {
            width: 10,
            height: 10,
        },
        paddingHorizontal: 20,
    },
    menuTab: {
        backgroundColor: "#fff",
        flex: 1,
        alignItems: "center",
        paddingVertical: 20,
    },
});

export default Home;
