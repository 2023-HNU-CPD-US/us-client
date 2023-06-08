import React, { useEffect, useState } from "react";
import { Image } from "react-native";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/index";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import HomeScreen from "./pages/Home";
import WriteScreen from "./pages/Write";
import SaveScreen from "./pages/Save";
import CameraScreen from "./pages/Camera";
import Loading from "./components/Loading";

import { fetchData } from "./actions";

const Stack = createStackNavigator();

const LogoTitle = () => {
    return (
        <Image
            style={{ width: 40, height: 40 }}
            source={require("./assets/logo.png")}
        />
    );
};

const store = configureStore({
    reducer: rootReducer,
});

export default function App() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDataFromServer = async () => {
            try {
                await store.dispatch(fetchData());
                setTimeout(() => {
                    setIsLoading(false);
                }, 1000);
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        };

        fetchDataFromServer();
    }, []);

    if (isLoading) {
        return <Loading />;
    }

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
                    <Stack.Screen
                        name="저장"
                        component={SaveScreen}
                        options={{
                            headerTitle: (props) => <LogoTitle {...props} />,
                        }}
                    />
                    <Stack.Screen name="카메라" component={CameraScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}
