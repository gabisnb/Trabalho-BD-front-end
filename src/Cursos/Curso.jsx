import "./Curso.css";


function Curso({key, nome, area, descricao}){
    const getArea = (id_area) => {
        try{

        }
        catch(err){
            console.log(err);
        }
    };

    return (
        <div key={key} className="item">
            <dt>{nome}</dt>
            <dd className="area">{area}</dd>
            <dd className="description">{descricao}</dd>
        </div>
    );
}

export default Curso;