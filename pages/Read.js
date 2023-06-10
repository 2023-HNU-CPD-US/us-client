import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

function Read({ route }) {
    const { selected } = route.params;

    const formattedDate = new Date(selected.created_at).toLocaleDateString(
        "ko-KR",
        {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        }
    );

    const formattedTime = new Date(selected.created_at).toLocaleTimeString(
        "ko-KR",
        {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
        }
    );

    const formattedDateTime = `${formattedDate} ${formattedTime}`;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{selected.name}</Text>
            <Text style={styles.date}>{formattedDateTime}</Text>
            <ScrollView style={styles.contentContainer}>
                <Text style={styles.content}>{selected.content}</Text>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    date: {
        fontSize: 12,
        color: "#999",
        marginBottom: 10,
    },
    contentContainer: {
        flex: 1,
    },
    content: {
        fontSize: 16,
    },
});

export default Read;
