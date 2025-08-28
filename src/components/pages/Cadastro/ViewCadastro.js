import style from './projects.modules.css'

import Message from "../../layout/Message"
import { useLocation } from "react-router-dom"
import Container from '../../layout/Container'
import Loading from '../../layout/Loading'
import LinkButton from '../../layout/LinkButton'
import ProjectCard from './project/ProjectCard'
import { useState, useEffect } from 'react'


function Projects(){
    const [projects, setProjects] = useState()
    const [removeLoading, setremoveLoading] = useState(false)

    const location = useLocation([])
    let message = ''
    if(location.state)
        message = location.state.message
    
    useEffect(()=>{
        fetch('http://localhost:5000/projects', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((resp)=>resp.json()).then((data)=>{
            setProjects(data)
            setremoveLoading(true)
        }).catch(err => console.log(err))
    },[])


function removeProject(id){
    fetch(`http://localhost:5000/projects/${id}`,{
        method: "DELETE",
        headers:{
            "Content-type":"application/json",
        },
    }).then(resp=> resp.json()).then(
        data => {
            setProjects(projects.filter((projeto)=> projeto.id !== id))
        }
    ).catch(err=>console.log(err))
}


    return (
        <div className={"project_container"}>
            <div className={"title_container"}>
                <h1>Meus projetos</h1>
                <LinkButton text={"Novo projeto"}/>
            </div>
            {message && <Message type="success" msg={message}/>}
            {/* {projects && console.log(projects.length)} */}
            <Container customClass="start">
                {/* {console.log(projects.length)} */}
                 {projects && 
                    projects.map((projeto,index)=>(
                        <ProjectCard 
                        nome={projeto.name}
                        id={projeto.id}
                        orcamento={projeto.orcamento}
                        categoria={projeto.category.name}
                        key={projeto.id}
                        // handleRemove={}
                        />
                    ))
                } 
                {!removeLoading && <Loading />}
                {removeLoading && projects.length === 0 && (<p>Não há projetos cadastrados</p>)}
            </Container>
        </div>
    )
}

export default Projects