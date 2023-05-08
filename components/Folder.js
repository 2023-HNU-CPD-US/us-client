import React, { useState, useCallback, useEffect } from "react";
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

import { Entypo } from "@expo/vector-icons";
import MenuModal from "./MenuModal";

function Folder({ name }) {
    const [modalVisible, setModalVisible] = useState(false);

    const modalOpen = useCallback(() => {
        // setModalVisible(true);
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
        <TouchableOpacity activeOpacity="0.6" style={styles.folder}>
            <TouchableOpacity
                activeOpacity="0.6"
                style={styles.folderMenu}
                onPress={modalOpen}
            >
                <Entypo name="dots-three-vertical" size={18} color="#777" />
                <MenuModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                />
            </TouchableOpacity>
            <View>
                <Image
                    style={{ width: "60%", height: undefined, aspectRatio: 1 }}
                    resizeMode="contain"
                    source={require("../assets/folder.png")}
                ></Image>
                <Text style={styles.folderName}>{name}</Text>
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
});

export default Folder;
