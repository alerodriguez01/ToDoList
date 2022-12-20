import React, { useState } from "react";
import { TextInput, TouchableOpacity } from "react-native";
import { Image, StyleSheet, Text, View } from "react-native";

import Flecha from '../images/double_arrow.png';

const Creacion = () => {

    const [nombre, setNombre] = useState('Edite el nombre');

    const editHandler = (nombre) => {
        setNombre(nombre);
    };

    const colores = ['orange','#FFE105','#49EC07','#08D6BA'];
    const [fillColor, setFillColor] = useState('orange');

    const stylesTitleExtra = nombre == 'Edite el nombre' ? 
                            {fontStyle: 'italic', color: '#A4A4A4'} : 
                            {color: 'black'};

    return (
        <View>
            <View style={styles.header}>
                <Image style={{...styles.image, tintColor: fillColor,}} source={Flecha} />
                <TextInput 
                style={[styles.title, stylesTitleExtra]} 
                onChangeText={editHandler} 
                onPressIn={()=>setNombre(prev => prev == 'Edite el nombre' ? '' : prev)}>
                    {nombre}
                </TextInput>
            </View>
            <View style={styles.colores}>
                {colores.map(color => (
                    <TouchableOpacity 
                    key={color} 
                    style={{...styles.colorBox, backgroundColor:color}}
                    onPress={()=>setFillColor(color)}></TouchableOpacity>
                ))}
            </View>
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
    },
    colorBox: {
        marginBottom: 8,
        borderRadius: 40,
        width:30,
        height:30,
    },
    image: {
        marginStart: 16,
        marginTop: 16,
        marginEnd: 8,
        width:35,
        height:35,
    },
    title: {
        marginTop: 6,
        fontSize: 25,
    },
    text: {
        fontSize: 14,
        marginStart: 6,
    },
});


export default Creacion;