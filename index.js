import express from 'express'
import https from 'https'
import * as fs from "fs";
import { apiRouter } from './api-router.js'

export const app = express();
const httpsServer = https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert'),
}, app);

const PORT = process.env.PORT ?? 8443
httpsServer.listen(PORT, () => {
    console.log(`Server started at PORT=${PORT}`)
});

app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.static('./public'));
app.use('/api', apiRouter);