export default function TableRow({user, modalUser, setUser, deleteUser}) {
    const {id, nombre, email, ciudad} = user
    const {handleClickModalUser} = modalUser
    const {handleSetUsuario} = setUser
    const {handleDeleteUser} = deleteUser
    return (
        <tr>
            <td className="py-2 px-4 border-b">{id}</td>
            <td className="py-2 px-4 border-b">{nombre}</td>
            <td className="py-2 px-4 border-b">{email}</td>
            <td className="py-2 px-4 border-b">{ciudad}</td>
            <td className="py-2 px-4 border-b">
                <button
                    className="bg-green-500 hover:bg-green-800 text-white px-2 py-1 rounded ml-2"
                    onClick={() => {
                        handleSetUsuario(user)
                        //true para editar
                        handleClickModalUser(true)
                    }}
                >Modificar</button>

                <button
                onClick={() => handleDeleteUser(id)}
                    className="bg-red-500 hover:bg-red-800 text-white px-2 py-1 rounded ml-2"
                >Eliminar</button>
            </td>
        </tr>
    )
}
