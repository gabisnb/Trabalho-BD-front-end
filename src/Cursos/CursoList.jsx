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
                if(response.data.length === 0){
                    throw new Error('Não há cursos');
                }
                setCursoList(response.data);
            }
            catch (err){
                if (axios.isAxiosError(err)) {
                    if (err.response?.status === 404) {
                        setFetchError('Cursos não encontrados');
                    }
                }
                else{
                    setFetchError(err.message);
                }
            }
            finally{
                setIsLoading(false);
            }
          };

        fetchCursos();
    }, []);

    return (
        <main className="cursos">
            {fetchError && <h1 style={{color: "red", textAlign: 'center'}}>{`Error: ${fetchError}`}</h1> /* only shows if theres errors */}
            {isLoading && <p style={{color: "lightblue"}}>Carregando...</p>}
            {!fetchError && !isLoading &&
                <main>
                    <h1>Cursos</h1>
                    <dl>
                        {cursos.map((curso) => (
                            <Curso
                                id_curso={curso.id_curso}
                                nome={curso.nome_curso}
                                area={curso.area.nome_area}
                                descricao={curso.descricao_curso}
                            />
                        ))}
                    </dl>
                </main>
                
            }
        </main>
    )
}

export default CursoList;