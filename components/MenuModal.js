import React, { useEffect } from "react";
import { StyleSheet, Modal, View, Pressable, Text } from "react-native";

export default function MenuModal({ id, visible, onClose }) {
    const handleDelete = () => {
        console.log(1);
        onClose();
    };

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <Pressable style={styles.background} onPress={onClose}>
                <View style={styles.whiteBox}>
                    <Pressable
                        style={{
                            ...styles.actionButton,
                            borderBottomWidth: "1px",
                            borderBottomColor: "#eee",
                        }}
                        android_ripple={{ color: "#eee" }}
                        onPress={() => {
                            onClose();
                        }}
                    >
                        <Text style={styles.actionText}>이름 변경</Text>
                    </Pressable>
                    <Pressable
                        style={styles.actionButton}
                        android_ripple={{ color: "#eee" }}
                        onPress={handleDelete}
                    >
                        <Text style={styles.actionText}>삭제</Text>
                    </Pressable>
                </View>
            </Pressable>
        </Modal>
    );
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: "rgba(0,0,0,0,6)",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    whiteBox: {
        width: 300,
        backgroundColor: "white",
        borderRadius: 4,
        elevation: 2,
        shadowColor: "#000",
        shadowOpacity: 0.03,
        shadowOffset: {
            width: 10,
            height: 10,
        },
    },
    actionButton: {
        padding: 16,
        flexDirection: "row",
        alignItems: "center",
    },
    actionText: {
        fontSize: 16,
    },
});
