import { Outlet } from "react-router-dom";
import ReactModal from "react-modal";
import { ToastContainer } from "react-toastify"
import useAppContext from "../hooks/useAppContext";
import {customStylesModal} from "../helpers/index"
import ModalUser from "../components/ModalUser"
//hojas de estilo css
import "react-toastify/dist/ReactToastify.css"

ReactModal.setAppElement('#root')

export default function Layout() {

    const {modalUsario} = useAppContext()
    const {customStyles} = customStylesModal()
    return (
        <>
            <div className="bg-slate-300 min-h-screen">
                <main className="py-16 md:py-24 lg:py-32 xl:py-40">
                    <Outlet />
                </main>
            </div>

            <ReactModal isOpen={modalUsario.isOpen} style={customStyles}>
                <ModalUser 
                    isEditing={modalUsario.isEditing}
                />
            </ReactModal>

            <ToastContainer />
        </>
    )
}
