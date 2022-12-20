import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import IconoMenos from '../images/remove.png';
import IconoRealizada from '../images/done_all.png';
import { Image } from "react-native";

const Item = ({ id, tarea, realizada }) => {

    const [selecciono, setSelecciono] = useState(realizada);

    const pressHandler = () => {
        setSelecciono(prev => !prev);
    };

    const finishEditing = () => {
        console.log("Termine de editar");
    }

    const color = selecciono ? '#A4A4A4' : 'black';
    const imagen = selecciono ? IconoRealizada : IconoMenos;
    const textEditable = selecciono ? false : true;

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={pressHandler}>
                <Image style={{ ...styles.image, tintColor: color }} source={imagen} />
            </TouchableOpacity>
            <TextInput style={{ ...styles.text, color: color }} onEndEditing={finishEditing} editable={textEditable} >
                {tarea}
            </TextInput>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#DFDFDF',
        marginStart: 15,
        marginEnd: 15,
    },
    image: {
        width: 25,
        height: 25,
        margin: 12,
    },
    text: {
        fontSize: 16,
    },
});

export default Item;