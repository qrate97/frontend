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
  const questions_to_return = [];
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
              questions(where: {question_subject: "${subject}", question_topic: "${topic}"}) { # , question_status: 1
                id
                question_id
                question_question_string
                question_subject
                blockTimestamp
                question_applicant
                question_downvotes
                question_incentives
                question_status
                question_subTopic
                question_topic
                question_upvotes
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
          question_id: number;
          question_question_string: string;
          question_subject: string;
          blockTimestamp: number;
          question_applicant: string;
          question_downvotes: number;
          question_status: 0 | 1;
          question_subTopic: string;
          question_topic: string;
          question_upvotes: number;
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
    console.log(
      `found ${data.length} questions for topic: ${topic} and subject: ${subject}`
    );
    console.log(`getting ${count} questions for topic: ${topic} randomly`);
    const questions_to_find = Math.min(count, data.length);
    console.log(`can only find ${data.length} questions`);
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
      return `${question.question_question_string}, ${question.question_subject}, ${question.question_topic}, ${question.question_subTopic}, ${question.question_applicant}, ${question.question_incentives}, ${question.question_upvotes}, ${question.question_downvotes}, ${question.question_status}, ${question.blockTimestamp}, ${question.transactionHash}, ${question.question_id}`;
    })
    .join("\n");
  // add headers to csv string
  csv = `question_question_string, question_subject, question_topic, question_subTopic, question_applicant, question_incentives, question_upvotes, question_downvotes, question_status, blockTimestamp, transactionHash, question_id
${csv}`;
  // set the headers
  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", "attachment; filename=questions.csv");

  // send the csv file
  res.status(200).send(csv);
}
