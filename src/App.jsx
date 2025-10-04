// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

import './App.css'
// import Task from './components/blocks/Task/Task'
import Search from './components/blocks/Search/Search'
import Btn_AddTask from './components/UI/Btn_AddTask/Btn_AddTask'
import Btn_Menu from './components/UI/Btn_Menu/Btn_Menu'
import TaskList from './components/blocks/TaskList/TaskList'




function App() {

  return (
    <>
    <div className='pl-4 pr-4'>
      <div className='max-w-[1024px] ml-auto mr-auto flex flex-col flex-center items-center p-4 bg-[#333] rounded-lg gap-y-4 mt-8'>
        <div className='w-full grid grid-cols-[auto_56px_56px] gap-x-4 items-center'>
            <h1 className='text-lg font-bold uppercase'>Short task list</h1>
            <Btn_AddTask />
            <Btn_Menu />
        </div>

        <Search />

        <TaskList />
      </div>
    </div>

    </>
  )
}

export default App
