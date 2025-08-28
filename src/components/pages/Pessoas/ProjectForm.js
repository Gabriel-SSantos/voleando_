import {useEffect, useState} from 'react'
import style from './projectform.module.css'
import Input from '../../../form/Input';
import Select from '../../../form/Select';
import Submitbutton from '../../../form/SubmitButton'; 

function ProjectForm({handleSubmit, btnText, projectData}){
    const [categories, setCategories] = useState([])
    const [project, setProject] = useState(projectData || {})

    useEffect(()=>{
        fetch("http://localhost:5000/categories", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(
            (resp)=>resp.json()
        ).then(
            (data)=>{setCategories(data)}
            ).catch((err)=>console.log(err)) 
    },[])
    

    const submit = (e)=>{
        e.preventDefault()
        // console.log(project)
        handleSubmit(project)
    }

    function handleChange(e){
        setProject({...project,[e.target.name]: e.target.value})
        console.log("Projects: ", project)
    }

    function handleCategory(e){
        setProject({...project,category:{
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text
        } 
    })
        console.log("Projects: ", project)
    }

    return (
        <form onSubmit={submit} className={style.form}>
            <Input 
            type="text" 
            text="Nome do projeto" 
            name="name" 
            placeholder="Insira o nome do projeto" 
            value={project.name}
            handleOnChange={handleChange}
            />

            <Input 
            type="number" 
            text="Orçamento" 
            name="orcamento" 
            placeholder="Insira o orçamento do projeto"
            value={project.orcamento}
            handleOnChange={handleChange}
            />
            
           <Select 
           name="category_id" 
           text="Selecione a categoria" 
           options={categories}
           handleOnChage={handleCategory}
           value={project.category ? project.category.id : ''}
           />

           <Submitbutton text={btnText} />
        </form>
    )
}

export default ProjectForm