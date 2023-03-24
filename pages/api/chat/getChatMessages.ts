import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, User } from '@prisma/client'
import { IUser } from 'types/User.d'

const prisma = new PrismaClient()

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { id } = req.body
        if (!id) {
            res.status(400).json({ message: 'Required fields are missing in the request.' })
            return
        }
        const messages = await prisma.message.findMany({
            where: {
                chatroomId: id
            },
            include: {
                sender: true
            }
        })
        if (messages) {
            const chatMessages = messages.map((message) => ({
                id: message.id,
                senderId: message.senderId,
                sender: message.sender,
                chatroomId: message.chatroomId,
                content: message.content,
                createdAt: message.sentAt,
                updatedAt: message.updatedAt
            }))
            res.status(200).json(chatMessages)
        }
      }));


    }
    
};