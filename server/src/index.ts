import express, { Express, Request, Response } from "express";
const dotenv = require("dotenv");
const { Configuration, OpenAIApi } = require("openai");
const cors = require("cors");

const app: Express = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.post("/", async (req: Request, res: Response) => {
  try {
    const prompt = req.body.prompt;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt}`,
      temperature: 0,
      max_tokens: 500,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0.0,
      stop: ["\n"],
    });
    res.status(200).send({
      bot: response?.data?.choices[0]?.text,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error || "Something went wrong");
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
