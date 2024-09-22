import { useRef, useState } from "react";
import LoginForm from "./LoginForm";
import "./Login.css";
import axios from "axios";

const Login = ({API_URL_ROOT, user, setUser}) => {
  const API_URL = API_URL_ROOT + "/usuario";
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [fetchError, setFetchError] = useState(null); // will catch the errors
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    try{
      e.preventDefault(); // will prevent the page from reloading
      setIsLoading(true);
      setFetchError(null);
      setUser(null);
      const body = {email: email, senha: senha};
      const response = await axios.post(`${API_URL}/login`, body);
      setUser(response.data);
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
  const inputRef = useRef();
  return(
    <>
      <LoginForm
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
    </>
  )
}

export default Login