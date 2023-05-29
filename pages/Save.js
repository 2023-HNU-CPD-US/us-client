import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator} from "react-native";
import { Ionicons } from "@expo/vector-icons";


function Save({ navigation }) {
    const [loading, setLoading] = useState(true);
    const [completed, setCompleted] = useState(false);
    

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
            setCompleted(true);
            setTimeout(() => {
                navigation.navigate("홈");
            }, 1000);
        }, 3000);
    }, []);

    return (
        <View style={styles.container}>
            {loading ? (
                <View style={styles.loading}>
                    <ActivityIndicator size="large" color="black" />
                    <Text style={styles.loadingText}>저장 중입니다.</Text>
                </View>
            ) : completed ? (
                <View style={styles.completed}>
                    <Ionicons name="checkmark-circle" size={72} color="green" />
                    <Text style={styles.completedText}>
                        저장이 완료되었습니다!
                    </Text>
                </View>
            ) : (
                <View style={styles.loadedText}>
                    <Text style={styles.text}>내용이 로딩되었습니다!</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    loading: {
        alignItems: "center",
        justifyContent: "center",
    },
    loadingText: {
        marginTop: 20,
        fontSize: 22,
    },
    completed: {
        alignItems: "center",
        justifyContent: "center",
    },
    completedText: {
        marginTop: 20,
        fontSize: 22,
        color: "green",
    },
    loaded: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    loadedText: {
        fontSize: 24,
    },
});

export default Save;
