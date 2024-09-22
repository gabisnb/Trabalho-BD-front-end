import { useEffect, useState } from "react";
import Curso from "./Curso";
import axios from "axios";

function CursoList() {
    const [cursos, setCursoList] = useState([]);
    const [fetchError, setFetchError] = useState(null); // will catch the errors
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCursos = async() => { //could be declared outside and be called inside instead
            try{
                setIsLoading(true);
                setFetchError(null);

                const response = await axios.get("http://localhost:3000/curso");
                // console.log(response.data);
                setCursoList(response.data);
            }
            catch (err){
                if (axios.isAxiosError(err)) {
                    if (err.response?.status === 404) {
                        setFetchError('Cursos não encontrados');
                    }
                }
            }
            finally{
                setIsLoading(false);
                console.log(cursos);
            }
          };

        fetchCursos();
    }, []);

    return (
        <main>
            {fetchError && <h1 style={{color: "red", textAlign: 'center'}}>{`Error: ${fetchError}`}</h1> /* only shows if theres errors */}
            {isLoading && <p style={{color: "lightblue"}}>Carregando...</p>}
            {!fetchError && !isLoading &&
                <>
                    <h1>Cursos</h1>
                    <dl>
                        {cursos.map((curso) => (
                            <Curso
                                key={curso.id}
                                nome={curso.nome_curso}
                                area={curso.id_area}
                                descricao={curso.descricao_curso}
                            />
                        ))}
                    </dl>
                </>
                
            }
        </main>
    )
}

export default CursoList;