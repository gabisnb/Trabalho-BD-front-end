import './App.css';
import Login from './Login/Login';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import CursoList from './Cursos/CursoList';

function App() {
  const API_URL = "http://localhost:3000";
  const [user, setUser] = useState(null);

  return(
    <main>
      {!user && <Login API_URL_ROOT={API_URL} user={user} setUser={setUser}/>}
      {user && 
      <>
        <h1>{`Bem vindo, ${user.nome_usuario}`}</h1>
        <CursoList />
      </>
      }
    </main>
  )
}

export default App
