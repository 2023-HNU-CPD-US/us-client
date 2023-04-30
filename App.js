import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import HomeScreen from "./pages/Home";
import WriteScreen from "./pages/Write";

const Stack = createStackNavigator();

const LogoTitle = () => {
    return (
        <Image
            style={{ width: 50, height: 50 }}
            source={require("./logo.png")}
        />
    );
};

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        title: "홈 화면",
                    }}
                />
                <Stack.Screen name="Write" component={WriteScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#fff",
//         alignItems: "center",
//         justifyContent: "center",
//     },
// });
