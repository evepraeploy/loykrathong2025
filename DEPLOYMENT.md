# Deployment Guide for Vercel

## Quick Start

### 1. Prepare Your Database

Since Vercel is serverless, you need a database that's accessible from the internet. Here are recommended options:

#### Option A: PlanetScale (Recommended for Vercel)
- Free tier available
- MySQL-compatible
- Serverless with automatic scaling
- No connection limit issues
- Sign up at: https://planetscale.com

#### Option B: Railway
- Easy setup
- MySQL support
- Free tier available
- Sign up at: https://railway.app

#### Option C: AWS RDS / DigitalOcean / Other Cloud Providers
- More control but requires configuration
- May have costs

### 2. Deploy to Vercel

#### Method 1: Using Vercel Dashboard (Easiest)

1. **Push your code to GitHub**
   ```bash
   cd loykrathong-api-2025
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/loykrathong-api-2025.git
   git push -u origin main
   ```

2. **Go to Vercel Dashboard**
   - Visit https://vercel.com
   - Sign in with GitHub
   - Click "Add New Project"
   - Import your repository

3. **Configure Environment Variables**
   
   In the Vercel project settings, add these environment variables:
   
   ```
   APP_ENV=production
   APP_PORT=8080
   DB_HOST=your-database-host.com
   DB_PORT=3306
   DB_USER=your-database-user
   DB_PASSWORD=your-database-password
   DB_NAME=loykrathong
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Your API will be live at: `https://your-project.vercel.app`

#### Method 2: Using Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   cd loykrathong-api-2025
   vercel
   ```

4. **Set Environment Variables**
   ```bash
   vercel env add APP_ENV
   vercel env add DB_HOST
   vercel env add DB_PORT
   vercel env add DB_USER
   vercel env add DB_PASSWORD
   vercel env add DB_NAME
   ```

5. **Redeploy with Environment Variables**
   ```bash
   vercel --prod
   ```

### 3. Test Your Deployment

Once deployed, test your API:

```bash
# Health check
curl https://your-project.vercel.app/

# Get Krathongs
curl https://your-project.vercel.app/api/v1/krathong

# Create Krathong
curl -X POST https://your-project.vercel.app/api/v1/krathong \
  -H "Content-Type: application/json" \
  -d '{
    "krathong_type": 1,
    "emp_name": "Test User",
    "emp_department": "IT",
    "emp_wish": "Test wish"
  }'
```

## Database Setup

Make sure your database has the required table:

```sql
CREATE TABLE krathongs (
  krathong_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  krathong_type INT NOT NULL,
  emp_name VARCHAR(50) NOT NULL,
  emp_department VARCHAR(50) NOT NULL,
  emp_wish TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Troubleshooting

### Issue: "Unable to connect to database"

**Solutions:**
1. Verify database credentials in Vercel environment variables
2. Ensure database allows connections from Vercel IPs (usually 0.0.0.0/0 for serverless)
3. Check if database is running and accessible
4. For PlanetScale: Make sure you're using the connection string from the dashboard

### Issue: "Too many connections"

**Solutions:**
1. Reduce connection pool size in `src/config/config.js`
2. Use a serverless-friendly database like PlanetScale
3. Implement connection pooling with services like PgBouncer (for PostgreSQL) or ProxySQL (for MySQL)

### Issue: "Function timeout"

**Solutions:**
1. Optimize database queries
2. Add indexes to frequently queried columns
3. Upgrade Vercel plan for longer timeout limits

### Issue: "Cold starts are slow"

**Solutions:**
1. This is normal for serverless functions
2. Consider using Vercel's "Edge Functions" for faster cold starts
3. Keep database connections warm with periodic health checks

## Monitoring

### View Logs
```bash
vercel logs your-project-url
```

### Monitor Performance
- Check Vercel Dashboard → Your Project → Analytics
- Monitor function execution time
- Track error rates

## Custom Domain

To add a custom domain:

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your domain
3. Update DNS records as instructed
4. Wait for DNS propagation (usually 5-30 minutes)

## Continuous Deployment

Once connected to GitHub:
- Every push to `main` branch automatically deploys to production
- Pull requests create preview deployments
- Rollback is easy through Vercel Dashboard

## Security Best Practices

1. **Never commit `.env` files**
   - Already in `.gitignore`
   - Use Vercel environment variables

2. **Use strong database passwords**

3. **Enable database SSL if available**
   - Update connection string in database config

4. **Rate limiting** (optional)
   - Consider adding rate limiting middleware for production

5. **CORS configuration**
   - Update CORS settings in `src/index.js` to restrict origins in production

## Cost Considerations

### Vercel Free Tier Limits:
- 100 GB bandwidth per month
- 100 hours of function execution time
- Unlimited deployments

### Recommendations:
- Start with free tier
- Monitor usage in Vercel Dashboard
- Upgrade if you exceed limits

## Support

For issues:
1. Check Vercel logs: `vercel logs`
2. Review Vercel documentation: https://vercel.com/docs
3. Check database connection and credentials
4. Review API response codes in README.md
