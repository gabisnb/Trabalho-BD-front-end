import './App.css';
import Login from './Login';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function App() {
  const API_URL = "http://localhost:3000/usuario";
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [fetchError, setFetchError] = useState(null); // will catch the errors
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = async (e) => {
    try{
      e.preventDefault(); // will prevent the page from reloading
      setIsLoading(true);
      setFetchError(null);
      // console.log('Email:', email);
      // console.log('Password:', senha);
      const body = {email: email, senha: senha};

      // await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await axios.post(`${API_URL}/login`, body);
      setUser(response.data);
      // console.log(response);
    }
    catch (err){
      console.log(err);
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 404) {
          setFetchError('Usuário ou senha inválidos');
        }
      }
    }
    finally{
      console.log('Fetch done');
      setEmail('');
      setSenha('');
      setIsLoading(false);
    }
  }

  return(
    <>
      <main>
        <Login
          email={email}
          setEmail={setEmail}
          senha={senha}
          setSenha={setSenha}
          handleLogin={handleLogin}
        />
        <div className="result">
          {fetchError && <p style={{color: "red", textAlign: 'center'}}>{`Error: ${fetchError}`}</p> /* only shows if theres errors */}
          {isLoading && <p style={{color: "lightblue"}}>Autenticando...</p>}
          {!isLoading && user && <p>{`Bem vindo, ${user.nome_usuario}`}</p> /* only shows if theres a user */}
        </div>
      </main>
    </>
  )
}

export default App
