import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native";
import { TextInput } from "react-native";
import { Feather } from '@expo/vector-icons';

function Write({ navigation }) {
    return (
        <View style={{flex:1}}>
            <View style={styles.container}>
                <View style={styles.top}>

                    <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                        <AntDesign name="left" size={24} color="black" />
                    </TouchableOpacity>
                
                <Text> 
                    로고
                </Text>

                <TouchableOpacity onPress={() => alert()}>
                    <Ionicons name="checkmark" size={24} color="black" />
                </TouchableOpacity>

                </View>
            </View>
            

            <View style= {styles.top_body}>

                <TextInput 
                returnKeyType="done"
                placeholder= { "Untitled"}
                style={styles.input}>
                </TextInput>

            </View>

            <View style= {styles.body_foot}>
                <TextInput 
                    returnKeyType="done"
                    style={styles.input2}>
                </TextInput>
                <TouchableOpacity style={{justifyContent : "right"}}>
                            <Feather name="camera" size={24} color="#e9ecef" />
                </TouchableOpacity>
                
                
            </View>
        </View>
    );
}

export default Write
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
        paddingVertical: 300,
        marginHorizontal: 15,
        marginTop: 15,
    },
    body_foot: {
        flex:15,
        backgroundColor: "white",
    }
});