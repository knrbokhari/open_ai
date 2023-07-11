import express, { Express, Request, Response } from 'express';
const dotenv = require('dotenv');
const { Configuration, OpenAIApi } = require("openai");
const cors = require("cors")

dotenv.config();


const app: Express = express();
const port = process.env.PORT || 5000;
app.use(cors())
app.use(express.json())

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript + OpenAI Server');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});