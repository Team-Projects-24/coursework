import { ReactElement } from "react"

type InfoProps = {title : string}

const Info = ({title}:InfoProps):ReactElement =>{
    return <p>{title}</p>
}
export default Info