import React from "react";
import { View, Text, Button } from "react-native";

function Write({ navigation }) {
    //   test commit
    return (
        <View>
            <Text>Write Screen</Text>
            <Button
                title="Go to Home"
                onPress={() => navigation.navigate("Home")}
            />
        </View>
    );
}

export default Write;
