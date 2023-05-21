import React, { useState, useCallback } from "react";
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Button,
    Image,
    ScrollView,
    TouchableOpacity,
    ActionSheetIOS,
} from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { add } from "../reducers/folderReducer";

import Folder from "../components/Folder";
import Note from "../components/Note";
import SortModal from "../components/modal/SortModal";
import NoDataImage from "../components/NoDataImage";

function Home({ navigation }) {
    const folderData = useSelector((state) =>
        state.folderReducer.folders
            .slice()
            .sort((a, b) => a.name.localeCompare(b.name))
    );
    const noteData = useSelector((state) =>
        state.noteReducer.notes
            .slice()
            .sort((a, b) => a.title.localeCompare(b.title))
    );
    const data = [...folderData, ...noteData];
    // console.log(data);

    const [modalVisible, setModalVisible] = useState(false);
    const modalOpen = useCallback(() => {
        if (Platform.OS === "android") {
            setModalVisible(true);
        } else {
            ActionSheetIOS.showActionSheetWithOptions(
                {
                    options: ["최신순", "이름순", "취소"],
                    cancelButtonIndex: 2,
                },
                (buttonIndex) => {
                    if (buttonIndex === 0) {
                    } else if (buttonIndex === 1) {
                    }
                }
            );
        }
    }, []);

    const [searchText, setSearchText] = useState("");
    const handleSearch = () => {
        console.log("검색어:", searchText);
    };

    const dispatch = useDispatch();
    const handleAddFolder = () => {
        const newFolder = {
            id: Date.now(), // 임의의 고유 ID 생성
            name: "새 폴더",
        };
        dispatch(add(newFolder));
    };

    const renderPairs = () => {
        const pairs = [];
        if (data.length) {
            for (let i = 0; i < data.length; i += 2) {
                const first = data[i];
                const second = data[i + 1];
                const pair = (
                    <View key={i} style={styles.listRow}>
                        {first.type == "folder" ? (
                            <Folder id={first.id} name={first.name} />
                        ) : (
                            <Note
                                id={first.id}
                                title={first.title}
                                content={first.content}
                            />
                        )}
                        {second &&
                            (second.type == "folder" ? (
                                <Folder id={second.id} name={second.name} />
                            ) : (
                                <Note
                                    id={second.id}
                                    title={second.title}
                                    content={second.content}
                                />
                            ))}
                    </View>
                );
                pairs.push(pair);
            }
        } else {
            const pair = <NoDataImage />;
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
                    onPress={modalOpen}
                >
                    <FontAwesome
                        name="sort-amount-desc"
                        size={20}
                        color="#555"
                        style={{
                            textAlign: "center",
                        }}
                    />
                    <SortModal
                        visible={modalVisible}
                        onClose={() => setModalVisible(false)}
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
                    onPress={() => handleAddFolder()}
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
        marginBottom: 90,
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
