import React, { useContext } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";

import FlechaSVG from '../images/arrowhead-right.svg';

const Seccion = ({ name }) => {



    return (
        <View>
            <View style={styles.container}>
                <FlechaSVG width={35} height={35} fill={"orange"} style={styles.image} />
                <Text style={styles.title}>Tareas</Text>
            </View>
            <View>
                <Text style={styles.text}>1 tarea pendiente</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    image: {
        marginStart: 16,
        marginTop: 16,
        marginEnd: 8,
    },
    title: {
        marginEnd: 16,
        marginTop: 16,
        fontSize: 25,
        fontWeight: 'bold',
    },
    text: {
        marginStart: 59,
        fontSize: 12,
        color:'#A4A4A4',
    }
});

export default Seccion;