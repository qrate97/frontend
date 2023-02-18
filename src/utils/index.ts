const contractAddress = "0x365dC45bf81ef6Ce719a373c4461111939CF83c6"

const abi = [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_question_string",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_subject",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_topic",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_subTopic",
          "type": "string"
        }
      ],
      "name": "addQuestion",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_subject",
          "type": "string"
        }
      ],
      "name": "applyAsModerator",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_address",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "_subject",
          "type": "string"
        }
      ],
      "name": "approveModerator",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "moderatorAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "subject",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "Moderator",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "question_string",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "subject",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "topic",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "subTopic",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "upvotes",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "downvotes",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "applicant",
              "type": "address"
            },
            {
              "internalType": "enum Qrate.QuestionStatus",
              "name": "status",
              "type": "uint8"
            },
            {
              "internalType": "uint256",
              "name": "incentives",
              "type": "uint256"
            }
          ],
          "indexed": false,
          "internalType": "struct Qrate.QuestionStruct",
          "name": "question",
          "type": "tuple"
        }
      ],
      "name": "Question",
      "type": "event"
    },
    {
      "stateMutability": "nonpayable",
      "type": "fallback"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_subject",
          "type": "string"
        },
        {
          "internalType": "bool",
          "name": "_vote",
          "type": "bool"
        }
      ],
      "name": "updateQuestion",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "stateMutability": "payable",
      "type": "receive"
    },
    {
      "inputs": [],
      "name": "chairperson",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_subject",
          "type": "string"
        }
      ],
      "name": "getQuestions",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "question_string",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "subject",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "topic",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "subTopic",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "upvotes",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "downvotes",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "applicant",
              "type": "address"
            },
            {
              "internalType": "enum Qrate.QuestionStatus",
              "name": "status",
              "type": "uint8"
            },
            {
              "internalType": "uint256",
              "name": "incentives",
              "type": "uint256"
            }
          ],
          "internalType": "struct Qrate.QuestionStruct[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "name": "moderatorCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "moderators",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "questions",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "question_string",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "subject",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "topic",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "subTopic",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "upvotes",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "downvotes",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "applicant",
          "type": "address"
        },
        {
          "internalType": "enum Qrate.QuestionStatus",
          "name": "status",
          "type": "uint8"
        },
        {
          "internalType": "uint256",
          "name": "incentives",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "questionVotes",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "name": "threshold",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]

  export {abi, contractAddress};