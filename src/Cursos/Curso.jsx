import { useEffect, useState } from "react";
import "./Curso.css";
import axios from "axios";
import { AiFillCaretDown, AiFillCaretRight } from "react-icons/ai";
import Aula from "./Aula";


function Curso({key, id_curso, nome, area, descricao}){
    const [isOpen, setIsOpen] = useState(false);
    const [aulas, setAulas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const openTab = (e) => {
        setIsOpen(!isOpen);

        const fetchAulas = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const response = await axios.get("http://localhost:3000/curso/" + key + "/aulas");
                setAulas(response.data);
                if(response.data.length === 0){
                    throw new Error('Não há aulas');
                }
            }
            catch (error) {
                if(axios.isAxiosError(error)){
                    if(error.response?.status === 404){
                        setError('Aulas não encontradas');
                    }
                }
                else{
                    setError(error.message);
                }
            }
            finally{
                setIsLoading(false);
            }
        }
        if(aulas.length === 0)
            fetchAulas();
    }

    // console.log(key, nome, area, descricao);
    return (
        <div key={key} className="curso">
            <dt onClick={openTab}>
                {!isOpen && <AiFillCaretRight className=".toggle"/>}
                {isOpen && <AiFillCaretDown className=".toggle"/>}
                {nome}
            </dt>
            {isOpen && <>
                <hr></hr>
                <dd className="area">{area}</dd>
                <dd className="description">{descricao}</dd>
                {
                    aulas.map((aula) => (
                            aula.id_curso == id_curso &&
                            <Aula
                                key={aula.id_aula}
                                nome_aula={aula.nome_aula}
                                professor={aula.professor}
                                resumo_aula={aula.resumo_aula}
                                duracao_aula={aula.duracao_aula}
                            />
                    ))
                }
            </>}
        </div>
    );
}

export default Curso;