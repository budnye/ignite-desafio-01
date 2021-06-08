import React, { useState } from 'react';

import { Header } from '../components/Header';
import { MyTasksList } from '../components/MyTasksList';
import { TodoInput } from '../components/TodoInput';

interface Task {
  id: number;
  title: string;
  done: boolean;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    if (newTaskTitle.trim().length <= 1) return
    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    }
    setTasks( oldSate => [...oldSate, newTask])
  }

  function handleMarkTaskAsDone(id: number) {
    setTasks(oldSate => oldSate.map(task =>  task.id === id ? {...task, done: !task.done } : task))
  }

  function handleRemoveTask(id: number) {
    setTasks(oldSate => oldSate.filter( task => task.id !== id))
  }

  return (
    <>
      <Header />

      <TodoInput addTask={handleAddTask} />

      <MyTasksList 
        tasks={tasks} 
        onPress={handleMarkTaskAsDone} 
        onLongPress={handleRemoveTask}
      />
    </>
  )
}