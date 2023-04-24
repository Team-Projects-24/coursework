import { ReactElement } from "react"
import placeHolder from "./texture.jpg"

type OwnerProps = {title : string}

const Owner = ({title}:OwnerProps):ReactElement =>{
    return  <div>
        <h1><img src={placeHolder} alt="placeHolder" className="OwnerImage"></img>{title}</h1>
            </div>
}
export default Owner