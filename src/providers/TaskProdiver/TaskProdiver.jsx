import { createContext, useState, useEffect, useContext, useMemo } from "react";

// Create context and provider
const TaskContext = createContext();

export function TaskProvider({ children }) {
    // LOAD STORED TASKS
    const [tasks, setTasks] = useState(() => {
        const stored = localStorage.getItem('tasks');
        return stored ? JSON.parse(stored) : [];
    });

    const [searchQuery, setSearchQuery] = useState('');

    // save tasks in localstorage on change
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }, [tasks])

    // adding new task
    const addTask = (taskData) => {
        const newTask = {
            id: crypto.randomUUID(),
            date: new Date().toISOString(),
            done: false,
            text: taskData.text,

        };
        setTasks(prev => [...prev, newTask]);
    }

    // update task
    const updateTask = (id, updatedData) => {
        setTasks(prev => 
            prev.map(task => (task.id === id ? {...task, ...updatedData} : task))
        )
    }

    // delete task
    const deleteTask = (id) => {
        setTasks(prev => prev.filter(task => task.id !== id))
    }

    // Filtered tasks based on searchQuery
    // using useMemo() to optimize calculations - recount filteredTasks only when task/searchQuery has been changed
    const filteredTasks = useMemo(() => {
        if (!searchQuery.trim()) return tasks;
        return tasks.filter(task => 
            task.text.toLowerCase().includes(searchQuery.toLowerCase())
        )
    }, [tasks, searchQuery])

    return (
        <TaskContext.Provider value={{ tasks: filteredTasks, addTask, updateTask, deleteTask, setSearchQuery }}>
            { children }
        </TaskContext.Provider>
    )
}

export const useTasks = () => {
    return useContext(TaskContext)
}