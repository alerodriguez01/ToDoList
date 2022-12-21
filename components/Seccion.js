import React, { useContext, useEffect, useState } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import { SeccionContext } from "../context/SeccionContextProvider";

import Flecha from '../images/double_arrow.png';
import Item from "./Item";

const Seccion = ({ objeto }) => {
    const id = objeto.id;
    const nombre = objeto.nombre;
    const color = objeto.color;
    const items = objeto.items;

    // Esto podria mejorarse. Se ejecuta CADA VEZ que se cambia la lista (ya sea
    // se agrega una seccion, un item o modifica alguno
    // Esto se hizo para que se modifique el label de tareas pendientes.
    const {lista, setLista} = useContext(SeccionContext);
    const seccion = lista.find( seccion =>  seccion.id == id );
    const indiceSeccion = lista.indexOf(seccion);

    const [numTareas, setNumTareas] = useState(items.length);
    useEffect( () => {
        setNumTareas(lista[indiceSeccion].items.filter(item => !item.realizada).length);
    }, [lista]);
    //----

    return (
        <View>
            <View style={styles.header}>
                <Image style={{...styles.image, tintColor: color,}} source={Flecha} />
                <Text style={styles.title}>{nombre}</Text>
            </View>

            <Text style={styles.text}>
                {numTareas != 1 ? `${numTareas} tareas pendientes` : `${numTareas} tarea pendiente`}
            </Text>
            {/*Listado de items*/}
            {items.map(item => (
                <Item key={item.id} idSeccion={id} id={item.id} tarea={item.tarea} realizada={item.realizada}/>
            ))}
            <Item key={items.length===0 ? 1 : items.length+1} idSeccion={id} id={items.length===0 ? 1 : items.length+1} realizada={false}/>
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