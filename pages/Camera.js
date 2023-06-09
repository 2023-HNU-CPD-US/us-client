import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

function ExpoCamera({ navigation }) {
    const [imageUrl, setImageUrl] = useState("");
    const [status, requestPermission] =
        ImagePicker.useMediaLibraryPermissions();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } =
                await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== "granted") {
                alert("권한이 없습니다.");
                navigation.navigate("작성하기");
            } else {
                selectImage();
            }
        })();
    }, []);

    const selectImage = async () => {
        try {
            if (!status?.granted) {
                const permission = await requestPermission();
                if (!permission.granted) {
                    navigation.goBack();
                    return;
                }
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
            });

            if (!result.canceled) {
                const selectedAsset = result.assets[0];
                setImageUrl(selectedAsset.uri); // Set the selected image URL
                await uploadImage(selectedAsset.uri); // Call uploadImage
            } else {
                navigation.navigate("작성하기");
            }
        } catch (error) {
            console.error(
                "There was an error with the image selection: ",
                error
            );
        }
    };

    const uploadImage = async (imageUri) => {
        setIsLoading(true);
        try {
            const formData = new FormData();
            const imageFile = await fetch(imageUri);
            const blob = await imageFile.blob();

            formData.append("file", {
                name: "image.jpg",
                type: "image/jpg",
                uri: imageUri,
            });

            const response = await axios.post(
                "https://port-0-us-server-das6e2dli8igkfo.sel4.cloudtype.app/AddText/",
                formData
            );

            if (response.status < 200 || response.status >= 300) {
                console.log(response.status, response.data);
                throw new Error("Network response was not ok");
            }

            const jsonResponse = response.data;
            navigation.navigate("작성하기", { serverResponse: jsonResponse });

            // Process jsonResponse as required.
        } catch (error) {
            console.error("There was an error with the image upload: ", error);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
            {isLoading ? (
                <>
                    <ActivityIndicator size="large" color="gray" />
                    <Text style={{ marginTop: 10 }}>내용을 요약 중입니다.</Text>
                </>
            ) : (
                <View></View>
            )}
        </View>
    );
}

export default ExpoCamera;
