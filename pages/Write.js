import React, {useState} from "react";
import { View, StyleSheet, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from "react-native";

import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';



function Write({ navigation }) {
        const [note, setNote] = useState('');
        const [textInputHeight, setTextInputHeight] = useState(0);
        const dismissKeyboard = () => {
          Keyboard.dismiss();
        };
        const imagePickerOption = {
            mediaType: "photo",
            maxWidth: 768,
            maxHeight: 768,
            includeBase64: Platform.OS === "android",
        };

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={{flex:1}}>
            <View style={styles.container}>
                <View style={styles.top}>

                    <TouchableOpacity onPress={() => navigation.navigate("홈")}>
                        <AntDesign name="left" size={24} color="black" />
                    </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("저장")}>
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
            <TouchableOpacity onPress={() => navigation.navigate("카메라")}>
                            <Feather style={{marginLeft: 330, marginVertical: -60}}
                            name="camera" 
                            size={38} 
                            color="black" />
                            
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