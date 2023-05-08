import React, { useState } from "react";
import { View, Pressable, Platform, ActionSheetIOS } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import UploadModeModal from "./UploadModeModal";
import { launchImageLibrary, launchCamera } from "react-native-image-picker";

const imagePickerOption = {
	mediaType: "photo",
	maxWidth: 768,
	maxHeight: 768,
	includeBase64: Platform.OS === "android",
};

function Camera() {

  // 선택 사진 또는 촬영된 사진 정보
  const onPickImage = (res) => { 
    if (res.didCancel || !res) {
      return;
    }
    console.log("PickImage", res);
  }
  
  // 카메라 촬영
  const onLaunchCamera = () => {
    launchCamera(imagePickerOption, onPickImage);
  };
  
  // 갤러리에서 사진 선택
  const onLaunchImageLibrary = () => {
    launchImageLibrary(imagePickerOption, onPickImage);
  };

  // 안드로이드를 위한 모달 visible 상태값
  const [modalVisible, setModalVisible] = useState(false);
  
  // 선택 모달 오픈
  const modalOpen = () => {
    if (Platform.OS === "android") { // 안드로이드
      setModalVisible(true); // visible = true
    } else { // iOS
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ["카메라로 촬영하기", "사진 선택하기", "취소"],
          cancelButtonIndex: 2,
        },
        (buttonIndex) => {
          if (buttonIndex === 0) {
            onLaunchCamera();
          } else if (buttonIndex === 1) {
            onLaunchImageLibrary();
          }
        },
      )
    }
  }
  
  return (
      <UploadModeModal 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)}
        onLaunchCamera={onLaunchCamera}
        onLaunchImageLibrary={onLaunchImageLibrary} />
  );
}


export default Camera;