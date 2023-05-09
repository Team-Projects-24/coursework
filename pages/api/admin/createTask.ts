// api for creating a task


import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { teamId, userId, name, deadline, manHoursSet } = req.body
    
    try {
      const newEntry = await prisma.task.create({
        data: {
          teamId: teamId,
          manHoursSet: Number(manHoursSet),
          manHoursCompleted: 0,
          userId: userId,
          deadline: deadline,
          name: name,     
        },
      })
    
      res.status(201).json(newEntry)
    } catch (error) {
      res.status(500).json({ message: 'Error creating task entry', error })
    }
    
  } else {
    // Handle unsupported methods
    res.status(405).json({ message: 'Method not supported' })
  }

  await prisma.$disconnect()
}




// import type { NextApiRequest, NextApiResponse } from 'next'
// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()

// export default async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method === 'POST') {
//     const { teamId, userId, deadline, name, manHoursSet } = req.body

//     console.log(teamId);
//     console.log(userId);
//     console.log(deadline);
//     console.log(name);
//     console.log(manHoursSet);


    
//     try {
//       const newTask = await prisma.task.create({
//         data: {
//           teamId,
//           userId,
//           deadline: new Date(deadline),
//           name,
//           manHoursSet: Number(manHoursSet),
//           manHoursCompleted: 0,
//         },
//       })

//       res.status(201).json(newTask)
//     } catch (error) {
//       res.status(500).json({ message: 'Error creating task', error })
//     }
//   } else {
//     res.status(405).json({ message: 'Method not supported' })
//   }
// }