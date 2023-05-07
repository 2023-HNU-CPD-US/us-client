import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

import { Entypo } from "@expo/vector-icons";

function Folder({ name }) {
    return (
        <TouchableOpacity activeOpacity="0.6" style={styles.folder}>
            <TouchableOpacity activeOpacity="0.6" style={styles.folderMenu}>
                <Entypo name="dots-three-vertical" size={18} color="#777" />
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
