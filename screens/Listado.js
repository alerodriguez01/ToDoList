import { FAB } from "@rneui/themed";
import React, { useEffect } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import Seccion from "../components/Seccion";

import IconoMas from '../images/plus.png';

const Listado = ({navigation, route}) => {

    // Esto se va a ejecutar cada vez que cambien los route params, es decir, cuando se vuelva de Creacion hacia aqui y le pase el nombre y color
    useEffect(()=>{
        if(route.params?.nombreSeccion && route.params?.color){ // Si existen estos parametros que le devolvio 'Creacion'
            console.log(route.params.nombreSeccion);
            console.log(route.params.color);
        }
    },[route.params]);

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
                {/*Varias secciones*/}
                <Seccion />
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