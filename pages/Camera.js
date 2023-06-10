import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, Button } from "react-native";
import ImagePicker from "react-native-image-picker";
import axios from "axios";

function ExpoCamera({ navigation }) {
    const [imageUrl, setImageUrl] = useState("");
    const [status, requestPermission] =
        ImagePicker.useMediaLibraryPermissions();
    const [isLoading, setIsLoading] = useState(false);

    const selectImage = () => {
        const options = {
            title: "이미지 선택",
            mediaType: "photo",
            quality: 1,
            maxWidth: 500,
            maxHeight: 500,
        };

        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log("Image selection cancelled");
            } else if (response.error) {
                console.log("ImagePicker Error: ", response.error);
            } else {
                const { uri } = response;
                setImageUrl(uri);
                uploadImage(uri);
            }
        });
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
                <View>
                    <Button title="이미지 선택" onPress={selectImage} />
                </View>
            )}
        </View>
    );
}

export default ExpoCamera;
