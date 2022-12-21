import React, { useContext, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import IconoMenos from '../images/remove.png';
import IconoRealizada from '../images/done_all.png';
import { Image } from "react-native";
import { SeccionContext } from "../context/SeccionContextProvider";

const Item = ({ idSeccion, id, tarea, realizada}) => {
    
    const {lista, setLista} = useContext(SeccionContext);

    const [selecciono, setSelecciono] = useState(realizada);

    const [texto, setTexto] = useState(tarea);

    const pressHandler = () => {
        setSelecciono(prev => !prev);
        finishEditing(selecciono);
    };
    
    const finishEditing = (presionoBoton) => {
        if(texto){ // tarea puede ser "" o undefined, ambos falsy
            // Busco la seccion a la que pertenece el item
            const seccionDelItem = lista.find( seccion =>  seccion.id == idSeccion );
            const indiceSeccion = lista.indexOf(seccionDelItem);
            
            const item = seccionDelItem.items.find( item =>  item.id == id );
            const indiceItem = item ? seccionDelItem.items.indexOf(item) : 0;
            
            const itemModificado = {id, tarea:texto, realizada:!presionoBoton}; // Dado que el setSelecciono no setea instantaneamente, me veo obligado a

            seccionDelItem.items.splice(indiceItem, item ? 1 : 0, itemModificado); // Coloco en el indice item, 
            // si se encontro el item (true): reemplazo un elemento, si no (false) inserto

            const copiaLista = [...lista]; // Copio los valores de la lista de secciones
            copiaLista.splice(indiceSeccion, 1, seccionDelItem); // Modifico la copia. Reemplazo 1 elemento at(indiceSeccion) con la seccionDelItem
            setLista(copiaLista);
        }
    }

    const color = selecciono ? '#A4A4A4' : 'black';
    const imagen = selecciono ? IconoRealizada : IconoMenos;
    const textEditable = selecciono ? false : true;

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={pressHandler}>
                <Image style={{ ...styles.image, tintColor: color }} source={imagen} />
            </TouchableOpacity>
            <TextInput 
            style={{ ...styles.text, color: color }} 
            onChangeText={setTexto}
            onEndEditing={finishEditing} 
            editable={textEditable} 
            value={texto}
            placeholder="Escriba aquí">
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