import { useModal } from "../../../providers/ModalProvider/ModalProvider"
import SVG_Burger from "../svg/burger";

export default function Btn_Menu() {
    const { open } = useModal();
    return (
        <button className='w-full flex justify-center p-4 rounded-lg bg-[#444]' onClick={() => open('settings')}>
            <SVG_Burger />
        </button>
    )
}