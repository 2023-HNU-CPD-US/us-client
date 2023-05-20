import React from "react";
import { View, Text, Button } from "react-native";

function Home({ navigation }) {
    return (
        <View>
            <Text>Home Screen</Text>
            <Button
                title="Go to Write"
                onPress={() => navigation.navigate("Write")}
            />
        </View>
    );
}

export default Home;
