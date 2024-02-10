import useAppContext from "../hooks/useAppContext"
import InputError from "./InputError";
import { useState, useEffect } from "react"
export default function ModalUser({isEditing = false}) {
    const {handleCloseModalUser, handleCreateUser, handleUpdateUser, usuario} = useAppContext()
    //hooks
    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [ciudad, setCiudad] = useState('')
    const [errors, setErrors] = useState([])
    useEffect(() => {
        if(usuario && isEditing){
            setNombre(usuario.nombre)
            setEmail(usuario.email)
            setCiudad(usuario.ciudad)
        }
    }, [usuario, isEditing])

    const handleSubmit = e => {
        e.preventDefault()
        if(isEditing){
            handleUpdateUser({
                id: usuario.id,
                nombre,
                email,
                ciudad,
                setErrors
            })
        }else {
            handleCreateUser({
                nombre,
                email,
                ciudad,
                setErrors
            })
        }
    }
    return (
        <>
            <div className="flex justify-end">
                <button
                    onClick={handleCloseModalUser}
                >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                </button>
            </div>
            <h1>{isEditing ? 'Editar' : 'crear'}</h1>
            <div className="bg-white shadow-md rounded-md mt-10 max-w-3xl mx-auto">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label 
                            htmlFor="nombre"
                        >Nombre:</label>
                        <input 
                            type="text"
                            id="nombre" 
                            value={nombre}
                            onChange={(e) => {
                                setNombre(e.target.value)
                            }}
                            className="mt-2 w-full p-3 bg-gray-50"
                        />
                        <InputError messages={errors.nombre} className="mt-2"/>
                    </div>
                    <div className="mb-4">
                        <label 
                            htmlFor="email"
                        >Email:</label>
                        <input 
                            type="email"
                            id="email" 
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                            className="mt-2 w-full p-3 bg-gray-50"
                        />
                        <InputError messages={errors.email} className="mt-2"/>
                    </div>
                    <div className="mb-4">
                        <label 
                            htmlFor="ciudad"
                        >Ciudad:</label>
                        <input 
                            type="text"
                            id="ciudad" 
                            value={ciudad}
                            onChange={(e) => {
                                setCiudad(e.target.value)
                            }}
                            className="mt-2 w-full p-3 bg-gray-50"
                        />
                        <InputError messages={errors.ciudad} className="mt-2"/>
                    </div>
                    <input 
                        type="submit"
                        value={isEditing ? 'Guardar Cambios' : 'Registrar Usuario'}
                        className="bg-lime-600 hover:bg-customColorShadow text-white w-full mt-5 p-3
                        uppercase font-bold cursor-pointer"
                    />
                </form>
            </div>
        </>
    )
}
