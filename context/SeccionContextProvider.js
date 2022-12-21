import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";

export const SeccionContext = React.createContext();

const SeccionContextProvider = ({children}) => {

    const [lista, setLista] = useState([]);

    // Buscar los datos del almacenamiento del celular
    const traerDatos = async () => {
        const secciones = await AsyncStorage.getItem('Lista');
        if(secciones !== null){
            setLista(JSON.parse(secciones));
        }
    };
    // Lo ejecutamos una unica vez (por alguna razon extraña -quiza en prod no pasa- la funcion traerDatos 
    // -sin usar el useEffect- se ejecutaba infinitas veces)
    useEffect( () => {
        traerDatos();
    },[]);
    
    // Guardar los datos del almacenamiento del celular
    const guardarDatos = async () => {
        await AsyncStorage.setItem('Lista', JSON.stringify(lista));
    };
    // Cada vez que cambie la lista, guardamos en almacenamiento
    useEffect( () => {
        guardarDatos();
    }, [lista]);
    
    return <SeccionContext.Provider value={{lista, setLista}}>{children}</SeccionContext.Provider>
}

export default SeccionContextProvider;
