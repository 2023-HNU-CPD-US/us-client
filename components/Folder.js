import React, { useState, useCallback, useEffect, useRef } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    ActionSheetIOS,
    Keyboard,
} from "react-native";
import axios from "axios";

import { useDispatch } from "react-redux";
import { remove, rename } from "../reducers/folderReducer";

import { Icon } from "@rneui/themed";
import MenuModal from "./modal/MenuModal";

function Folder({ id, name, onPress }) {
    const [isMenuModalVisible, setMenuModalVisible] = useState(false);
    const [isRenaming, setisRenameing] = useState(false);
    const [newName, setNewName] = useState(name);
    const renameInputRef = useRef(null);

    const dispatch = useDispatch();

    const modalOpen = useCallback(() => {
        // setMenuModalVisible(true);
        if (Platform.OS === "android") {
            setMenuModalVisible(true);
        } else {
            ActionSheetIOS.showActionSheetWithOptions(
                {
                    options: ["이름 변경", "삭제", "취소"],
                    cancelButtonIndex: 2,
                },
                (buttonIndex) => {
                    if (buttonIndex === 0) {
                        setisRenameing(true);
                    } else if (buttonIndex === 1) {
                        deleteFolder();
                    }
                }
            );
        }
    }, []);

    useEffect(() => {
        if (isRenaming) {
            if (renameInputRef.current) renameInputRef.current.focus();
        }
    }, [isRenaming]);

    const handleRenameSubmit = ({ nativeEvent }) => {
        const { text } = nativeEvent;
        const renameFolder = {
            id,
            name: text.trim(),
        };
        console.log(renameFolder);

        axios
            .put(
                `https://port-0-us-server-das6e2dli8igkfo.sel4.cloudtype.app/PutFolder/${id}/`,
                renameFolder
            )
            .then((response) => {
                dispatch(rename(response.data));
            })
            .catch((error) => {
                console.log("Error renaming folder:", error);
            })
            .finally(() => {
                setisRenameing(false);
            });
    };

    const deleteFolder = () => {
        axios
            .delete(
                `https://port-0-us-server-das6e2dli8igkfo.sel4.cloudtype.app/DeleteFolder/${id}`
            )
            .then(() => {
                const removeFolder = {
                    id,
                };
                dispatch(remove(removeFolder));
            })
            .catch((error) => {
                console.log("Error deleting folder:", error);
            });
    };

    return (
        <TouchableOpacity
            activeOpacity="0.6"
            style={styles.folder}
            onPress={onPress}
        >
            <TouchableOpacity
                activeOpacity="0.6"
                style={styles.folderMenu}
                onPress={modalOpen}
            >
                <Icon
                    name="dots-three-vertical"
                    type="entypo"
                    size={18}
                    color="#777"
                />
                <MenuModal
                    id={id}
                    type="folder"
                    visible={isMenuModalVisible}
                    onClose={() => setMenuModalVisible(false)}
                    setisRenameing={setisRenameing}
                />
            </TouchableOpacity>
            <View>
                <Image
                    style={{ width: "60%", height: undefined, aspectRatio: 1 }}
                    resizeMode="contain"
                    source={require("../assets/folder.png")}
                ></Image>
                {!isRenaming && <Text style={styles.folderName}>{name}</Text>}
                {isRenaming && (
                    <TextInput
                        ref={renameInputRef}
                        value={newName}
                        style={styles.renameInput}
                        returnKeyType="done"
                        onChangeText={setNewName}
                        onSubmitEditing={handleRenameSubmit}
                    />
                )}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    folder: {
        width: "48%",
        backgroundColor: "#fff",
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    folderMenu: {
        position: "absolute",
        top: 20,
        right: 10,
    },
    folderName: {
        fontSize: 15,
        fontWeight: 600,
        marginTop: 5,
    },
    renameInput: {
        height: 20,
        borderRadius: 5,
        backgroundColor: "#eee",
        padding: 5,
        marginTop: 5,
    },
});

export default Folder;
