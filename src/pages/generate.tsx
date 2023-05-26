import {
  Button,
  Flex,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
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
  const [topics, setTopics] = useState<{ topic: string; count: number }[]>([]);
  const [topic, setTopic] = useState<string>("");
  const [maxTopicQuestionCount, setMaxTopicQuestionCount] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [addButtonDisabled, setAddButtonDisabled] = useState<boolean>(false);
  const [filters, setFilters] = useState<{ topic: string; count: number }[]>(
    []
  );
  const [flashMessage, setFlashMessage] = useState<string>("");
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
    console.log("maxTopicQuestionCount", maxTopicQuestionCount);
  }, [count, filters, maxQuestions, addButtonDisabled]);

  const handletopicCountChange = (valueString: string) => {
    // check if the sum of total of counts in filters and current value is less than or equal to maxQuestions
    // if not set the addButtonDisabled to true else false
    console.log(
      filters.reduce((acc, filter) => acc + filter.count, 0) +
        parseInt(valueString) >
        maxQuestions
    );
    if (topic === "") {
      setCount(0);
      setAddButtonDisabled(true);
      setFlashMessage("");
    } else if (
      filters.reduce((acc, filter) => acc + filter.count, 0) +
        parseInt(valueString) >
      maxQuestions
    ) {
      setCount(0);
      setAddButtonDisabled(true);
      setFlashMessage("Maximum Question Selected!");
    } else if (parseInt(valueString) <= 0 || isNaN(parseInt(valueString))) {
      setCount(0);
      setAddButtonDisabled(true);
      setFlashMessage("Select Atleast One Question!");
    } else if (parseInt(valueString) > maxTopicQuestionCount) {
      setCount(0);
      setAddButtonDisabled(true);
      setFlashMessage(`You can Select upto ${maxTopicQuestionCount}!`);
    } else {
      setAddButtonDisabled(false);
    }
    if (valueString) {
      setCount(parseInt(valueString));
    } else {
      setCount(0);
    }
  };
  useEffect(() => {
    handletopicCountChange("");
  }, []);
  const handleTopicAdd: MouseEventHandler<HTMLButtonElement> = (e) => {
    // set filters to a new array with the new filter added and set topic and count to empty string
    // the new filters array should have unique topics and count should be greater than 0 else alert the user
    // the sum of counts of all filters should be less than or equal to maxQuestions
    // dont add if count is Nan
    if (isNaN(count)) {
      alert("Please enter a valid count");
      return;
    }
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
        return prev.filter((t) => t.topic !== topic);
      });
      setTopic("");
      setCount(1);
      // disable add button if the sum of counts of all filters is equal to maxQuestions
      if (
        prev.reduce((acc, filter) => acc + filter.count, 0) + count ===
        maxQuestions
      ) {
        setAddButtonDisabled(true);
      }

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
      .then(
        (
          data: {
            topic: string;
            count: number;
          }[]
        ) => {
          // set topics to data but remove the topics that are already present in filters
          const topics = data.filter((topic) => {
            return !filters.find((filter) => filter.topic === topic.topic);
          });
          setTopics(topics);
          console.log(topics);
        }
      );
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
          data-max-count={maxTopicQuestionCount}
          onChange={(e) => {
            setTopic(e.target.value);
            setMaxTopicQuestionCount(
              parseInt(
                e.target.options[e.target.selectedIndex].dataset
                  .maxCount as string
              ) || 0
            );
          }}
        >
          {topics.map((topic, index) => {
            return (
              <option
                value={topic.topic}
                key={index}
                data-max-count={topic.count}
              >
                {topic.topic}
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

        <NumberInput
          flex={1}
          placeholder="Count"
          value={count}
          onChange={handletopicCountChange}
          min={0}
          max={maxTopicQuestionCount}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        {/* A button to add this topic to filters */}
        {/* Disable the button if sum of counts in filters is greater than or equal to maxQuestions */}
        {addButtonDisabled && flashMessage ? (
          <span
            style={{
              flex: 1,
              textAlign: "left",
              color: "red",
              maxWidth: "250px",
              minWidth: "200px",
            }}
          >
            {flashMessage}
          </span>
        ) : (
          <Button
            flex={1}
            onClick={handleTopicAdd}
            isDisabled={addButtonDisabled}
          >
            Add
          </Button>
        )}
      </Flex>
      {/* Generate Question paper button */}
      {/* Disable the button if sum of counts in filters is greater than maxQuestions */}
      <br></br>
      <br></br>
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
