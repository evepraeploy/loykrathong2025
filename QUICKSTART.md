# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies
```bash
cd loykrathong-api-2025
npm install
```

### Step 2: Setup Database
Run the SQL schema:
```bash
mysql -u root -p < schema.sql
```

Or manually create the database and table using the SQL in `schema.sql`.

### Step 3: Configure Environment
```bash
# Copy the example environment file
cp env.example .env

# Edit .env with your database credentials
# On Windows: notepad .env
# On Mac/Linux: nano .env
```

Update these values in `.env`:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=loykrathong
```

### Step 4: Start the Server
```bash
# Development mode (with auto-reload)
npm run dev

# Or production mode
npm start
```

The API will be running at: `http://localhost:8080`

### Step 5: Test the API

**Health Check:**
```bash
curl http://localhost:8080/
```

**Create a Krathong:**
```bash
curl -X POST http://localhost:8080/api/v1/krathong \
  -H "Content-Type: application/json" \
  -d '{
    "krathong_type": 1,
    "emp_name": "Test User",
    "emp_department": "IT",
    "emp_wish": "Success and happiness"
  }'
```

**Get Krathongs:**
```bash
curl http://localhost:8080/api/v1/krathong
```

## 📦 Deploy to Vercel

### Quick Deploy (3 steps):

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push
   ```

2. **Import to Vercel**
   - Go to https://vercel.com
   - Click "Import Project"
   - Select your repository

3. **Add Environment Variables**
   Add these in Vercel dashboard:
   - `DB_HOST`
   - `DB_USER`
   - `DB_PASSWORD`
   - `DB_NAME`
   - `APP_ENV=production`

Done! Your API is live 🎉

## 📚 Next Steps

- Read [README.md](README.md) for detailed API documentation
- Check [DEPLOYMENT.md](DEPLOYMENT.md) for deployment guide
- Import [postman_collection.json](postman_collection.json) to test with Postman

## ❓ Troubleshooting

**Can't connect to database?**
- Check if MySQL is running
- Verify credentials in `.env`
- Ensure database `loykrathong` exists

**Port 8080 already in use?**
- Change `APP_PORT` in `.env` to another port (e.g., 3000)

**Module not found errors?**
- Run `npm install` again
- Delete `node_modules` and run `npm install`

## 📞 Need Help?

Check the detailed guides:
- [README.md](README.md) - Full documentation
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment instructions
