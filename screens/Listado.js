import AsyncStorage from "@react-native-async-storage/async-storage";
import { FAB } from "@rneui/themed";
import React, { useContext, useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import Seccion from "../components/Seccion";
import { SeccionContext } from "../context/SeccionContextProvider";

import IconoMas from '../images/plus.png';

const Listado = ({navigation, route}) => {

    // const [lista, setLista] = useState([]);

    // // Buscar los datos del almacenamiento del celular
    // const traerDatos = async () => {
    //     const secciones = await AsyncStorage.getItem('Lista');
    //     if(secciones !== null){
    //         setLista(JSON.parse(secciones));
    //     }
    // };
    // // Lo ejecutamos una unica vez (por alguna razon extraña -quiza en prod no pasa- la funcion traerDatos 
    // // -sin usar el useEffect- se ejecutaba infinitas veces)
    // useEffect( () => {
    //     traerDatos();
    // },[]);
    
    // // Guardar los datos del almacenamiento del celular
    // const guardarDatos = async () => {
    //     await AsyncStorage.setItem('Lista', JSON.stringify(lista));
    // };
    // // Cada vez que cambie la lista, guardamos en almacenamiento
    // useEffect( () => {
    //     guardarDatos();
    // }, [lista]);

    const {lista, setLista} = useContext(SeccionContext);

    // Esto se va a ejecutar cada vez que cambien los ROUTE PARAMS, es decir, 
    // cuando se vuelva de Creacion hacia aqui y le pase el nombre y color
    useEffect( () => {
        if(route.params?.nombreSeccion && route.params?.color){ 
            // Si existen estos parametros que le devolvio 'Creacion'
            if(lista.length === 0){ // Si la lista esta vacia, es la primera seccion creada
                setLista([{
                    id:1, 
                    nombre:route.params.nombreSeccion, 
                    color:route.params.color,
                    items:[]
                }])    
            }else{ // sino
                // pregunto si el nombre coincide con alguno ya creado
                const encontrado = lista.find( seccion =>  seccion.nombre === route.params.nombreSeccion );
                if(!encontrado){ // si no encuentra ninguno (undefined), la agrego a la lista
                    setLista(prev => [...prev, {
                        id:prev[prev.length-1].id + 1,
                        nombre:route.params.nombreSeccion, 
                        color:route.params.color,
                        items:[]
                    }])
                }
            }
        }
    }, [route.params]);

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
                {/*Varias secciones*/}
                {lista.map( seccion => (
                    <Seccion key={seccion.id} objeto={seccion}/>
                ))}
            </ScrollView>

            <FAB
                onPress={() => navigation.navigate('Creacion')}
                placement="right"
                icon={<Image style={styles.image} source={IconoMas}/>}
                color="orange"
                size='large' />
        </View>
    );
}


const styles = StyleSheet.create({
    image: {
        width:35,
        height:35,
        tintColor:'white',
    },
});

export default Listado;