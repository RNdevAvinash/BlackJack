import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions
} from 'react-native';

const { width, height } = Dimensions.get("window");

const Overlay = (props) => {
    
    return (
        <View style={styles.overlay}>
        <View style={{top:(-10)}}>
            <View style={{flexDirection:'row',justifyContent:'center'}}>
                <Text style={styles.pointText}>Dealer : {props.delearPoint}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={styles.pointText}>Your : {props.userPoint}</Text>
            </View>
            </View>
            <Text style={styles.text}>{props.text}</Text>
            <TouchableOpacity onPress={() => props.onClose()}>
                <View style={styles.btn}>
                    <Text style={styles.continueBtn}>CONTINUE</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    overlay: {
        backgroundColor: "rgba(0,0,0,0.9)",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 5,
        alignItems: "center",
        justifyContent: "center",
        width: width,
        height: height / 2,
        paddingVertical: 20
    },
    pointText:{
        color: "#fff",
        fontSize: 20,
        textAlign: "center"
    },
    text: {
        color: "#fff",
        fontSize: 40,
        textAlign: "center"
    },

    center: {
        alignItems: "center",
        justifyContent: "center"
    },

    btn: {
        marginVertical: 15,
        borderWidth: 1,
        borderColor: "#fff",
        padding: 8
    },

    continueBtn: {
        color: "#fff",
        fontSize: 14,
        textAlign: "center"
    }
});

export default Overlay;