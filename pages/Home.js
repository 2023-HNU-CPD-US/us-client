import React, { useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActionSheetIOS,
} from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { add } from "../reducers/folderReducer";
import axios from 'axios';

import Folder from "../components/Folder";
import Note from "../components/Note";
import SortModal from "../components/modal/SortModal";
import NoDataImage from "../components/NoDataImage";

function Home({ navigation }) {
  const folderData = useSelector((state) => state.folderReducer.folders);
  const noteData = useSelector((state) => state.noteReducer.notes);

  const [data, setData] = useState([]);
  const [getdata, setgetData] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [currentFolder, setCurrentFolder] = useState(null);
  const [sortOption, setSortOption] = useState("name");

  const dispatch = useDispatch();

  const handleAddFolder = useCallback(() => {
    const newFolder = {
      id: Date.now(), // 임의의 고유 ID 생성
      name: "새 폴더",
      parentId: currentFolder, // 현재 폴더를 부모로 설정
    };

    axios
      .post("https://port-0-us-server-das6e2dli8igkfo.sel4.cloudtype.app/FolderList/", newFolder)
      .then((response) => {
        dispatch(add(response.data));
      })
      .catch((error) => {
        console.log("Error adding folder:", error);
      });
  }, [currentFolder, dispatch]);

  const handleFolderPress = useCallback((folderId) => {
    setCurrentFolder(folderId);
  }, []);

  const handleGoBack = useCallback(() => {
    if (currentFolder) {
      const parentFolder = folderData.find((folder) => folder.id === currentFolder);
      if (parentFolder) {
        setCurrentFolder(parentFolder.parentId);
      }
    }
  }, [currentFolder, folderData]);

  useEffect(() => {
    const filteredData = [...folderData, ...noteData].filter((item) => item.parentId === currentFolder);
    const sortedData = filteredData.sort((a, b) => a.name.localeCompare(b.name));

    setData(sortedData);
  }, [folderData, noteData, currentFolder]);

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

  const handleSearchSubmit = useCallback(() => {
    if (searchText === "") {
      const filteredData = [...folderData, ...noteData].filter((item) => item.parentId === null);
      setData(filteredData);
    } else {
      const filteredData = [...folderData, ...noteData].filter((item) =>
        item.name.includes(searchText)
      );
      setData(filteredData);
    }
  }, [searchText, folderData, noteData]);

  return (
    <View style={styles.home}>
      <View style={styles.header}>
        {currentFolder && (
          <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
            <FontAwesome name="arrow-left" size={20} color="#555" />
          </TouchableOpacity>
        )}
        <TextInput
          style={styles.searchInput}
          placeholder="검색어를 입력하세요."
          onChangeText={(text) => setSearchText(text)}
          onSubmitEditing={handleSearchSubmit}
          value={searchText}
        />
        <TouchableOpacity onPress={modalOpen} style={styles.sortButton}>
          <FontAwesome name="sort-amount-desc" size={20} color="#555" />
          <SortModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            setSortOption={setSortOption}
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.list}>
        <View style={styles.row}>
          {data.length ? (
            data.map((item) => {
              if (item.type === "folder") {
                return (
                  <Folder
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    onPress={() => handleFolderPress(item.id)}
                  />
                );
              } else {
                return (
                  <Note
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    content={item.content}
                  />
                );
              }
            })
          ) : (
            <NoDataImage />
          )}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("작성하기")}
        >
          <Feather name="file-plus" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddFolder}
        >
          <Feather name="folder-plus" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  home: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  backButton: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: "white",
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  sortButton: {
    marginLeft: 10,
  },
  list: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 90,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  footer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
  },
  addButton: {
    backgroundColor: "#fff",
    flex: 1,
    alignItems: "center",
    paddingVertical: 20,
    borderRadius: 10,
    marginRight: 10,
  },
});

export default Home;
