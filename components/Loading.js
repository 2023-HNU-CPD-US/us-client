import React from "react";
import { View, ActivityIndicator, StyleSheet, Image } from "react-native";

const Loading = () => {
    return (
        <View style={styles.container}>
            <Image
                source={require("../assets/splash.png")}
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
        width: "100%",
        height: "100%",
    },
});

export default Loading;
