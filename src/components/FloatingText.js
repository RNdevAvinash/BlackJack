import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

const FloatingText = props => {
    return (
        <View style={styles.indicator}>
            <Text style={styles.indicatorTxt}>{props.text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    indicator: {
        backgroundColor: "rgba(0,0,0,0.4)",
        borderColor: "rgba(0,0,0,0.4)",
        padding: 10,
        alignItems: "center",
        marginTop: 8,
        marginBottom: 8,
        borderRadius: 4
    },
    indicatorTxt: {
        color: "white",
        fontSize: 16,
        fontWeight: '600'
    }
});

export default FloatingText;