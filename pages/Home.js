import React, {
    useState,
    useCallback,
    useEffect,
    useRef,
    useMemo,
} from "react";
import {
    StyleSheet,
    View,
    TextInput,
    ScrollView,
    TouchableOpacity,
    ActionSheetIOS,
} from "react-native";
import axios from "axios";

import { Icon } from "@rneui/themed";

import { useSelector, useDispatch } from "react-redux";
import { add } from "../reducers/folderReducer";

import Folder from "../components/Folder";
import Note from "../components/Note";
import SortModal from "../components/modal/SortModal";
import NoDataImage from "../components/NoDataImage";

function Home({ navigation }) {
    // Redux store에서 데이터 선택
    const folderState = useSelector((state) => state.folder.folders);
    const noteState = useSelector((state) => state.note.notes);

    const folderData = useMemo(() => {
        return [...folderState].sort((a, b) => a.name.localeCompare(b.name));
    }, [folderState]);

    const noteData = useMemo(() => {
        return [...noteState].sort((a, b) => a.name.localeCompare(b.name));
    }, [noteState]);

    // 상태 변수들
    const [data, setData] = useState(
        [...folderData, ...noteData].filter((item) => {
            return item.parentId === null;
        })
    );
    console.log(noteData);

    useEffect(() => {
        setData(
            [...folderData, ...noteData].filter((item) => {
                return item.parentId === null;
            })
        );
    }, [folderData, noteData]);

    const [modalVisible, setModalVisible] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [currentFolder, setCurrentFolder] = useState(null);
    const [sortOption, setSortOption] = useState("name");
    const [selectedNote, setSelectedNote] = useState(null);

    const dispatch = useDispatch();

    // 새 폴더 추가 함수
    const handleAddFolder = () => {
        let currentDate = new Date();
        let formattedDate = currentDate.toISOString().slice(0, -1);

        const newFolder = {
            id: Date.now(),
            name: "새 폴더",
            parentId: currentFolder,
            created_at: formattedDate,
        };

        axios
            .post(
                "https://port-0-us-server-das6e2dli8igkfo.sel4.cloudtype.app/AddFolder/",
                newFolder
            )
            .then((response) => {
                dispatch(add(response.data));
            })
            .catch((error) => {
                console.log("폴더 추가 에러:", error);
            });
    };

    // 폴더 선택 처리 함수
    const handleFolderPress = useCallback(
        (folderId) => {
            const filteredData = [...folderData, ...noteData].filter(
                (item) => item.parentId === folderId
            );
            setData(filteredData);
            setCurrentFolder(folderId);
        },
        [folderData, noteData]
    );

    // 노트 선택 처리 함수
    const shouldNavigateToNote = useRef(false);
    const handleNotePress = (noteId) => {
        const note = noteData.find((note) => note.id === noteId);
        setSelectedNote(note);
        shouldNavigateToNote.current = true;
    };

    // 노트 변경 시 해당 노트로 이동
    useEffect(() => {
        if (selectedNote !== null && shouldNavigateToNote.current) {
            navigation.navigate("노트", { selected: selectedNote });
            shouldNavigateToNote.current = false; // 네비게이션 후 다시 false로 변경
        }
    }, [selectedNote, navigation]);

    // 부모 폴더로 이동하는 함수
    const handleGoBack = useCallback(() => {
        if (currentFolder) {
            const parentFolder = folderData.find(
                (folder) => folder.id === currentFolder
            );
            if (parentFolder) {
                setCurrentFolder(parentFolder.parentId);
                handleFolderPress(parentFolder.parentId);
            }
        }
    }, [currentFolder, folderData, handleFolderPress]);

    // 폴더와 노트의 쌍을 렌더링
    const renderPairs = (renderData) => {
        const pairs = [];
        if (renderData.length) {
            for (let i = 0; i < renderData.length; i += 2) {
                const first = renderData[i];
                const second = renderData[i + 1];
                const pair = (
                    <View
                        key={`${first.id}-${second ? second.id : ""}`}
                        style={styles.listRow}
                    >
                        {first.type === "Folder" ? (
                            <Folder
                                key={first.id}
                                id={first.id}
                                name={first.name}
                                onPress={() => handleFolderPress(first.id)}
                            />
                        ) : (
                            <Note
                                key={first.id}
                                id={first.id}
                                name={first.name}
                                content={first.content}
                                onPress={() => handleNotePress(first.id)}
                            />
                        )}
                        {second && (
                            <>
                                {second.type === "Folder" ? (
                                    <Folder
                                        key={second.id}
                                        id={second.id}
                                        name={second.name}
                                        onPress={() =>
                                            handleFolderPress(second.id)
                                        }
                                    />
                                ) : (
                                    <Note
                                        key={second.id}
                                        id={second.id}
                                        name={second.name}
                                        content={second.content}
                                        onPress={() =>
                                            handleNotePress(second.id)
                                        }
                                    />
                                )}
                            </>
                        )}
                    </View>
                );
                pairs.push(pair);
            }
        } else {
            const pair = <NoDataImage key="nodata" />;
            pairs.push(pair);
        }
        return pairs;
    };

    // 정렬 옵션에 따라 데이터를 정렬
    useEffect(() => {
        const sortedFolders = folderData
            .filter((item) => item.parentId === currentFolder)
            .sort((a, b) => a.name.localeCompare(b.name));
        const sortedNotes = noteData
            .filter((item) => item.parentId === currentFolder)
            .sort((a, b) => a.name.localeCompare(b.name));

        let sortedData = [];
        if (sortOption === "name") {
            sortedData = [...sortedFolders, ...sortedNotes];
        } else if (sortOption === "date") {
            const sortedFolderData = sortedFolders.sort(
                (a, b) => new Date(b.created_at) - new Date(a.created_at)
            );
            const sortedNoteData = sortedNotes.sort(
                (a, b) => new Date(b.created_at) - new Date(a.created_at)
            );
            sortedData = [...sortedFolderData, ...sortedNoteData];
        }

        setData(sortedData);
    }, [sortOption]);

    // 모달 열기 처리
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
                        setSortOption("date");
                    } else if (buttonIndex === 1) {
                        setSortOption("name");
                    }
                }
            );
        }
    }, []);

    // 검색어 제출 처리
    const handleSearchSubmit = () => {
        if (searchText === "") {
            setData(
                [...folderData, ...noteData].filter(
                    (item) => item.parentId === null
                )
            );
        } else {
            const filteredData = [...folderData, ...noteData].filter((item) =>
                item.name.includes(searchText)
            );
            setData(filteredData);
        }
    };

    return (
        <View style={styles.home}>
            <View style={styles.searchBar}>
                {currentFolder && (
                    <TouchableOpacity
                        onPress={handleGoBack}
                        style={styles.backButton}
                    >
                        <Icon
                            name="arrow-left"
                            type="font-awesome"
                            size={20}
                            color="#555"
                        />
                    </TouchableOpacity>
                )}
                <TextInput
                    style={styles.searchInput}
                    placeholder="검색어를 입력하세요."
                    onChangeText={(text) => setSearchText(text)}
                    onSubmitEditing={handleSearchSubmit}
                    returnKeyType="search"
                    value={searchText}
                />
                <TouchableOpacity style={styles.sortButton} onPress={modalOpen}>
                    <Icon
                        name="sort-amount-desc"
                        type="font-awesome"
                        size={20}
                        color="#555"
                    />
                    <SortModal
                        visible={modalVisible}
                        onClose={() => setModalVisible(false)}
                        setSortOption={setSortOption}
                    />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.list}>{renderPairs(data)}</ScrollView>

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
                    onPress={() =>
                        navigation.navigate("작성하기", {
                            serverResponse: null,
                            parentId: currentFolder,
                        })
                    }
                >
                    <View>
                        <Icon
                            name="file-plus"
                            type="feather"
                            size={24}
                            color="black"
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity="0.6"
                    style={{
                        ...styles.menuTab,
                        borderTopRightRadius: 10,
                        borderBottomRightRadius: 10,
                    }}
                    onPress={handleAddFolder}
                >
                    <View>
                        <Icon
                            name="folder-plus"
                            type="feather"
                            size={24}
                            color="black"
                        />
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
    searchBar: {
        paddingHorizontal: 20,
        paddingTop: 20,
        flexDirection: "row",
        alignItems: "center",
    },
    backButton: {
        marginRight: 10,
    },
    searchInput: {
        flex: 9,
        height: 40,
        backgroundColor: "white",
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    sortButton: {
        flex: 1,
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
