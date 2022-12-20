import React, { useContext } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";

import Flecha from '../images/double_arrow.png';
import Item from "./Item";

const Seccion = ({ name }) => {

    const numTareas = 1;

    return (
        <View>
            <View style={styles.header}>
                <Image style={styles.image} source={Flecha} />
                <Text style={styles.title}>Tareas</Text>
            </View>

            <Text style={styles.text}>
                {numTareas != 1 ? `${numTareas} tareas pendientes` : `${numTareas} tarea pendiente`}
            </Text>
            {/*Listado de items*/}
            <Item />
            <Item />
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
    },
    image: {
        marginStart: 16,
        marginTop: 16,
        marginEnd: 8,
        tintColor: 'orange',
        width: 35,
        height: 35,
    },
    title: {
        marginEnd: 16,
        marginTop: 16,
        fontSize: 25,
        color: 'black'
    },
    text: {
        marginStart: 59,
        marginBottom: 10,
        fontSize: 12,
        color: '#A4A4A4',
    }
});

export default Seccion;