import CloseBtn from "../../UI/Btn_Close/Btn_Close";
import Btn_EditTask from "../../UI/Btn_EditTask/Btn_EditTask";
import { useTasks } from "../../../providers/TaskProdiver/TaskProdiver";

export default function Task ({ task }) {

    const { updateTask, deleteTask } = useTasks();

    const toggleDone = () => updateTask(task.id, { done: !task.done })

    // date format function (will be on 'settings' modal)
    function formatTaskDate(isoString) {
        const date = new Date(isoString);

        const datePart = new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }).format(date);

        const timePart = new Intl.DateTimeFormat('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true
        }).format(date);

        return `${datePart} | ${timePart}`;
    }

    return (
        <li 
            style={{ "--task-card-padding": "1rem" }}
            className='
            pt-[var(--task-card-padding)] 
            pb-[var(--task-card-padding)]
            pl-[var(--task-card-padding)]
            grid grid-cols-[32px_1fr_56px_56px] gap-x-4
            bg-[#444]
            rounded-lg
            relative'

            data-task-id={task.id}
        >
            <input type="checkbox" name="task_status" id="task_status" className='aspect-square' onChange={toggleDone} checked={task.done} aria-checked={task.done}/>
            <div className="flex flex-col">
                <time className="font-bold text-sm uppercase">{formatTaskDate(task.date)}</time>
                <span className={`leading-[140%] text_font tracking-1 ${ task.done ? 'line-through' : ''}`}>
                    {task.text}
                </span>
            </div>

            <Btn_EditTask task={task} />
            <CloseBtn onClick={() => deleteTask(task.id)}/>
        </li>
    )
} 