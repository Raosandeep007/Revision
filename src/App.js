import React from 'react';
import './style.css';
import { Counter } from './Counter/Counter';
import { Todo } from './Todo/Todo';
export default function App() {
  return (
    <div>
      {/* <Counter title="Counter for my App" /> */}
      <Todo />
    </div>
  );
}
