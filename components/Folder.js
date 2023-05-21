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
import { useDispatch } from "react-redux";
import { remove, rename } from "../reducers/folderReducer";

import { Entypo } from "@expo/vector-icons";
import MenuModal from "./modal/MenuModal";

function Folder({ id, name }) {
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
                        const removeFolder = {
                            id,
                        };
                        dispatch(remove(removeFolder));
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
            newName: text,
        };
        dispatch(rename(renameFolder));

        setisRenameing(false);
    };

    return (
        <TouchableOpacity activeOpacity="0.6" style={styles.folder}>
            <TouchableOpacity
                activeOpacity="0.6"
                style={styles.folderMenu}
                onPress={modalOpen}
            >
                <Entypo name="dots-three-vertical" size={18} color="#777" />
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
