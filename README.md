A project for exploring trips.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/dierotenhosen/trip-explorer.git
   cd trip-explorer
   ```

2. Create .env file in the `src/backend/app` directory:
   ```sh
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=trip_explorer
   DB_USER=root
   DB_PASSWORD=password
   ```

3. Install dependencies (using pnpm):
   ```bash
   cd src/frontend
   pnpm install
   cd ../..
   ```

4. Install dependencies (using pip):
   ```bash
   cd src/backend/app
   python -m venv venv
   venv\Scripts\activate.bat
   pip install -r requirements.txt
   cd ../../..
   ```

## Running Locally

1. Start the development server and the Uvicorn server:
   ```bash
   cd src/frontend; pnpm dev
   cd src/backend/app; venv\Scripts\activate.bat; uvicorn main:app --reload
   ```

2. Open your browser and go to [http://localhost:8000/health](http://localhost:8000/health).

3. Open your browser and go to [http://localhost:3000](http://localhost:3000).

## Technology Stack

- **Frontend:** Next.js, React, TypeScript, Firebase, Tailwind CSS
- **Backend:** Python, FastAPI, Uvicorn
- **Package Manager:** pnpm, pip

- Note: Trip-explorer will be deployed on a Synology DS220+ that has node.js, python, mariadb.

## Firebase Configuration

* Go to [https://console.firebase.google.com/](https://console.firebase.google.com/) to check or update the Firebase Configuration.

## Configuration of a MCP server to connect to Github
* See [here](https://github.com/modelcontextprotocol/servers/tree/main/src/github#npx).

## Database Setup

### Create the schema
```sh
mysql -u <username> -p trip_explorer < schema.sql
```

### Seed with test data
```sh
mysql -u <username> -p trip_explorer < seed.sql
```

## Models in Cursor
| Model Name                       | Provider        | Description                                        | Cost per Request | Notes                                            |
| -------------------------------- | --------------- | -------------------------------------------------- | ---------------- | ------------------------------------------------ |
| **Cursor Small**                 | Cursor Team     | Lightweight, fast model for coding                 | Free             | Ideal for autocomplete and local tasks           |
| **GPT-4o Mini**                  | OpenAI          | Lightweight version of GPT-4o                      | Free             | 500 requests/day on free plan                    |
| -------------------------------- | --------------- | -------------------------------------------------- | ---------------- | ------------------------------------------------ |
| **Claude 4.0 Sonnet**            | Anthropic       | Balanced Claude model                              | \$0.04           | Good for general use; premium model              |
| **Claude 4.0 Sonnet (thinking)** | Anthropic       | Claude 4.0 with long context/thinking enhancements | \$0.04           | Suitable for long context and in-depth reasoning |
| **Cursor Fast**                  | Cursor Team     | Optimized for code understanding and suggestions   | \$0.04           | Premium; fast and efficient                      |
| **GPT-4**                        | OpenAI          | Advanced general-purpose model                     | \$0.04           | Premium model; counts as 1 fast request          |
| **GPT-4 Turbo**                  | OpenAI          | Optimized version of GPT-4                         | \$0.04           | Premium model; counts as 1 fast request          |
| **GPT-4o**                       | OpenAI          | High-performance model with multimodal support     | \$0.04           | Premium model; counts as 1 fast request          |
| **o4 Mini**                      | OpenAI          | Latest mini model with updated capabilities        | \$0.04           | Premium model; counts as 1 fast request          |
| -------------------------------- | --------------- | -------------------------------------------------- | ---------------- | ------------------------------------------------ |
| **o1 Mini**                      | OpenAI          | Smaller variant of o1                              | \$0.10           | 10 requests/day included on paid plans           |
| **o1**                           | OpenAI          | Reasoning-focused model                            | \$0.40           | Premium; complex problem-solving                 |
| **Claude 4.0 Opus**              | Anthropic       | World's best coding model                          | $15/75 MTokens   | leading SWE-bench performance (72.5%)            |

## Tasks
Suggested Steps for #11:
1. Define the API Endpoints and implement CRUD Logic: Use the FastAPI router to define endpoints for updating, and deleting trips. Use SQLAlchemy to interact with the database for each endpoint. Ensure that the endpoints handle validation and error responses appropriately.
2. Test the Endpoints: Use tools like Postman or curl to test the API endpoints. Write unit tests for the API functions.
3. Document the API: Update your API documentation to include the new endpoints and their usage.