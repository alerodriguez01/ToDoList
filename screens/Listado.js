import { FAB } from "@rneui/themed";
import React from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import Seccion from "../components/Seccion";

import IconoMas from '../images/plus.png';

const Listado = () => {

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
                {/*Varias secciones*/}
                <Seccion />
            </ScrollView>

            <FAB
                onPress={() => console.log("ENVIAR A AGREGAR TAREA")}
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