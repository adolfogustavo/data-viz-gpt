import { Configuration, OpenAIApi } from "openai";
import type { NextApiRequest, NextApiResponse } from 'next'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function generate(
  req: NextApiRequest,
  res: NextApiResponse
  ) {
  const model = req.body.model ? req.body.model : "text-davinci-003";
  const max_tokens = req.body.maxTokens ? req.body.maxTokens : 400;
  console.log("req.body.data=>", req.body.data);
  const completion = await openai.createCompletion({
    model,
    prompt: getPrompt(req.body.data),
    temperature: 0.7,
    top_p: 1,
    best_of: 1,
    max_tokens,
  });
  console.log("API Response choices=>", completion.data.choices);
  res.status(200).json(completion.data.choices[0].text);
}

const getPrompt = (data: string) => {
  return (
    `The following is a conversation with an AI that is an expert on data visualization. And replies only using JSON responses with the following format:
    [{"chartType":string,"xKey":string,"yKey":string,"description":string,"title":string},...] Allowed charTypes are: bar and pie. Also, the AI response must be short
    Human: Given this dataset 
    ${data}
    Give me a list of charts that I could build using this data
    `
  );
}