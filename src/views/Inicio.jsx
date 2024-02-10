import TableRow from "../components/TableRow"
import clienteAxios from '../lib/axios'
import useSWR from "swr"
import Button from "../components/Button"
import useAppContext from '../hooks/useAppContext'

export default function Inicio() {
    //usamos contexto
    const {handleSetUsuario, handleClickModalUser, handleDeleteUser} = useAppContext()
    let usuarios;
    const {data: usersData, error: usersDataError} = useSWR(
        '/usuarios/verUsuarios',
        async(url) => {
            try {
                const response = await clienteAxios(url)
                return response.data.usuarios
            } catch (error) {
                throw error("Error al obtener los usuarios:", error);
            }
        }
    )
    usuarios = usersData || [];
    const hasUsers = Object.values(usuarios).length > 0;

    return (
        <div className="pt-10">
            {hasUsers ? (
                <div className="overflow-x-auto">
                    <table className="bg-white m-auto shadow-md rounded-md mt-10 px-5 py-10 overflow-x-auto">
                        <thead>
                            <tr>
                            <th className="text-left py-2 px-4 border-b">ID</th>
                            <th className="text-left py-2 px-4 border-b">Nombre</th>
                            <th className="text-left py-2 px-4 border-b">Email</th>
                            <th className="text-left py-2 px-4 border-b">Ciudad</th>
                            <th className="text-left py-2 px-4 border-b">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.map(user => (
                                <TableRow 
                                    key={user.id}
                                    user={user}
                                    modalUser={{handleClickModalUser}}
                                    setUser={{handleSetUsuario}}
                                    deleteUser={{handleDeleteUser}}
                                />
                            ))}
                        </tbody>
                    </table> 
                    <div>
                        <div className="my-4 text-center">
                        <Button onClick={() => handleClickModalUser(false)}>
                            Registrar Usuario
                        </Button>
                        </div>
                    </div>
                </div>
            ):(
                <div>
                    <h1 className="mb-4 text-center text-4xl font-black">Usarios</h1>
                    <p className="mb-4 text-center font-medium">No hay usuarios registrados aún. Comienza creando uno.</p>
                    <div className="text-center">
                    <Button>
                        Registrar Usuario
                    </Button>
                    </div>
                </div>
            )}
        </div>
    )
}
