import React from "react";
import { View, ActivityIndicator, StyleSheet, Image } from "react-native";

const Loading = () => {
    return (
        <View style={styles.container}>
            <Image
                source={require("../assets/logo.png")}
                style={styles.image}
                resizeMode="contain"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: 200, // 이미지의 너비 조절
        height: 200, // 이미지의 높이 조절
    },
});

export default Loading;
