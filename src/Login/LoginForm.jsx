import { useRef } from "react";
import "./Login.css";

const LoginForm = ({email, setEmail, senha, setSenha, handleLogin}) => {
  const inputRef = useRef();
  return(
    <form className="login-form" onSubmit={handleLogin}>
        <h1>Login</h1>
        <input
            type="text"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
        <input
            type="password"
            placeholder="Password"
            required
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
        />
        <button
            type="submit"
            onClick={() => inputRef.current.focus()}
        >Entrar</button>
    </form>
  )
}

export default LoginForm