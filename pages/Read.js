import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from "react-native";

import { Icon } from "@rneui/themed";

function Read({ navigation, route }) {
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

    const handleEdit = () => {
        navigation.navigate("수정하기", { selected });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{selected.name}</Text>
            <Text style={styles.date}>{formattedDateTime}</Text>
            <ScrollView style={styles.contentContainer}>
                <Text style={styles.content}>{selected.content}</Text>
            </ScrollView>
            <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
                <Icon name="edit" type="feather" size={20} color="#fff" />
            </TouchableOpacity>
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
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    date: {
        fontSize: 14,
        color: "#999",
        marginBottom: 10,
    },
    contentContainer: {
        flex: 1,
    },
    content: {
        fontSize: 18,
        lineHeight: 24,
    },
    editButton: {
        width: 50,
        height: 50,
        alignSelf: "flex-end",
        marginTop: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: "#0D6EfD",
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowOffset: {
            width: 10,
            height: 10,
        },
    },
});

export default Read;
