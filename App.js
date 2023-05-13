import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";

import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./reducers/index";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import HomeScreen from "./pages/Home";
import WriteScreen from "./pages/Write";

const store = createStore(rootReducer);

const Stack = createStackNavigator();

const LogoTitle = () => {
    return (
        <Image
            style={{ width: 40, height: 40 }}
            source={require("./assets/logo.png")}
        />
    );
};

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="홈"
                        component={HomeScreen}
                        options={{
                            headerTitle: (props) => <LogoTitle {...props} />,
                        }}
                    />
                    <Stack.Screen
                        name="작성하기"
                        component={WriteScreen}
                        options={{
                            headerTitle: (props) => <LogoTitle {...props} />,
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}
