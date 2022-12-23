import React, { useEffect, useState } from "react";
import { TextInput, TouchableOpacity } from "react-native";
import { Image, StyleSheet, Text, View } from "react-native";

import Flecha from '../images/double_arrow.png';
import CruzImagen from '../images/close.png';
import CheckImagen from '../images/done.png';


const Creacion = ({ navigation }) => {

    const [nombre, setNombre] = useState('');

    const colores = ['orange', '#FFE105', '#49EC07', '#08D6BA'];
    const [fillColor, setFillColor] = useState('orange');

    // Reemplazar los Image por los botones que deseamos, con el comportamiento deseado
    useEffect(() => {
        // Use `setOptions` to update the buttons that we previously specified
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={CruzImagen} style={styles.imageHeader} />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <TouchableOpacity onPress={crearSeccion}>
                    <Image source={CheckImagen} style={styles.imageHeader} />
                </TouchableOpacity>
            ),
        });
    }, [nombre, fillColor]); // Esto podria hacerse mas performante, dado que se ejecuta cada vez que se cambie nombre y color
    // y es necesario para que el metodo 'crearSeccion' navegue correctamente.

    const crearSeccion = () => {
        // Guardar la sección
        navigation.navigate({
            name: 'Secciones',
            params: {
                nombreSeccion: nombre,
                color: fillColor,
            },
            merge: true,
        });
        // el merge no se muy bien para qué sirve
    }

    return (
        <View style={styles.header}>
            <View style={styles.colores}>
                <Image style={{ ...styles.image, tintColor: fillColor, }} source={Flecha} />
                {colores.map(color => (
                    <TouchableOpacity
                        key={color}
                        style={{ ...styles.colorBox, backgroundColor: color }}
                        onPress={() => setFillColor(color)}></TouchableOpacity>
                ))}
            </View>
            <TextInput
                style={styles.title}
                placeholder="Edite el nombre"
                onChangeText={setNombre}
                value={nombre}
                multiline={true}>
            </TextInput>
            {/*setNombre es lo mismo que setNombre(nombre)*/}
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
    },
    colores: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginStart: 20,
        marginEnd: 10,
    },
    colorBox: {
        marginBottom: 8,
        borderRadius: 40,
        width: 30,
        height: 30,
    },
    image: {
        marginTop: 16,
        marginBottom: 8,
        width: 35,
        height: 35,
    },
    title: {
        marginTop: 6,
        fontSize: 25,
        flex: 1,
        textAlignVertical: 'top'
    },
    imageHeader: {
        width: 30,
        height: 30,
        tintColor: '#fff',
    }
});


export default Creacion;