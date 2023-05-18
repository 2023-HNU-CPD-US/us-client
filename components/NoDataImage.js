import React, { useRef, useState } from "react";
import { Text, Image, StyleSheet, View } from "react-native";

const NoDataImage = () => {
    const [imageHeight, setImageHeight] = useState(0);

    const handleLayout = (event) => {
        const { width } = event.nativeEvent.layout;
        const originalWidth = 827;
        const originalHeight = 618;
        const aspectRatio = originalWidth / originalHeight;
        const calculatedHeight = width * aspectRatio;
        setImageHeight(calculatedHeight);
    };

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={require("../assets/nodata.png")}
                    onLayout={handleLayout}
                    style={[styles.image, { height: imageHeight }]}
                />
                <Text style={styles.text}>새로운 노트를 추가해 보세요.</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    imageContainer: {
        width: "80%",
        alignItems: "center",
    },
    image: {
        width: "100%",
        resizeMode: "contain",
    },
    text: {
        marginTop: -50,
        fontSize: 18,
    },
});

export default NoDataImage;
