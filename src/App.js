import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainLayout from './components/MainLayout/MainLayout';
import TaskForm from './components/TaskForm/TaskForm';
import TaskList from './components/TaskList/TaskList';

function App() {
  return (
    <>
      <BrowserRouter>
        <MainLayout />
        <Routes>
          <Route path="/newtask" element={<TaskForm />} />
          <Route path="/" element={<TaskList />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
