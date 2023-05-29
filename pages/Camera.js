import React, { useState, useEffect, useRef } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

function ExpoCamera({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const { uri } = await cameraRef.current.takePictureAsync({
        quality: 1,
        exif: true,
        skipProcessing: true,
      });

      const formData = new FormData();
      formData.append("photo", {
        uri,
        name: "photo.jpg",
        type: "image/jpeg",
      });

      try {
        const response = await axios.post(
          "https://port-0-us-server-das6e2dli8igkfo.sel4.cloudtype.app/TextList/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 200) {
          // Handle the successful response
          console.log("Image uploaded successfully");

          // Navigate back to the home screen
          navigation.goBack();
        } else {
          // Handle errors if the request was not successful
          console.log("Image upload failed");
        }
      } catch (error) {
        // Handle any errors that occur during the request
        console.error(error);
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type} ref={cameraRef}>
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            style={{
              flex: 0.5,
              alignItems: "flex-end",
              alignSelf: "flex-end",
              justifyContent: "center",
              marginLeft: 70,
              marginBottom: 25,
            }}
            onPress={takePicture}
          >
            <Ionicons name="radio-button-on" size={60} color="white" />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

export default ExpoCamera;
