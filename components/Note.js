import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { Entypo } from "@expo/vector-icons";

function Note() {
    return (
        <TouchableOpacity activeOpacity="0.6" style={styles.note}>
            <TouchableOpacity activeOpacity="0.6" style={styles.noteMenu}>
                <Entypo name="dots-three-vertical" size={18} color="#777" />
            </TouchableOpacity>
            <View>
                <Text style={styles.noteName}>제목</Text>
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
