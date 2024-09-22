import { useEffect, useState } from "react";
// import "./Curso.css";
import axios from "axios";
// import { AiFillCaretDown, AiFillCaretRight } from "react-icons/ai";


function Aula({key, nome_aula, professor, resumo_aula, duracao_aula}){
    return (
        <div key={key} className="aula">
            <dt>
                {nome_aula}
            </dt>
            <hr></hr>
            <dd className="area">{professor}</dd>
            <dd className="description">{resumo_aula}</dd>
            <dd className="description">{duracao_aula}</dd>
        </div>
    );
}

export default Aula;