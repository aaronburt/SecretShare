import { Router, Request, Response } from "express";
import { PrismaClient } from '@prisma/client';
import { addDays } from 'date-fns';

const router: Router = Router();
const prisma = new PrismaClient();

router.post('/secret/create', async(req: Request, res: Response) => {
    try {
        const now = new Date();
        const futureDate = addDays(now, 1);
        const createdSecret = await prisma.secret.create({
            data: {
                data: req.body.secretData,
                expiry: futureDate.toISOString()
            }
        })
        return res.json({ id: createdSecret.id });
    } catch(error: any) {
        console.log(error)
        return res.sendStatus(500)
    }
})

router.get('/secret/:id', async(req: Request, res: Response) => {
    try {

        const result = await prisma.secret.findUniqueOrThrow({
            where: {
                id: req.params.id
            }
        });
    
        return res.json({ data: result.data });

    } catch(error: any) {
        return res.sendStatus(500)
    }
})


export default router;