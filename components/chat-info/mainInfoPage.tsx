import { ReactElement, useEffect, useState } from "react"
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, User } from "@prisma/client";
import Heading from "./Heading"

const prisma = new PrismaClient();

interface allChatInfo{
    name : String,
    desc : String
}

/*
async function getInfo(
    req: NextApiRequest,
    res: NextApiResponse
)
{
    var chatInfo: allChatInfo
    try{
        const { id } = req.body;
        const chat = await prisma.chatroom.findFirst({
            where: { id: id }, })
            var chatInfo: allChatInfo = {
                name : chat!.name,
                desc : chat!.description
            }
          res.status(200).json(chatInfo);

    } catch{
        var chatInfo: allChatInfo = {
            name : "",
            desc : ""
        } 
        res.status(200).json(chatInfo);
     }
}
*/
async function getChatInfo(
    id : number
){
    try{
        const chat = await prisma.chatroom.findFirst({
            where: { id: id }, })
            var chatInfo: allChatInfo = {
                name : chat!.name,
                desc : chat!.description
            }
            return chatInfo
    } catch{
        var chatInfo: allChatInfo = {
            name : "",
            desc : ""
        }
        return chatInfo
    }
}

async function App(id : number){
    //NEED DYNAMIC ID VALUE
    const chatInfo = getChatInfo(id)
    return<>
    <Heading title={(await chatInfo).name}/>
    <Heading title={(await chatInfo).desc}/>
    </>
}
export default App()