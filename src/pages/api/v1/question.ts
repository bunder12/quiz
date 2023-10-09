import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/services/prisma';

export default async function question(
    req: NextApiRequest,
    res: NextApiResponse<any>
){
    switch (req.method) {
        case 'GET':
            try {
                const question = await prisma.employees.findMany()
                res.status(200).json({ 
                    question,
                    message: 'Berhasil mengambil data' 
                })
            } catch (error) {
                res.status(404).json({
                    error,
                    message: 'gagal'
                })
            }
          break;       
        case 'POST':
            try {
                const data = {
                    Firstname: "Kim",
                    Surname: "Larry",
                    Email: "test@gmail.com",
                }
                const test = await prisma.employees.create({
                    data: data
                  });

                // const questionCreate = await prisma.question.create({ data: {
                    // questionCard: [
                    //     {
                    //         question: "apa yang membuat anda susah?",
                    //         answerOptions: [
                    //             {answer: "Gaya Hidup1", isCorrect: true},
                    //             {answer: "Gaya Hidup2", isCorrect: false},
                    //             {answer: "Gaya Hidup3", isCorrect: false},
                    //             {answer: "Gaya Hidup4", isCorrect: false}
                    //         ]
                    //     },
                    //     {
                    //         question: "apa yang membuat anda susah?",
                    //         answerOptions: [
                    //             {answer: "Gaya Hidup1", isCorrect: true},
                    //             {answer: "Gaya Hidup2", isCorrect: false},
                    //             {answer: "Gaya Hidup3", isCorrect: false},
                    //             {answer: "Gaya Hidup4", isCorrect: false}
                    //         ]
                    //     }
                    // ]
                // }})
                res.status(200).json({ 
                    // questionCreate,
                    test,
                    message: 'Berhasil Menambah data' 
                })
            } catch (error) {
                res.status(500).json({
                    error,
                    message: 'gagal'
                })
            } 
          break;

        default:
          res.setHeader('Allow', ['GET', 'POST']);
          res.json({message: 'Not Found'})
          break;
    }
}