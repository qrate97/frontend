import { NextApiRequest, NextApiResponse } from "next";
import { gql, useLazyQuery } from "@apollo/client";

interface QuestionPaperCreationRequest extends NextApiRequest {
  body: {
    subject: string;
    max_questions: number;
    question_filters: { topic: string; count: number }[];
  };
}

export default async function handler(
  req: QuestionPaperCreationRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(400).json({ error: "Invalid method" });
    return;
  }
  const { subject, max_questions, question_filters } = req.body;
  console.log(req.body);

  if (!subject || subject === "undefined" || typeof subject !== "string") {
    res.status(400).json({ error: "Invalid subject" });
    return;
  }
  if (typeof max_questions === "string" && isNaN(parseInt(max_questions))) {
    res.status(400).json({ error: "Invalid max_questions" });
    return;
  }
  const questions_to_return: {
    id: number;
    quesId: number;
    questionString: string;
    subject: string;
    blockTimestamp: number;
    applicant: string;
    downvotes: number;
    status: 0 | 1;
    subTopic: string;
    topic: string;
    upvotes: number;
    transactionHash: string;
  }[] = [];
  for (const filter of question_filters) {
    const { topic, count } = filter;

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
                id
                quesId
                questionString
                subject
                blockTimestamp
                applicant
                downvotes
                status
                subTopic
                topic
                upvotes
                transactionHash
              }
            }`,
        }),
      }
    );
    const json_results: {
      data: {
        questions: {
          id: number;
          quesId: number;
          questionString: string;
          subject: string;
          blockTimestamp: number;
          applicant: string;
          downvotes: number;
          status: 0 | 1;
          subTopic: string;
          topic: string;
          upvotes: number;
          transactionHash: string;
        }[];
      };
    } = await questions.json();
    const results = json_results;
    if (!results) {
      res.status(400).json({ error: "Invalid results" });
      return;
    }
    const data = results.data.questions;
    if (!data) {
      res.status(400).json({ error: "Invalid data" });
      return;
    }
    if (data.length === 0) {
      continue;
    }
    const random_questions: any[] = [];
    const random_questions_pushed: number[] = [];
    if (max_questions === 0 || data.length === 0 || data.length === undefined) {
      res.status(400).json({ error: "No questions found" });
      return;
    }
    console.log(`getting ${count} questions for topic: ${topic}`);
    const questions_to_find = Math.min(count, data.length);
    for (let i = 0; i < questions_to_find; i++) {
      const random_index = Math.floor(Math.random() * data.length);
      if (random_questions_pushed.includes(random_index)) {
        i--;
        continue;
      }
      random_questions.push(data[random_index]);
      random_questions_pushed.push(random_index);
    }
    questions_to_return.push(...random_questions);
  }

  // create a csv file
  let csv = questions_to_return
    .map((question) => {
      return `${question.questionString}, ${question.subject}, ${question.topic}, ${question.subTopic}, ${question.applicant}, ${question.upvotes}, ${question.downvotes}, ${question.status}, ${question.blockTimestamp}, ${question.transactionHash}, ${question.quesId}`;
    })
    .join("\n");
  // add headers to csv string
  csv = `questionString, subject, topic, subTopic, applicant, upvotes, downvotes, status, blockTimestamp, transactionHash, quesId
${csv}`;
  // set the headers
  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", "attachment; filename=questions.csv");

  // send the csv file
  res.status(200).send(csv);
}
