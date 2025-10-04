import Task from "../Task/Task";
import { useTasks } from "../../../providers/TaskProdiver/TaskProdiver";

export default function TaskList() {
    const { tasks } = useTasks();

    return (
        <ul className="list-none flex flex-col self-start w-full gap-y-4">
          {tasks.length === 0 && <li>No tasks yet :c</li>}
          {[...tasks].reverse().map(task => (
            <Task key={task.id} task={task} />
          ))}

        </ul>
    )
}