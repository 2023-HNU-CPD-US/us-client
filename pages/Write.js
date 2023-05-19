import React, { useState } from "react";
import {
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Keyboard,
    TouchableWithoutFeedback,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

function Write({ navigation }) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [textInputHeight, setTextInputHeight] = useState(0);

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={{ flex: 1 }}>
                <View style={styles.titleWrap}>
                    <TextInput
                        style={styles.titleInput}
                        value={title}
                        onChangeText={(text) => setTitle(text)}
                        placeholder={"제목을 입력하세요."}
                    ></TextInput>
                </View>

                <View style={styles.contentWrap}>
                    <TextInput
                        style={styles.contentInput}
                        value={content}
                        onChangeText={(text) => setContent(text)}
                        placeholder={"내용을 입력하세요."}
                        multiline
                    ></TextInput>
                </View>

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
                        onPress={() => navigation.navigate("카메라")}
                    >
                        <View>
                            <Feather name="camera" size={24} color="black" />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity="0.6"
                        style={{
                            ...styles.menuTab,
                            borderTopRightRadius: 10,
                            borderBottomRightRadius: 10,
                        }}
                        onPress={() => navigation.navigate("저장")}
                    >
                        <View>
                            <Ionicons
                                name="checkmark"
                                size={24}
                                color="black"
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

export default Write;
const styles = StyleSheet.create({
    titleWrap: {
        flex: 1,
        backgroundColor: "white",
        padding: 15,
    },
    titleInput: {
        height: "100%",
        backgroundColor: "#f1f3f5",
        padding: 10,
    },
    contentWrap: {
        flex: 12,
        backgroundColor: "white",
        paddingHorizontal: 15,
        paddingBottom: 15,
    },
    contentInput: {
        height: "100%",
        backgroundColor: "#f1f3f5",
        paddingTop: 15,
        paddingHorizontal: 10,
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
