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

5. Configure Firebase Authentication:
   
   **Option 1: Service Account (Recommended for production)**
   - Download your Firebase service account key from Firebase Console and set environment variable: `GOOGLE_APPLICATION_CREDENTIALS=path/to/serviceAccountKey.json`
   
   **Option 2: Application Default Credentials (Development)**
   - Set `FIREBASE_PROJECT_ID=your-project-id` in environment
   - Or install Google Cloud CLI and run: `gcloud auth application-default login`

## Running Locally

1. Start the development server and the Uvicorn server:
   ```bash
   cd src/frontend; pnpm dev
   cd src/backend/app; venv\Scripts\activate.bat; uvicorn main:app --reload
   ```

2. Open your browser and go to [http://localhost:8000/health](http://localhost:8000/health).

3. Open your browser and go to [http://localhost:3000](http://localhost:3000).

4. API Documentation: [http://localhost:8000/docs](http://localhost:8000/docs)

## API Authentication

All trip and user endpoints now require Firebase authentication. Include the Firebase ID token in the Authorization header:

```
Authorization: Bearer <firebase-id-token>
```

### Available Endpoints:

**Trips (Authenticated)**
- `POST /trips/` - Create a new trip
- `GET /trips/` - Get all trips for authenticated user
- `GET /trips/{trip_id}` - Get specific trip (if owned by user)
- `PUT /trips/{trip_id}` - Update trip (if owned by user)
- `DELETE /trips/{trip_id}` - Delete trip (if owned by user)

**Public Endpoints**
- `GET /` - Root message
- `GET /health` - Health check

## Technology Stack

- **Frontend:** Next.js, React, TypeScript, Firebase, Tailwind CSS
- **Backend:** Python, FastAPI, Uvicorn, Firebase Admin SDK
- **Package Manager:** pnpm, pip

- Note: Trip-explorer will be deployed on a Synology DS220+ that has node.js, python, mariadb.

## Firebase Configuration

* Go to [https://console.firebase.google.com/](https://console.firebase.google.com/) to check or update the Firebase Configuration.

## Configuration of a MCP server to connect to Github
* See [here](https://github.com/modelcontextprotocol/servers/tree/main/src/github#npx).

## Database Setup

### Create the database and the schema
```sh
mysql -u root < db/init-user-and-db.sql
mysql -u <username> -p trip_explorer < db/migrations/001_init_schema.sql
```

### Seed with test data (TEST/DEVELOPMENT ONLY)
- The `firebase_uid` values in the seed file are **placeholders** and will **NOT match real Firebase users**
- Real users are automatically created in the database when they first authenticate via Firebase
- This seed data is useful for testing the database schema and relationships during development

```sh
mysql -u <username> -p trip_explorer < db/seed.sql
```

## Tasks
Next Steps for #11:
1. Done (Implement API endpoints.)
2. Done (Test the Endpoints with Postman.)
3. Write unit tests for the API functions.
get /trips
post /trips
get /trips/{trip_id}
put /trips/{trip_id}
delete /trips/{trip_id}
