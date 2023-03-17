import { NextApiRequest, NextApiResponse } from "next";
import { gql, useLazyQuery } from "@apollo/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(400).json({ error: "Invalid method" });
    return;
  }
  const params = req.query;
  const subject = params.subject;
  let max_questions: number | string[] | undefined | string =
    params.max_questions;
  if (!subject || subject === "undefined" || typeof subject !== "string") {
    res.status(400).json({ error: "Invalid subject" });
    return;
  }
  if (
    !max_questions ||
    max_questions === "undefined" ||
    typeof max_questions !== "string"
  ) {
    max_questions = parseInt("10");
  }
  if (typeof max_questions === "string" && isNaN(parseInt(max_questions))) {
    res.status(400).json({ error: "Invalid max_questions" });
    return;
  }

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
            questions(where: {question_subject: "${subject}", question_status: 1}) {
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
  const json_results = await questions.json();
  const results = json_results;
  if (!results || results === "undefined") {
    res.status(400).json({ error: "Invalid results" });
    return;
  }
  const data = results.data.questions;
  if (!data || data === "undefined") {
    res.status(400).json({ error: "Invalid data" });
    return;
  }
  const random_questions: any[] = [];
  const random_questions_pushed: number[] = [];
  max_questions = (max_questions < data.length ? 10 : data.length) as number;
  if (max_questions === 0 || data.length === 0 || data.length === undefined) {
    res.status(400).json({ error: "No questions found" });
    return;
  }

  console.log("getting max questions: " + max_questions);
  for (let i = 0; i < max_questions; i++) {
    const random_index = Math.floor(Math.random() * data.length);
    if (random_questions_pushed.includes(random_index)) {
      i--;
      continue;
    }
    random_questions.push(data[random_index]);
    random_questions_pushed.push(random_index);
  }

  // create a csv file
  let csv = random_questions
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
