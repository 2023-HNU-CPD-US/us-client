import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome } from '@expo/vector-icons';



function Save({ navigation }) {
    return (
      <View style={{flex:1}}>
      <View style={styles.save_container}>
          <View style={styles.save_top}>
          <Text> 
              로고
          </Text>
          </View>
      </View>
      <View style= {styles.save_top_body}>
      <FontAwesome style={{paddingVertical: 80}} name="circle-thin" size={350} color="#ced4da" />
            <Text style={{ marginVertical: -265, fontSize: 38}}>
            0%
            </Text>
            </View>
            <View style={{alignItems: "center"}}>
            <Text style={{ marginVertical: -265, fontSize: 22}}>
            저장 중입니다.
            </Text>
            </View>
      </View>
    );
}

export default Save;

const styles = StyleSheet.create({
  save_container: {
      flex: 1,
      backgroundColor: "white"
  },
  save_top: {
      flex: 1,
      backgroundColor: "#e9ecef",
      alignItems : "center",
      justifyContent:"center",
      flexDirection: "row",
      width: "100%"
  },
  save_top_body: {
      flex:15,
      backgroundColor: "white",
      width: "100%", 
      alignItems: "center"
  }
});