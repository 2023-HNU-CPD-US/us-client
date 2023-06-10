import React, { useEffect, useState } from "react";
import {
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Keyboard,
    TouchableWithoutFeedback,
    Text,
    Modal,
    Button,
} from "react-native";

import { Icon } from "@rneui/themed";

function Write({ navigation, route }) {
    const { serverResponse, parentId } = route?.params || {};

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);

    useEffect(() => {
        if (serverResponse?.result) {
            setContent(serverResponse.result);
        }
    }, [serverResponse?.result]);

    const handleSave = () => {
        if (title.trim() === "" || content.trim() === "") {
            setErrorMessage("제목과 내용을 입력해 주세요.");
            setIsErrorModalVisible(true);
            return;
        }

        navigation.navigate("저장", { title, content, parentId });
    };

    const closeModal = () => {
        setIsErrorModalVisible(false); // 팝업 닫기
    };

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
                        activeOpacity={0.6}
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
                            <Icon
                                name="camera"
                                type="feather"
                                size={24}
                                color="black"
                            />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.6}
                        style={{
                            ...styles.menuTab,
                            borderTopRightRadius: 10,
                            borderBottomRightRadius: 10,
                        }}
                        onPress={handleSave}
                    >
                        <View>
                            <Icon
                                name="check"
                                type="feather"
                                size={24}
                                color="black"
                            />
                        </View>
                    </TouchableOpacity>
                </View>

                {/* 팝업 컴포넌트 */}
                <Modal
                    visible={isErrorModalVisible}
                    animationType="fade"
                    transparent
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.errorMessage}>
                                {errorMessage}
                            </Text>
                            <Button title="확인" onPress={closeModal} />
                        </View>
                    </View>
                </Modal>
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
        borderRadius: 10,
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
        borderRadius: 10,
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

    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "white",
        padding: 30,
        borderRadius: 10,
    },
    errorMessage: { marginBottom: 20 },
});
