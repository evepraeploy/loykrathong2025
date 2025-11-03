# Loy Krathong API 2025

Express.js API for the Loy Krathong festival, converted from Go and optimized for Vercel deployment.

## Features

- RESTful API with Express.js
- PostgreSQL database integration (Neon compatible) with Sequelize ORM
- CORS enabled for cross-origin requests
- Request logging middleware
- Vercel serverless deployment ready
- Environment-based configuration

## API Endpoints

### Base URL
- Local: `http://localhost:8080/api/v1`
- Production: `https://your-vercel-domain.vercel.app/api/v1`

### Endpoints

#### 1. Create Krathong
**POST** `/api/v1/krathong`

Request body:
```json
{
  "krathong_type": 1,
  "emp_name": "John Doe",
  "emp_department": "Engineering",
  "emp_wish": "May all wishes come true"
}
```

Response (201):
```json
{
  "response_code": "0000",
  "response_message": "Krathong created successfully",
  "data": {
    "krathong_id": 1,
    "krathong_type": 1,
    "emp_name": "John Doe",
    "emp_department": "Engineering",
    "emp_wish": "May all wishes come true",
    "created_at": "2024-10-31T06:30:00.000Z"
  }
}
```

#### 2. Get Krathongs
**GET** `/api/v1/krathong`

Response (200):
```json
{
  "response_code": "0000",
  "response_message": "Krathongs retrieved successfully",
  "data": [
    {
      "krathong_id": 1,
      "krathong_type": 1,
      "emp_name": "John Doe",
      "emp_department": "Engineering",
      "emp_wish": "May all wishes come true",
      "created_at": "2024-10-31T06:30:00.000Z"
    }
  ]
}
```

## Local Development

### Prerequisites
- Node.js >= 18.x
- PostgreSQL database (Neon connection recommended)
- npm or yarn

### Installation

1. Clone the repository
```bash
cd loykrathong-api-2025
```

2. Install dependencies
```bash
npm install
```

3. Create environment file
```bash
cp env.example .env
```

4. Configure your `.env` file
```env
APP_ENV=dev
APP_PORT=8080

DATABASE_URL=postgresql://<user>:<password>@<host>/<database>?sslmode=require

# Optional individual settings if not using DATABASE_URL
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=loykrathong
DB_SSL=true
DB_SSL_MODE=require
DB_SSL_REJECT_UNAUTHORIZED=false
```

5. Create the database table
```sql
CREATE TABLE IF NOT EXISTS krathongs (
  krathong_id SERIAL PRIMARY KEY,
  krathong_type INT NOT NULL,
  emp_name VARCHAR(50) NOT NULL,
  emp_department VARCHAR(50) NOT NULL,
  emp_wish TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

6. Start the development server
```bash
npm run dev
```

The API will be available at `http://localhost:8080`

## Deployment to Vercel

### Step 1: Install Vercel CLI (optional)
```bash
npm install -g vercel
```

### Step 2: Configure Environment Variables

In your Vercel project settings, add the following environment variables:
- `APP_ENV` = production
- `DATABASE_URL` = `postgresql://<user>:<password>@<host>/<database>?sslmode=require`
- (Optional) `DB_SSL_REJECT_UNAUTHORIZED` = `false` (Neon recommends this for pooled connections)

### Step 3: Deploy

#### Option A: Using Vercel CLI
```bash
vercel
```

#### Option B: Using Git Integration
1. Push your code to GitHub/GitLab/Bitbucket
2. Import the project in Vercel dashboard
3. Configure environment variables
4. Deploy

### Important Notes for Vercel Deployment

1. **Database Connection**: Vercel functions are serverless, so ensure your PostgreSQL database:
   - Is accessible from the internet
   - Has proper connection pooling configured
   - Consider using services like:
     - Neon (PostgreSQL serverless, highly recommended)
     - Railway
     - Supabase
     - AWS RDS

2. **Cold Starts**: First request after inactivity may be slower due to serverless nature

3. **Connection Limits**: Configure appropriate connection pool settings in `src/config/config.js`

## Project Structure

```
loykrathong-api-2025/
├── src/
│   ├── config/
│   │   ├── config.js          # Configuration management
│   │   └── database.js        # Database connection
│   ├── controllers/
│   │   └── krathong.controller.js  # Business logic
│   ├── middleware/
│   │   └── logger.js          # Logging middleware
│   ├── models/
│   │   └── krathong.model.js  # Sequelize model
│   ├── routes/
│   │   └── krathong.routes.js # Route definitions
│   └── index.js               # Application entry point
├── .gitignore
├── env.example
├── package.json
├── vercel.json                # Vercel configuration
└── README.md
```

## Response Codes

- `0000` - Success
- `0001` - Invalid JSON format / Missing required fields
- `0004` - Database operation failed
- `0404` - Route not found
- `0500` - Internal server error

## Technologies Used

- **Express.js** - Web framework
- **Sequelize** - ORM for PostgreSQL
- **pg & pg-hstore** - PostgreSQL drivers
- **CORS** - Cross-origin resource sharing
- **Morgan** - HTTP request logger
- **dotenv** - Environment variable management

## Migration from Go API

This project is a direct conversion from the Go-based Loy Krathong API with the following changes:
- Gin framework → Express.js
- GORM → Sequelize
- Native Go packages → Node.js packages
- Maintained same API endpoints and response structure
- Optimized for Vercel serverless deployment

## License

ISC
