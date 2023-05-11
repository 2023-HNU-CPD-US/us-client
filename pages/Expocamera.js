import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { Ionicons, AntDesign } from '@expo/vector-icons';
export default function expo({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  const takePicture = async () => {
    if (camera.current) {
      const { uri } = await camera.current.takePictureAsync({
        quality: 1,
        exif: true,
        skipProcessing: true
      });
      setCapturedPhoto(uri);
      savePicture(uri);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
              style={{
                flex: 0.5,
                alignItems:'flex-end',
                alignSelf:'flex-end',
                justifyContent:'center',
                marginLeft : 70,
                marginBottom : 25
              }}
              onPress={takePicture}
            >
              <Ionicons
              name="radio-button-on" 
              size={60} 
              color="white" />
              </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}
