# Getting Started with RAG-webUI

This project is a web-based chatbot which allows users to upload their own RAG datasets. This project uses React for the Web UI, along with a flask backend running the Ollama instance.

This example shows the chatbot explaining the process of preparing a dish when given the recipe as a RAG reference document.

![alt text](https://github.com/draip96/ChatRAG/blob/main/ChatGIF.gif "Chat Example")
## Usage

Just start asking questions! To change the RAG dataset, upload a file, and change to the selected dataset in the dropdown.

Currently, all RAG data must be uploaded using the JSON format.

## Installation

### Windows

On windows installation, WSL2 is required for Ollama.

Install WSL2 if necessary.

Download and install [Ollama](https://ollama.com/).

Install python dependencies - `pip install flask flask-cors ollama llama-index qdrant-client`

Install node dependencies - `npm install`

## Scripts

To run this project, you must run the following scripts:

### `ollama run mistral`

Runs the mistral Ollama model\
This model will be queried from the web UI.

### `flask run`

Runs the backend in the development mode.\
This command allows the web UI to communicate with the Ollama instance using API.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.



