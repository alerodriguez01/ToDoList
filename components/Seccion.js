import React, { useContext, useEffect, useRef, useState } from "react";
import { Alert, Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SeccionContext } from "../context/SeccionContextProvider";

import Flecha from '../images/double_arrow.png';
import IconoDelete from '../images/delete.png';
import IconoEditar from '../images/edit.png';
import Item from "./Item";

const Seccion = ({ objeto }) => {
    const id = objeto.id;
    const nombre = objeto.nombre;
    const color = objeto.color;
    const items = objeto.items;

    // Esto podria mejorarse. Se ejecuta CADA VEZ que se cambia la lista (ya sea
    // se agrega una seccion, un item o modifica alguno
    // Esto se hizo para que se modifique el label de tareas pendientes.
    const { lista, setLista } = useContext(SeccionContext);
    const seccion = lista.find(seccion => seccion.id == id);
    const indiceSeccion = lista.indexOf(seccion);

    const [numTareas, setNumTareas] = useState(items.length);
    useEffect(() => {
        setNumTareas(lista[indiceSeccion].items.filter(item => !item.realizada).length);
    }, [lista]);
    //----

    const [titulo, setTitulo] = useState(nombre);

    const refInput = useRef(null);

    const [textEditable, setTextEditable] = useState(false);
    /* No funciona bien debido al asincronismo del setState
    // Se apreta el boton de editar
    const editar = () => {
        setTextEditable(true);
    };
    useEffect(() => {
        refInput.current.focus(); // hacemos foco en el text input
    }, [textEditable]);
    */

    // Se termina de editar el text input
    const finishEditing = () => {
        setTextEditable(false);

        if (titulo && titulo != nombre) { // titulo puede ser "" o undefined, ambos falsy Y el nuevo titulo es distinto al anterior
            // Busco la seccion en la lista
            const seccion = lista.find(seccion => seccion.id == id);
            // y su indice en la lista
            const indiceSeccion = lista.indexOf(seccion);

            // Creo la seccion modificada
            const seccionModificada = { ...seccion, ...{ nombre: titulo } };

            const copiaLista = [...lista]; // Copio los valores de la lista de secciones
            copiaLista.splice(indiceSeccion, 1, seccionModificada); // Modifico la copia. Reemplazo 1 elemento at(indiceSeccion) con la seccionModificada
            setLista(copiaLista);
        }
    };

    const eliminarSeccion = () => {
        if (titulo) { // titulo puede ser "" o undefined, ambos falsy
            // Busco la seccion en la lista
            const seccion = lista.find(seccion => seccion.id == id);
            // y su indice en la lista
            const indiceSeccion = lista.indexOf(seccion);

            // Creo la nueva lista de secciones (sin la eliminada)
            const nuevasSecciones = [...lista.slice(0,indiceSeccion),...lista.slice(indiceSeccion+1)];
            
            setLista(nuevasSecciones);
        }
    }

    const crearAlert = () => {
        // Crear Alert
        Alert.alert(
            `${titulo}`,
            "¿Está seguro que desea eliminar esta sección?",
            [
                {
                    text: "Cancelar",
                    onPress: () => {},
                    style: "cancel"
                },
                { text: "Si", onPress: eliminarSeccion }
            ]
        );
    };


    return (
        <View>
            <View style={styles.header}>
                <Image style={{ ...styles.image, tintColor: color, }} source={Flecha} />
                <TextInput
                    style={styles.title}
                    placeholder="Edite el nombre"
                    placeholderTextColor={'#A4A4A4'}
                    onChangeText={setTitulo}
                    value={titulo}
                    multiline={true}
                    editable={true}
                    onEndEditing={finishEditing}
                    ref={refInput}>
                </TextInput>
                {/* 
                <TouchableOpacity onPress={editar}>
                    <Image style={styles.imageEditar} source={IconoEditar} />
                </TouchableOpacity>
                 */}
                <TouchableOpacity onPress={crearAlert}>
                    <Image style={styles.imageDelete} source={IconoDelete} />
                </TouchableOpacity>
            </View>
            <Text style={styles.text}>
                {numTareas != 1 ? `${numTareas} tareas pendientes` : `${numTareas} tarea pendiente`}
            </Text>

            {/*Listado de items*/}
            {items.map(item => (
                <Item key={item.id} idSeccion={id} id={item.id} tarea={item.tarea} realizada={item.realizada} />
            ))}
            <Item key={items.length === 0 ? 1 : items.length + 1} idSeccion={id} id={items.length === 0 ? 1 : items.length + 1} realizada={false} />
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
        width: 35,
        height: 35,
    },
    imageEditar: {
        marginTop: 22,
        marginStart: 12,
        width: 25,
        height: 25,
        tintColor: '#A4A4A4',
    },
    imageDelete: {
        marginEnd: 26,
        marginTop: 22,
        marginStart: 12,
        width: 25,
        height: 25,
        tintColor: '#A4A4A4',
    },
    title: {
        marginEnd: 16,
        marginTop: 6,
        fontSize: 25,
        color: 'black',
        flex: 1,
        textAlignVertical: 'top'
    },
    text: {
        marginStart: 59,
        marginBottom: 10,
        fontSize: 12,
        color: '#A4A4A4',
        flex: 1,
    }
});

export default Seccion;