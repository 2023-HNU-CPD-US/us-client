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
import { useSelector } from "react-redux";

import Folder from "../components/Folder";
import Note from "../components/Note";

function Home({ navigation }) {
    const folderData = useSelector((state) => state.folderReducer.folders);
    const noteData = useSelector((state) => state.noteReducer.notes);
    const data = [...folderData, ...noteData];
    console.log(data);

    const [searchText, setSearchText] = useState("");

    const handleSearch = () => {
        console.log("검색어:", searchText);
    };

    const renderPairs = () => {
        const pairs = [];
        for (let i = 0; i < data.length; i += 2) {
            const first = data[i];
            const second = data[i + 1];
            console.log(first);
            console.log(second);
            const pair = (
                <View key={i} style={styles.listRow}>
                    {first.type == "folder" ? (
                        <Folder name={first.name} />
                    ) : (
                        <Note title={first.title} />
                    )}
                    {second &&
                        (second.type == "folder" ? (
                            <Folder name={second.name} />
                        ) : (
                            <Note title={second.title} />
                        ))}
                </View>
            );
            pairs.push(pair);
        }
        return pairs;
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

            <ScrollView style={styles.list}>{renderPairs()}</ScrollView>

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
