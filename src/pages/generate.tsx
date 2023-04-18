import {
  Button,
  Flex,
  Input,
  Select,
  Table,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Link from "next/link";
import {
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";

const Generate = () => {
  const [subject, setSubject] = useState<string>("");
  const [topics, setTopics] = useState<string[]>([]);
  const [topic, setTopic] = useState<string>("");
  const [count, setCount] = useState<number>(1);
  const [addButtonDisabled, setAddButtonDisabled] = useState<boolean>(false);
  const [filters, setFilters] = useState<{ topic: string; count: number }[]>(
    []
  );
  const downloadButton = useRef<HTMLAnchorElement | null>(null);
  const [maxQuestions, setMaxQuestions] = useState<number>(10);

  useEffect(() => {
    console.log("button", addButtonDisabled);
    console.log("max", maxQuestions);
    console.log(
      "tot",
      filters.reduce((acc, filter) => acc + filter.count, 0) + count
    );
    console.log(
      "dis",
      filters.reduce((acc, filter) => acc + filter.count, 0) + count >
        maxQuestions
    );
  }, [count, filters, maxQuestions, addButtonDisabled]);

  const handletopicCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // check if the sum of total of counts in filters and current value is less than or equal to maxQuestions
    // if not set the addButtonDisabled to true else false
    console.log(
      filters.reduce((acc, filter) => acc + filter.count, 0) +
        parseInt(e.target.value) >
        maxQuestions
    );
    if (
      filters.reduce((acc, filter) => acc + filter.count, 0) +
        parseInt(e.target.value) >
      maxQuestions
    ) {
      setAddButtonDisabled(true);
    } else {
      setAddButtonDisabled(false);
    }
    setCount(parseInt(e.target.value));
  };

  const handleTopicAdd: MouseEventHandler<HTMLButtonElement> = (e) => {
    // set filters to a new array with the new filter added and set topic and count to empty string
    // the new filters array should have unique topics and count should be greater than 0 else alert the user
    // the sum of counts of all filters should be less than or equal to maxQuestions
    if (
      filters.reduce((acc, filter) => acc + filter.count, 0) + count >
      maxQuestions
    ) {
      console.log("Total questions cannot be greater than max questions");
      return filters;
    }
    setFilters((prev) => {
      if (
        prev.find((filter) => filter.topic === topic) ||
        count <= 0 ||
        topic === ""
      ) {
        console.log("Please select a topic and count greater than 0");
        return prev;
      }
      //   also remove the topic from topics array
      setTopics((prev) => {
        return prev.filter((t) => t !== topic);
      });
      setTopic("");
      setCount(1);

      return [...prev, { topic: topic, count: count }];
    });
  };

  const onSubjectChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    // get list of topics from endpoint for a subject and set it to topics when a subject changes
    // check if subject is present
    setSubject(e.target.value);
    const subject = e.target.value;
    if (subject === "") return;
    fetch(`/api/topics?subject=${subject}`)
      .then((res) => res.json())
      .then((data: string[]) => {
        // set topics to data but remove the topics that are already present in filters
        const topics = data.filter((topic) => {
          return !filters.find((filter) => filter.topic === topic);
        });
        setTopics(topics);
        console.log(topics);
      });
  };

  const handleGenerate: MouseEventHandler<HTMLButtonElement> = (e) => {
    // send a post request to /api/getRandomQuestions with the subjects, filters and maxQuestions
    fetch("/api/getRandomQuestions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject: subject,
        question_filters: filters,
        maxQuestions: maxQuestions,
      }),
    })
      .then((res) => res.text())
      .then((data) => {
        console.log(data);
        return data;
      })
      .then((data) => {
        var uri = "data:text/csv;charset=utf-8," + data;
        var downloadLink = document.createElement("a");
        downloadLink.href = uri;
        downloadLink.download = "GeneratedQuestionPaper.csv";

        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      });
  };

  return (
    <div>
      <h1>Generate Question Paper For Following Filters</h1>
      <br></br>
      <Select placeholder="Select Subject" onChange={onSubjectChange}>
        <option value="Blockchain">Blockchain</option>
        <option value="DSA">DSA</option>
        <option value="RDBMS">RDBMS</option>
        <option value="Python">Python</option>
      </Select>
      {/* A number input to get total questions to generate for */}
      <br></br>
      Max Questions:
      <Input
        type="number"
        placeholder="Max Questions"
        defaultValue={10}
        onChange={(e) => setMaxQuestions(parseInt(e.target.value))}
      ></Input>
      <br />
      <br />
      {/* Select tag for topics that is disabled when there are no topics but can have all topics as options*/}
      <p>Selected Topics with number of questions that could be set</p>
      {/* Map over filters as values */}
      {/* Create a table to show what topics and in filters with their count */}
      <Table>
        <Thead>
          <Tr>
            <Th>Topic</Th>
            <Th>Count</Th>
          </Tr>
        </Thead>
        <tbody>
          {filters.map((filter, index) => {
            return (
              <Tr key={index}>
                <Td>{filter.topic}</Td>
                <Td>{filter.count}</Td>
              </Tr>
            );
          })}
        </tbody>
      </Table>
      <br></br>
      <Flex justifyContent={"center"} alignItems="center">
        <Select
          flex={2}
          placeholder="Select Topic"
          isDisabled={topics.length === 0}
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        >
          {topics.map((topic, index) => {
            return (
              <option value={topic} key={index}>
                {topic}
              </option>
            );
          })}
        </Select>
        {/* A number input to get count for this topic */}
        <span
          style={{
            flex: 2,
            textAlign: "right",
            fontWeight: "bold",
            paddingRight: "10px",
          }}
        >
          Questions for this topic:
        </span>
        <Input
          flex={1}
          type="number"
          placeholder="Count"
          value={count}
          onChange={handletopicCountChange}
        ></Input>
        {/* A button to add this topic to filters */}
        {/* Disable the button if sum of counts in filters is greater than or equal to maxQuestions */}
        <Button onClick={handleTopicAdd} isDisabled={addButtonDisabled}>
          Add
        </Button>
      </Flex>
      {/* Generate Question paper button */}
      {/* Disable the button if sum of counts in filters is greater than maxQuestions */}
      <Button
        onClick={handleGenerate}
        isDisabled={
          filters.reduce((acc, filter) => acc + filter.count, 0) > maxQuestions
        }
        colorScheme="orange"
      >
        Generate Question Paper
      </Button>
    </div>
  );
};

export default Generate;
