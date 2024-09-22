import { useEffect, useState } from "react";
import "./Curso.css";
import axios from "axios";
import { AiFillCaretDown, AiFillCaretRight } from "react-icons/ai";


function Curso({key, nome, area, descricao}){
    const [isOpen, setIsOpen] = useState(false);

    console.log(key, nome, area, descricao);
    return (
        <div key={key} className="item">
            <dt onClick={(e)=>setIsOpen(!isOpen)}>
                {!isOpen && <AiFillCaretRight className=".toggle"/>}
                {isOpen && <AiFillCaretDown className=".toggle"/>}
                {nome}
            </dt>
            {isOpen && <>
                <hr></hr>
                <dd className="area">{area}</dd>
                <dd className="description">{descricao}</dd>
            </>}
        </div>
    );
}

export default Curso;