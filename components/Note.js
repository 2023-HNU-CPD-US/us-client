import React, { useState, useCallback, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ActionSheetIOS,
} from "react-native";
import { useDispatch } from "react-redux";
import { remove, rename } from "../reducers/noteReducer";

import { Entypo } from "@expo/vector-icons";
import MenuModal from "./modal/MenuModal";

const MAX_LENGTH = 55; // 최대 글자수를 원하는 길이로 설정

function Note({ id, title, content }) {
    const [isMenuModalVisible, setMenuModalVisible] = useState(false);

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

    return (
        <TouchableOpacity activeOpacity="0.6" style={styles.note}>
            <TouchableOpacity
                activeOpacity="0.6"
                style={styles.noteMenu}
                onPress={modalOpen}
            >
                <Entypo name="dots-three-vertical" size={18} color="#777" />
                <MenuModal
                    id={id}
                    type="note"
                    visible={isMenuModalVisible}
                    onClose={() => setMenuModalVisible(false)}
                />
            </TouchableOpacity>
            <View>
                <Text style={styles.noteName}>{title}</Text>
                <Text style={styles.noteContents}>
                    {content.length > MAX_LENGTH
                        ? `${content.slice(0, MAX_LENGTH)} ...`
                        : content}
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
});

export default Note;
