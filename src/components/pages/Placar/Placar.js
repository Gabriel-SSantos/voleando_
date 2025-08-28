import { useEffect, useState } from "react"
import style from "./placar.module.css"

 const ButtonPnt = ({pnt, i,pontuar, retirarPonto,color})=>{
        return(
            <div 
                className={`${style.placar_banda}`}
                style={{backgroundColor:`${color}`}}    
            >
                <p 
                    style={{fontSize:"65px", color:"white", fontFamily:"'Courier New', Courier, monospace"}}
                >Time {i+1}</p>
                <div 
                    className={`${style.placar_numero}`}
                    
                    >    
                    <input type="button" 
                    value={"-"}
                    onClick={ 
                        ()=>{
                            if(pnt>0)
                            retirarPonto(i)
                            
                        }}/>
                    <p>{pnt}</p>
                    <input type="button" 
                    value={"+"}
                        onClick={()=>pontuar(i)}
                    />
                </div>
            </div>
        )
    }


export default function Placar(){
    const [time,setTime] = useState([0,0])
    const [pntVencedor,setPntVencedor] = useState(5)
    const pontuar = (i)=>{
        const atuliazar = time.map((ponto, index) =>{
            if(index === i){
                return ponto + 1
            }
            return ponto
        })
        setTime(atuliazar)
    }

    const retirarPonto = (i)=>{
        const atuliazar = time.map((ponto, index) =>{
            if(index === i){
                return ponto - 1
            }
            return ponto
        })
        setTime(atuliazar)
    }
    console.log(pntVencedor)
    useEffect(()=>{

        if(pntVencedor == 5 && (time[0] >= 1 && time[1] >= 1)){
            console.log("oba")
            setPntVencedor(7)
        } else if(pntVencedor == 7 && (time[0] >= 2 && time[1] >= 2)){
            setPntVencedor(12)
        } else if(time[0] == pntVencedor - 1 && time[0] == time[1]){
            setPntVencedor(pntVencedor + 1)
        }
        else if(time[0] == pntVencedor  || time[1] == pntVencedor){
            alert(`Time vencedor ${time[0]==pntVencedor? time[0]:time[1]}`)
        } 
        console.log(time)
    },[time])
    return(
        <div className={`${style.placar_container}`}>
           <ButtonPnt 
                pnt={time[0]} i={0} 
                pontuar={pontuar}
                retirarPonto={retirarPonto}
                color={"#0050D8"}
            />
           <ButtonPnt pnt={time[1]} 
                i={1} 
                pontuar={pontuar}
                retirarPonto={retirarPonto}
                color={"#D3B700"}
            />
        </div>
    )
}
