# Compas Assistant
Template using the OpenAI [Assistants API](https://platform.openai.com/docs/assistants/overview) with [Next.js](https://nextjs.org/docs).
<br/>
<br/>


## Quickstart Setup

### 1. Clone repo
```shell
git clone https://github.com/DenezG/compas-assistant.git
cd compas-assistant
```

### 2. Set your [OpenAI API key](https://platform.openai.com/api-keys)
```shell
OPENAI_API_KEY = 'sk-proj-...'
ASSISTANT_ID = 'asst_...'
DEWY_ENDPOINT= 'http://localhost:8000'
DEWY_COLLECTION= 'main'
```
(inside a `.env.local` that you have to create).

### 3. Install dependencies
```shell
npm install
```

### 4. Run
```shell
npm run dev
```

### 5. Navigate to [http://localhost:3000](http://localhost:3000).

## Overview

This project represent an assistant that uses the compas datas in order to respond at the user's questions.
We advice to use 'Chat avec Images' since it's the most advanced and regroup the two other pages.


### Main Components

- `app/components/chat.tsx` - handles chat rendering, [streaming](https://platform.openai.com/docs/assistants/overview?context=with-streaming), and [function call](https://platform.openai.com/docs/assistants/tools/function-calling/quickstart?context=streaming&lang=node.js) forwarding
- `app/components/file-viewer.tsx` - handles uploading, fetching, and deleting files for [file search](https://platform.openai.com/docs/assistants/tools/file-search)

### Endpoints

- `api/assistants` - `POST`: create assistant (only used at startup)
- `api/assistants/threads` - `POST`: create new thread
- `api/assistants/threads/[threadId]/messages` - `POST`: send message to assistant
- `api/assistants/threads/[threadId]/actions` - `POST`: inform assistant of the result of a function it decided to call
- `api/assistants/files` - `GET`/`POST`/`DELETE`: fetch, upload, and delete assistant files for file search
- `api/assistants/image` - `POST` : fetch an image by using the fileId of the image



