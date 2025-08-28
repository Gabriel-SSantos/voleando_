import {Link} from "react-router-dom"
import style from "./projectcard.module.css"
import {BsPencil, BsFillTrashFill} from 'react-icons/bs'


function ProjectCard({id,nome,orcamento,categoria,handleRemove}){
    return (
       <div className={style.project_card}>
            <h4>{nome}</h4>
            <p>
                <span>Orçamento:</span> R${orcamento}
            </p>
            <p className={style.category_text}>
                <span className={`${style[categoria.toLowerCase()]}`}></span> {categoria}
            </p>
            <div className={style.project_card_actions}>
                <Link to="/"> 
                    <BsPencil/> Editar 
                </Link>
                <button>
                    <BsFillTrashFill/> Remover
                </button>
            </div>
       </div>
    )
}

export default ProjectCard