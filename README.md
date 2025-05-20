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
