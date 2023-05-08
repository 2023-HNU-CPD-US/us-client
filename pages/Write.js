import React, {useState, useCallback, useEffect} from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Linking, ActionSheetIOS, Keyboard, TouchableWithoutFeedback } from "react-native";
import UploadModeModal from "./UploadModeModal";
import { launchImageLibrary, launchCamera } from "react-native-image-picker";
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';



function Write({ navigation }) {
        const [note, setNote] = useState('');
        const [textInputHeight, setTextInputHeight] = useState(0);
        const handleBlur = () => {
            Keyboard.dismiss();
          };
        const imagePickerOption = {
            mediaType: "photo",
            maxWidth: 768,
            maxHeight: 768,
            includeBase64: Platform.OS === "android",
        };
        const handlePress = () => {
            Linking.openURL('photos-redirect://');
          };
          const onPickImage = useCallback((res) => { 
            if (res.didCancel || !res) {
              return;
            }
            console.log("PickImage", res);
          }, []);
          
          const onLaunchCamera = useCallback(() => {
            launchCamera(imagePickerOption, onPickImage);
          }, [onPickImage]);
          
          const onLaunchImageLibrary = useCallback(() => {
            launchImageLibrary(imagePickerOption, onPickImage);
          }, [onPickImage]);
        
          const [modalVisible, setModalVisible] = useState(false);
          
          const modalOpen = useCallback(() => {
            if (Platform.OS === "android") { 
              setModalVisible(true); 
            } else { 
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
                }
              );
            }
          }, [onLaunchCamera, onLaunchImageLibrary]);
          const dismissKeyboard = () => {
            Keyboard.dismiss();
          };

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={{flex:1}}>
            <View style={styles.container}>
                <View style={styles.top}>

                    <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                        <AntDesign name="left" size={24} color="black" />
                    </TouchableOpacity>
                
                <Text> 
                    로고
                </Text>

                <TouchableOpacity onPress={() => navigation.navigate("Save")}>
                    <Ionicons name="checkmark" size={24} color="black" />
                </TouchableOpacity>

                </View>
            </View>
            

            <View style= {styles.top_body}>

                <TextInput
                style={styles.input}
                value={note} 
                onChange={setNote}
                returnKeyType="done"
                placeholder= { "Untitled"}
                >
                </TextInput>

            </View>

            <View style= {styles.body_foot}>
                <TextInput 
                    value={note} 
                    onChange={setNote}
                    returnKeyType="done"
                    style={[styles.input2, { height: Math.max(40, textInputHeight) }]}
                    multiline
                    onContentSizeChange={(event) => {
                      setTextInputHeight(event.nativeEvent.contentSize.height);
                    }}
                    
                    >
                        
                </TextInput>
            </View>
            <View>
            <TouchableOpacity onPress={modalOpen}>
                            <Feather style={{marginLeft: 330, marginVertical: -60}}name="camera" size={38} color="black" />
                            <UploadModeModal 
                            visible={modalVisible} 
                            onClose={() => setModalVisible(false)}
                            onLaunchCamera={onLaunchCamera}
                            onLaunchImageLibrary={onLaunchImageLibrary} />
                </TouchableOpacity> 
            </View>

        </View>
        </TouchableWithoutFeedback>
        
    );
}

export default Write;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    top: {
        flex: 1,
        backgroundColor: "#e9ecef",
        justifyContent : "space-between",
        alignItems : "center",
        flexDirection: "row",
        width: "100%"
    },
    top_body: {
        flex:1,
        backgroundColor: "white"
    },
    input: {
        backgroundColor: '#f1f3f5',
        paddingVertical: 10,
        marginHorizontal: 15,
        marginTop: 15

    },
    input2: {
        backgroundColor: '#f1f3f5',
        paddingVertical: 610,
        marginHorizontal: 15,
        marginTop: 15,
    },
    body_foot: {
        flex:15,
        backgroundColor: "white",
    }
});