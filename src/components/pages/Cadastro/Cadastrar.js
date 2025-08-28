import { useEffect, useState } from 'react'
import style from './cadastros.module.css'

import { FaFemale } from 'react-icons/fa';
import { FaMale } from 'react-icons/fa';
import { BiTrash } from 'react-icons/bi'
import { PiPencil } from 'react-icons/pi'
import { BiX } from 'react-icons/bi';
const Ficha = ({nome, nivel, genero})=>{
    return(
        <div className={`${style.card}`}>
                <div>
                    {genero==="M"? <FaMale size={40}/>:<FaFemale size={40}/>}
                </div>
                <div>
                    <p>Nome: {nome}</p>
                    <p>Nível: {nivel}</p>
                </div>
            <div>
                <PiPencil size={27} style={
                {marginRight:"5px"}
            }/>
                <BiTrash size={27}/>
            </div>
        </div>
    )
}

const BotaoCadastro=({cadastramento})=>{
    return(
        <div 
            onClick={cadastramento}
            className={`${style.botao}`}>
            <p>Adicionar Novo</p>
        </div>
    )
}

const pegardados = ()=>{
    const jogadores = JSON.parse(localStorage.getItem('jogadores')) || []
    return jogadores
}

const salvar=({nome,nivel,genero})=>{
    const jogadores = JSON.parse(localStorage.getItem('jogadores')) || []
    jogadores.push({nome:nome,nivel:nivel,genero:genero})
    localStorage.setItem('jogadores',JSON.stringify(jogadores))
}

const TelaCadastro=({cadastramento})=>{
    const [nome,setNome] = useState("")
    const [genero,setGenero] = useState("")
    const [nivel,setNivel] = useState(5)
    
    const mudancaEstadoNome = (e)=>{
        setNome(e.target.value)
    }
    const mudancaEstadoNivel = (e)=>{
        setNivel(e.target.value)
    }
    const mudancaEstadoGenero = (e)=>{
        setGenero(e.target.value)
    }

    console.log(`Nome:${nome}, genero: ${genero}, nivel${nivel}`)

    return(
    <div className={`${style.cad_box}`}>
        <div style={{width:"100%",display:"flex",justifyContent:"flex-start"}}><p style={{fontSize:"15px",textAlign:"center"}}>Preencha o formulário para fazer o cadastro</p><BiX size={30} onClick={cadastramento}/></div>
        
        <div><p>Nome: </p><input 
            type='text'
            value={nome}
            onChange={mudancaEstadoNome}
            /></div>
        <div
            style={{display:"flex",alignItems:"center",width:"100%"}}
        ><p>Gênero:</p><p style={{marginLeft:"4px"}}>Masculino</p><input 
                value={"M"}
                type='radio' 
                name='genero'
                onChange={mudancaEstadoGenero}
            /> 
            <p>Feminino </p><input 
                value={"F"}
                type='radio' 
                name='genero'
                onChange={mudancaEstadoGenero}
            /></div>
        <div><span>Nível de habilidade </span> 
            <input 
                type='number'
                value={nivel}
                onChange={mudancaEstadoNivel}
                style={{width:"100px"}}
            /><br/><span style={{color:"red",fontSize:"15px"}}>*Caso desconhecida, colocar 5</span></div>
        
        <button type='button'
            className={`${style.button}`}
            
            onClick={()=>{
                cadastramento()
                salvar({nome:nome,genero:genero,nivel:nivel})}}
        >Salvar</button>
    </div>
    )
}



export default function Cadastrar(){
    const [cadastros,setCadastros] = useState()
    const [cadastrar,setCadastrar] = useState(false)
    const [editavel,setEditavel] = useState(false)

    const ativarCadastramento = ()=>{
        setCadastrar(true)
    }
    const desativarCadastramento = ()=>{
        setCadastrar(false)
    }
    
    const ativarEdicao = ()=>{
        setEditavel(true)
    }
    const desativarEdicao = ()=>{
        setEditavel(false)
    }
    

    useEffect(()=>{
        const jogadoresLista = JSON.parse(localStorage.getItem('jogadores'))
        setCadastros(jogadoresLista)
    },[cadastrar,editavel])

    return(
        <section className={`${style.cad_container}`}>
            {cadastros? <p>Aqui estão seus cadastros</p>:<p>Nenhum cadastro encontrado, adicione seus jogadores</p>}
            <BotaoCadastro 
                cadastramento={ativarCadastramento}/>
            {cadastrar && <TelaCadastro
            cadastramento={desativarCadastramento}/>}
            {cadastros && 
                cadastros.map((jogador,index)=>
                    (<Ficha 
                        key={index}
                        nome={jogador.nome}
                        nivel={jogador.nivel}
                        genero={jogador.genero}
                        />))}
            <div
                style={{
                    marginBottom: "80px",
                }}
            >
                {}
            </div>
        </section>
    )
}