import React, { useState, useCallback, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ActionSheetIOS,
} from "react-native";

import { Entypo } from "@expo/vector-icons";
import MenuModal from "./MenuModal";

function Note({ id, title }) {
    const [modalVisible, setModalVisible] = useState(false);

    const modalOpen = useCallback(() => {
        if (Platform.OS === "android") {
            setModalVisible(true);
        } else {
            ActionSheetIOS.showActionSheetWithOptions(
                {
                    options: ["이름 변경", "삭제", "취소"],
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
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                />
            </TouchableOpacity>
            <View>
                <Text style={styles.noteName}>{title}</Text>
                <Text style={styles.noteContents}>
                    Lorem Ipsum is simply dummy text of the printing and ...
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
