// AppContextProvider.js
import React, { createContext } from "react";
import { toast } from "react-toastify";
import clienteAxios from "../lib/axios";
import { mutate } from "swr";
import { useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
    //hook
    const [usuario, setUsuario] = useState({})
    const [modalUsario, setModalUsuario] = useState({isOpen: false, isEditing: false})
    
    //handle para edicion de usuarios
    const handleSetUsuario = user => {
        setUsuario(user);
    }
    //abrir modal
    const handleClickModalUser = isEditing => {
        setModalUsuario({isOpen: true, isEditing})
    }
    //cerrar modal
    const handleCloseModalUser = () => {
        setModalUsuario({isOpen: false, isEditing:false})
    }

    //crear usuario 
    const handleCreateUser = async ({setErrors, ...props}) => {
        const datos = new FormData()
        datos.append('nombre', props.nombre)
        datos.append('email', props.email)
        datos.append('ciudad', props.ciudad)

        const {data} = await clienteAxios.post('/users/create', datos)
        if(data.errors){
            setErrors(data.errors)
        }else{
            toast.success(data.data);
            handleCloseModalUser()
            await mutate('/usuarios/verUsuarios')
        }
    } 

    //actualizar usuario
    const handleUpdateUser = async ({setErrors, ...props}) => {
        const datos = new FormData()
        datos.append('id', props.id)
        datos.append('nombre', props.nombre)
        datos.append('email', props.email)
        datos.append('ciudad', props.ciudad)
        const {data} = await clienteAxios.post('/users/update', datos)
        if(data.errors){
            setErrors(data.errors)
        }else{
            toast.success(data.data);
            handleCloseModalUser()
            await mutate('/usuarios/verUsuarios')
        }
    }
    //borrar usuario
    const handleDeleteUser = async (id) => {
        const datos = new FormData();
        datos.append("id", id);
        try {
            const { data } = await clienteAxios.post("/users/delete", datos);
            toast.success(data.data);
            await mutate('/usuarios/verUsuarios') // No estás importando mutate aquí
        } catch (error) {
        // Manejar errores
            console.log(error)
        }
    };

    return (
        <AppContext.Provider
            value={{
                usuario,
                modalUsario,
                handleSetUsuario,
                handleClickModalUser,
                handleCloseModalUser,
                handleCreateUser,
                handleUpdateUser,
                handleDeleteUser,
            }}
        >{children}</AppContext.Provider>
    );
};

export { AppProvider };
export default AppContext;