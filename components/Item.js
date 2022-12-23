import React, { useContext, useState } from "react";
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import IconoCirculo from '../images/circle.png';
import IconoRealizada from '../images/check_circle.png';
import IconoBorrar from '../images/close.png';
import { Image } from "react-native";
import { SeccionContext } from "../context/SeccionContextProvider";

const Item = ({ idSeccion, id, tarea, realizada }) => {

    const { lista, setLista } = useContext(SeccionContext);

    const [selecciono, setSelecciono] = useState(realizada);

    const [texto, setTexto] = useState(tarea);

    const tareaPresionada = () => {
        if (texto) { // tarea puede ser "" o undefined, ambos falsy
            setSelecciono(prev => !prev);
            finishEditing(selecciono);
        }
    };

    const finishEditing = (presionoBoton) => {
        if (texto) { // tarea puede ser "" o undefined, ambos falsy
            // Busco la seccion a la que pertenece el item
            const seccionDelItem = lista.find(seccion => seccion.id == idSeccion);
            // y su indice en la lista
            const indiceSeccion = lista.indexOf(seccionDelItem);

            // Busco el item dentro de la seccion
            const item = seccionDelItem.items.find(item => item.id == id);
            // y su indice
            const indiceItem = item ? seccionDelItem.items.indexOf(item) : 0;

            // creo el item modificado
            const itemModificado = { id, tarea: texto, realizada: !presionoBoton }; // Dado que el setSelecciono no setea instantaneamente, me veo obligado a

            seccionDelItem.items.splice(indiceItem, item ? 1 : 0, itemModificado); // Coloco en el indiceItem el itemModificado, 
            // si se encontro el item (true): reemplazo un elemento, si no (false) inserto

            const copiaLista = [...lista]; // Copio los valores de la lista de secciones
            copiaLista.splice(indiceSeccion, 1, seccionDelItem); // Modifico la copia. Reemplazo 1 elemento at(indiceSeccion) con la seccionDelItem
            setLista(copiaLista);
        }
    }

    const tareaEliminada = () => {
        if (texto) { // tarea puede ser "" o undefined, ambos falsy
            // Busco la seccion a la que pertenece el item
            const seccionDelItem = lista.find(seccion => seccion.id == idSeccion);
            // y su indice en la lista
            const indiceSeccion = lista.indexOf(seccionDelItem);

            // Busco el item dentro de la seccion
            const item = seccionDelItem.items.find(item => item.id == id);
            // y su indice
            const indiceItem = item ? seccionDelItem.items.indexOf(item) : 0;

            // Creo el nuevo array de items (sin el eliminado)
            const nuevosItems = [...seccionDelItem.items.slice(0,indiceItem),...seccionDelItem.items.slice(indiceItem+1)];
            
            // Creo la seccion modificada
            const seccionModificada = {...seccionDelItem, ...{items:nuevosItems}};
            
            const copiaLista = [...lista]; // Copio los valores de la lista de secciones
            copiaLista.splice(indiceSeccion, 1, seccionModificada); // Modifico la copia. Reemplazo 1 elemento at(indiceSeccion) con la seccionModificada
            setLista(copiaLista);

        }
    };

    const color = selecciono ? '#A4A4A4' : 'black';
    const imagen = selecciono ? IconoRealizada : IconoCirculo;
    const textEditable = selecciono ? false : true;

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={tareaPresionada}>
                <Image style={{ ...styles.image, tintColor: color }} source={imagen} />
            </TouchableOpacity>
            <TextInput
                style={{ ...styles.text, color: color }}
                onChangeText={setTexto}
                onEndEditing={finishEditing}
                editable={textEditable}
                value={texto}
                placeholder="Escriba aquí"
                placeholderTextColor={'#A4A4A4'}
                multiline={true}>
            </TextInput>
            <View>
                <TouchableOpacity onPress={tareaEliminada}>
                    <Image style={{ ...styles.image, tintColor: '#484848' }} source={IconoBorrar} />
                </TouchableOpacity>
            </View>
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
        flex:1,
    },
});

export default Item;