import { useModal } from "../../../providers/ModalProvider/ModalProvider"
import SVG_Cross from "../svg/cross"

export default function Btn_AddTask() {
    const { open } = useModal()
    return (
        <button className='w-full flex justify-center p-4 rounded-lg bg-green-800' onClick={() => open('add')}>
            <SVG_Cross color={'text-white'} rotate={'rotate-45'} />
        </button>
    )
}