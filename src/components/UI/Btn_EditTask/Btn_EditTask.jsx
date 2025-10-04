import { useModal } from "../../../providers/ModalProvider/ModalProvider"
import SVG_Edit from "../svg/edit";

export default function Btn_EditTask({ task }) {
    const { open } = useModal();
    return (
        <button
            className="p-1.5 flex items-center justify-center bg-transparent text-white  font-bold"
            aria-label="Edit task"
            onClick={() => open('edit', task)}
        >
        <SVG_Edit color={'text-white'} />
        </button>
    )
}
