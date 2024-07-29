import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import express from 'express';
import { PrismaClient } from '@prisma/client';
import { addDays } from 'date-fns';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const __basedir = path.join(__dirname, '..');
const app = express();
const prisma = new PrismaClient();
app.use('/public', express.static('public'));
app.use(express.json());
app.get(['/', '/encrypt'], async (req, res) => {
    const filePath = path.join(__basedir, 'public', 'html', 'encrypt.html');
    if (path.extname(filePath) === '.html') {
        console.log(`Serving file: ${filePath}`);
        return res.sendFile(filePath);
    }
    else {
        console.log(`File is not an HTML file: ${filePath}`);
        return res.status(500).send('Requested file is not an HTML file.');
    }
});
app.get('/decrypt', async (req, res) => {
    return res.sendFile(path.join(__basedir, 'public', 'html', 'decrypt.html'));
});
app.post('/api/v1/secret/create', async (req, res) => {
    try {
        const now = new Date();
        const futureDate = addDays(now, 1);
        const createdSecret = await prisma.secret.create({
            data: {
                data: req.body.secretData,
                expiry: futureDate.toISOString()
            }
        });
        return res.json({ id: createdSecret.id });
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});
app.get('/api/v1/secret/:id', async (req, res, next) => {
    try {
        const result = await prisma.secret.findUniqueOrThrow({
            where: {
                id: req.params.id
            }
        });
        return res.json({ data: result.data });
    }
    catch (error) {
        return res.sendStatus(500);
    }
});
app.listen(80);
