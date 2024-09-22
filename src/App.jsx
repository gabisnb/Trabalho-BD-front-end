import './App.css';
import Login from './Login';
import { useState, useEffect } from 'react';

function App() {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [fetchError, setFetchError] = useState(null); // will catch the errors
  // const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', senha);

    if(!email)
      return alert('Email is required');

    if(!senha)
      return alert('Password is required');

    const fetchUser = async() => { //could be declared outside and be called inside instead
      try{
        // const user = await userByCredentials(email, senha); // will get the response to the fetch
        // if(user == null || user == undefined) throw Error("Email or password is incorrect");
      }
      catch (err){
        setFetchError(err.message);
      }
      finally{
        // setUser(user);
        console.log('Fetch done');
      }
    }

    setEmail('');
    setSenha('');
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
          {fetchError && <p style={{color: "red"}}>{`Error: ${fetchError}`}</p> /* only shows if theres errors */}
        </div>
      </main>
    </>
  )
}

export default App
