import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import express, { Express, Request, Response } from 'express';

import v1 from './api/v1.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const __basedir = path.join(__dirname, '..')

const app: Express = express();

app.use('/public', express.static('public'))
app.use(express.json());

app.use('/api/v1', v1);


app.get(['/', '/encrypt'], async(req: Request, res: Response) => {
    const filePath = path.join(__basedir, 'public', 'html', 'encrypt.html');

    if (path.extname(filePath) === '.html') {
        console.log(`Serving file: ${filePath}`);
        return res.sendFile(filePath);
    } else {
        console.log(`File is not an HTML file: ${filePath}`);
        return res.status(500).send('Requested file is not an HTML file.');
    }
});

app.get('/decrypt', async(req: Request, res: Response) => {
    const filePath = path.join(__basedir, 'public', 'html', 'decrypt.html');

    if (path.extname(filePath) === '.html') {
        console.log(`Serving file: ${filePath}`);
        return res.sendFile(filePath);
    } else {
        console.log(`File is not an HTML file: ${filePath}`);
        return res.status(500).send('Requested file is not an HTML file.');
    }
});

app.get('*', (req: Request, res: Response) => {
    console.log('Serving 404')
    return res.sendStatus(404)
})



app.listen(80)