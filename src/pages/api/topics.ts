import { NextApiRequest, NextApiResponse } from "next";

/**
 * Get Route to get all unqiue topics for a subject passed in as a query param
 *
 * this route first calls the graphql api to get all the topics for a subject
 * then it filters out the duplicates and returns the unique topics
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const subject = req.query.subject as string;
  const questions = await fetch(
    "https://api.thegraph.com/subgraphs/name/aditipolkam/qrate97",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          {
            questions(where: {subject: "${subject}"}) { # , status: 1
              topic
              id
            }
          }
          `,
      }),
    }
  );
  const json_results: { data: { questions: { topic: string }[] } } =
    await questions.json();
  const results = json_results;
  const topics = results.data.questions.map((question) => question.topic);
  const uniqueTopics: { topic: string; count: number }[] = [];
  for (const topic of topics) {
    const existingTopic = uniqueTopics.filter((val) => {
      return val.topic === topic;
    })[0];
    let indexOfUniqueTopic = -1;
    if (existingTopic) {
      indexOfUniqueTopic = uniqueTopics.indexOf(existingTopic);
      uniqueTopics[indexOfUniqueTopic].count++;
      continue;
    }
    uniqueTopics.push({ topic, count: 1 });
  }
  res.status(200).json(uniqueTopics);
}
