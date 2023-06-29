import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import axios from "axios";

import { Icon } from "@rneui/themed";
import { useDispatch } from "react-redux";
import { add } from "../reducers/noteReducer";

function Save({ navigation, route }) {
    let { title, content, parentId } = route?.params;
    parentId = parentId == undefined ? null : parentId;

    const [loading, setLoading] = useState(true);
    const [completed, setCompleted] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        let currentDate = new Date();
        let formattedDate = currentDate.toISOString().slice(0, -1);

        const newNote = {
            id: Date.now(),
            name: title,
            content,
            created_at: formattedDate,
            parentId,
        };
        console.log(newNote);

        axios
            .post(
                "https://port-0-us-server-das6e2dli8igkfo.sel4.cloudtype.app/SaveText/",
                newNote
            )
            .then((response) => {
                dispatch(add(response.data));
                setLoading(false);
                setCompleted(true);
                setTimeout(() => {
                    navigation.navigate("홈");
                }, 1000);
            })
            .catch((error) => {
                console.log("노트 추가 에러:", error);
            });
    }, [title, content]);

    return (
        <View style={styles.container}>
            {loading ? (
                <View style={styles.loading}>
                    <ActivityIndicator size="large" color="gray" />
                    <Text style={styles.loadingText}>저장 중입니다.</Text>
                </View>
            ) : completed ? (
                <View style={styles.completed}>
                    <Icon
                        name="check-circle"
                        type="feather"
                        size={40}
                        color="green"
                    />
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
        marginTop: 10,
    },
    completed: {
        alignItems: "center",
        justifyContent: "center",
    },
    completedText: {
        marginTop: 10,
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
