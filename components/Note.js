import React, { useState, useCallback, useEffect, useRef } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActionSheetIOS,
} from "react-native";
import { useDispatch } from "react-redux";
import { remove, rename } from "../reducers/noteReducer";

import { Icon } from "@rneui/themed";
import MenuModal from "./modal/MenuModal";

const MAX_LENGTH = 55; // 최대 글자수를 원하는 길이로 설정

function Note({ id, name, content }) {
    const [isMenuModalVisible, setMenuModalVisible] = useState(false);
    const [isRenaming, setisRenameing] = useState(false);
    const [newName, setNewName] = useState(name);
    const renameInputRef = useRef(null);

    const dispatch = useDispatch();

    const modalOpen = useCallback(() => {
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
                        const removeNote = {
                            id,
                        };
                        dispatch(remove(removeNote));
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
        const renameNote = {
            id,
            newName: text,
        };
        dispatch(rename(renameNote));

        setisRenameing(false);
    };

    return (
        <TouchableOpacity activeOpacity="0.6" style={styles.note}>
            <TouchableOpacity
                activeOpacity="0.6"
                style={styles.noteMenu}
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
                    type="note"
                    visible={isMenuModalVisible}
                    onClose={() => setMenuModalVisible(false)}
                    setisRenameing={setisRenameing}
                />
            </TouchableOpacity>
            <View>
                {!isRenaming && <Text style={styles.noteName}>{name}</Text>}
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
                <Text style={styles.noteContents}>
                    {content &&
                        (content.length > MAX_LENGTH
                            ? `${content.slice(0, MAX_LENGTH)} ...`
                            : content)}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    note: {
        width: "48%",
        backgroundColor: "#fff",
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    noteMenu: {
        position: "absolute",
        top: 20,
        right: 10,
    },
    noteName: {
        fontSize: 15,
        fontWeight: 600,
        marginBottom: 5,
    },
    noteContents: {},
    renameInput: {
        height: 20,
        borderRadius: 5,
        backgroundColor: "#eee",
        padding: 5,
        marginBottom: 5,
    },
});

export default Note;
