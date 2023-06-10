import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Keyboard,
    TouchableWithoutFeedback,
    Modal,
    Button,
} from "react-native";
import { useDispatch } from "react-redux";
import axios from "axios";
import { update } from "../reducers/noteReducer";

import { Icon } from "@rneui/themed";

function Edit({ navigation, route }) {
    const { selected } = route.params;

    const [title, setTitle] = useState(selected.name);
    const [content, setContent] = useState(selected.content);
    const [errorMessage, setErrorMessage] = useState("");
    const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);

    const dispatch = useDispatch();

    const handleSave = () => {
        if (title.trim() === "" || content.trim() === "") {
            setErrorMessage("제목과 내용을 입력해 주세요.");
            setIsErrorModalVisible(true);
            return;
        }

        const editNote = {
            id: selected.id,
            name: title.trim(),
            content: content.trim(),
        };
        console.log(editNote);

        axios
            .put(
                `https://port-0-us-server-das6e2dli8igkfo.sel4.cloudtype.app/PutText/${selected.id}/`,
                editNote
            )
            .then((response) => {
                dispatch(update(response.data));
            })
            .catch((error) => {
                console.log("Error renaming note:", error);
            })
            .finally(() => {
                navigation.navigate("노트", { selected: selected });
            });

        // TODO: Save the updated title and content
        console.log("Title:", title);
        console.log("Content:", content);
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

                <TouchableOpacity
                    style={styles.saveButton}
                    onPress={handleSave}
                >
                    <Icon name="check" type="feather" size={24} color="black" />
                </TouchableOpacity>

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
    saveButton: {
        position: "absolute",
        bottom: 20,
        right: 20,
        backgroundColor: "#fff",
        borderRadius: 50,
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowOffset: {
            width: 10,
            height: 10,
        },
    },
});

export default Edit;
