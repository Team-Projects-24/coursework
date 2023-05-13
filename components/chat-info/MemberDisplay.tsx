import { ReactElement, useEffect, useState } from "react"
import Axios from "axios"
import getChatInfo from "pages/api/chat/getChatInfo"

type MemberProps = {title : string}

const Heading = ({title}:MemberProps):ReactElement =>{

    const [userImg, getUserImage] = useState("")

    return <>
    
    </>
}
export default Heading