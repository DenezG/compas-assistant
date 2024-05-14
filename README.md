# Compas Assistant
Template de OpenAI [Assistants API](https://platform.openai.com/docs/assistants/overview) with [Next.js](https://nextjs.org/docs).
<br/>
<br/>
![OpenAI Assistants API Quickstart](https://github.com/openai/openai-assistants-quickstart/assets/27232/755e85e9-3ea4-421f-b202-3b0c435ea270)


## Rapide Setup

### 1. Clone repo
```shell
git clone https://github.com/DenezG/compas-assistant.git
cd compas-assistant
```

### 2. Configurer votre [OpenAI API key](https://platform.openai.com/api-keys)
```shell
OPENAI_API_KEY = 'sk-proj-...'
ASSISTANT_ID = 'asst_...'
DEWY_ENDPOINT= 'http://localhost:8000'
DEWY_COLLECTION= 'main'
```
(Dans un fichier `.env.local` que vous devez créer).

### 3. Install dependencies
```shell
npm install
```

### 4. Run
```shell
npm run dev
```

### 5. Naviger à [http://localhost:3000](http://localhost:3000).

## Overview

Ce projet représente un assistant Openai qui utilise les données du compas afin de répondre au questions des utilisateurs.
Nous vous conseillons d'utiliser la page 'Chat avec Images' car c'est la plus avancée et elle regroupe les fonctionnalités des deux autres pages.


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


# Dewy RAG Setup


## Installation de PostgreSQL

Pour mettre en place la base de données PostgreSQL, suivez ces étapes :

1. Regardez cette vidéo pour une installation rapide : [Installation de PostgreSQL](https://www.youtube.com/watch?v=KuQUNHCeKCk)
2. Assurez-vous d'avoir l'URL de base suivante : `postgresql://postgres:admin@localhost:5432/postgres`
3. L'URL possède cette forme : `postgresql://username:password@localhost:port/databasename`

## Installation de Dewy

Nous ne pouvons pas avoir configurer dewy dans le github car il possède trop de fichiers.
Pour installer Dewy et configurer l'environnement, suivez ces étapes :

1. Assurez-vous d'avoir la dernière version de Python installée pour avoir pip.
2. Installez virtual env :
    ```powershell
    pip install virtualenv
    ```
3. Créer votre environnement virtuel python à la source de votre projet et non dans le dossier compas-assistant:
   ```powershell
   cd..
   python -m venv py-env
   ```
4. Activez votre environnement virtuel :
    ```powershell
    cd .\py-env\
    .\Scripts\Activate.ps1
    ```
5. Installez setuptools :
    ```bash
    pip install setuptools
    ```
6. Installez Dewy :
    ```bash
    pip install dewy
    ```
7. Assurez-vous d'avoir crée et rempli le fichier `.env` dans le virtualenv:
   ```env
   ENVIRONMENT=LOCAL
    DB=postgresql://postgres:admin@localhost:5432/postgres
    OPENAI_API_KEY='your-api-key'
   ```
8. Lancez Dewy :
    ```bash
    dewy
    ```
9. L'endpoint de Dewy est accessible à l'adresse : [http://localhost:8000/admin](http://localhost:8000/admin)

Assurez-vous d'ouvrir un nouveau terminal avant de passer à l'étape suivante.

## Installation du front-end avec Next.js

Pour installer et exécuter le front-end avec Next.js, suivez ces étapes :

1. Créez votre fichier env :    
    ```bash
    OPENAI_API_KEY=<your_openai_api_key_here>
    DEWY_ENDPOINT=localhost:8000
    DEWY_COLLECTION=main
    ```
2. Accédez au répertoire `my-rag-app` :
    ```bash
    cd my-rag-app
    ```
3. Si les bibliothèques ne sont pas déjà présentes dans le dépôt, installez-les en exécutant :
    ```bash
    npm install openai dewy-ts ai
    ```
4. Enfin, lancez l'application en mode développement :
    ```bash
    npm run dev
    ```

C'est tout ! Votre environnement pour "my-rag" est maintenant prêt à être utilisé.

Maintenant il est probable que dewy ai quelques erreurs.

## dewy errors

#### Backend Python (collections/documents/router.py) Error : Method not allowed 
- Modifier les routes de `@post` en `@put` pour les dossiers `collections` et `documents`. Cela résout un problème avec react-admin qui n'utilise pas de post pour sa fonction create.
  
#### Backend Python (document/models.py - AddDocumentRequest) Error : Unprocessable Entity
- Ajouter `'= 'main'` à la variable `collection` pour que la requête reçoive correctement l'identifiant de la collection ici 'main', avec cette résolution on ne peut que stocker des documents sur la collection 'main'.
- TODO : Trouver pourquoi l'identifiant de la collection n'est pas communiquer lors de sa selection.

#### Backend Python (document/models.py - TextResult) Error : les chunks ne s'affichent pas
- Ajouter `'= 'main'` à la variable `collection` pour que la requête reçoive correctement l'identifiant de la collection, problème identique à celui d'avant
- Cette manipulation permet de rendre les chunks de documents recherchables.
- TODO : Trouver pourquoi l'identifiant de la collection n'est pas communiquer lors de sa selection.

#### Backend JavaScript (app/api/chat) Error : POST 500
- Mettre à jour les fichiers depuis [https://github.com/DewyKB/dewy-ts/tree/main/examples/nextjs_and_openai_chatbot/app/api/chat](https://github.com/DewyKB/dewy-ts/tree/main/examples/nextjs_and_openai_chatbot/app/api/chat).

#### Configuration de l'application (.env.local)
```env
OPENAI_API_KEY = 'sk-proj-B5UxsGbpYtPUQZFgcIJcT3BlbkFJNN8xcZ5wX1huxZp0xF9M'
ASSISTANT_ID = 'asst_lj9VxT8aGfaoNpZv922ndRfg'
DEWY_ENDPOINT= 'http://localhost:8000'
DEWY_COLLECTION= 'main'
```

#### Backend Python (common/collection_embeddings.py) : tri des chunks de documents par score
  - Ajouter `DESC` après `ORDER BY` à la ligne 66.
  - Ajouter `DESC` après `ORDER BY` à la ligne 77.
  - Après la ligne 86, ajouter `ORDER BY relevant_embeddings.score DESC`.

Le problème est désormais résolu et dewy fonctionne parfaitement.
