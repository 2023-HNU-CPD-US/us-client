import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import HomeScreen from "./pages/Home";
import WriteScreen from "./pages/Write";
import SaveScreen from "./pages/Save";
import CameraScreen from "./pages/expo";

const Stack = createStackNavigator();

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
                <Stack.Screen name="Save" component={SaveScreen} />
                <Stack.Screen name="Camera" component={CameraScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#ced4da",
//         alignItems: "center",
//         justifyContent: "center",
//     },
// });
