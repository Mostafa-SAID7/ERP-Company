# Deployment Guide

This guide provides instructions for deploying the ERP Company System to various environments.

## Prerequisites

- Node.js v16 or higher
- npm v7 or higher
- Git
- Access to deployment server/platform
- SSL certificate (for production)

## Build Process

### Development Build

```bash
npm run build:dev
```

Creates a development build with source maps for debugging.

### Production Build

```bash
npm run build
```

Creates an optimized production build:
- Minified JavaScript and CSS
- Tree-shaking for unused code
- Asset optimization
- Source maps (optional)

The build output is in the `dist/` directory.

## Deployment Environments

### Local Development

```bash
npm run dev
```

Runs the development server at `http://localhost:8080` with hot reload.

### Staging Environment

1. Build the application:
```bash
npm run build
```

2. Deploy to staging server:
```bash
scp -r dist/* user@staging-server:/var/www/erp-staging/
```

3. Configure environment variables
4. Test all features
5. Verify performance

### Production Environment

1. Build the application:
```bash
npm run build
```

2. Deploy to production server:
```bash
scp -r dist/* user@production-server:/var/www/erp-production/
```

3. Configure environment variables
4. Set up SSL/TLS
5. Configure reverse proxy
6. Set up monitoring

## Server Configuration

### Nginx Configuration

```nginx
server {
    listen 443 ssl http2;
    server_name erp.example.com;

    ssl_certificate /etc/ssl/certs/erp.crt;
    ssl_certificate_key /etc/ssl/private/erp.key;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript;
    gzip_min_length 1000;

    location / {
        root /var/www/erp-production;
        try_files $uri $uri/ /index.html;
        expires 1h;
        add_header Cache-Control "public, immutable";
    }

    location /assets/ {
        root /var/www/erp-production;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # API proxy (if needed)
    location /api/ {
        proxy_pass http://api-server:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name erp.example.com;
    return 301 https://$server_name$request_uri;
}
```

### Apache Configuration

```apache
<VirtualHost *:443>
    ServerName erp.example.com
    DocumentRoot /var/www/erp-production

    SSLEngine on
    SSLCertificateFile /etc/ssl/certs/erp.crt
    SSLCertificateKeyFile /etc/ssl/private/erp.key

    # Security headers
    Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
    Header always set X-Content-Type-Options "nosniff"
    Header always set X-Frame-Options "SAMEORIGIN"
    Header always set X-XSS-Protection "1; mode=block"

    # Gzip compression
    <IfModule mod_deflate.c>
        AddOutputFilterByType DEFLATE text/plain text/css application/json application/javascript
    </IfModule>

    # Rewrite rules for SPA
    <IfModule mod_rewrite.c>
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </IfModule>

    # Cache control
    <FilesMatch "\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$">
        Header set Cache-Control "public, max-age=31536000, immutable"
    </FilesMatch>

    <FilesMatch "\.html$">
        Header set Cache-Control "public, max-age=3600"
    </FilesMatch>
</VirtualHost>

# Redirect HTTP to HTTPS
<VirtualHost *:80>
    ServerName erp.example.com
    Redirect permanent / https://erp.example.com/
</VirtualHost>
```

## Environment Variables

Create a `.env` file in the deployment directory:

```env
VITE_API_URL=https://api.example.com
VITE_APP_NAME=ERP Company
VITE_APP_VERSION=1.0.0
VITE_ENVIRONMENT=production
```

## Docker Deployment

### Dockerfile

```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
```

### Docker Compose

```yaml
version: '3.8'
services:
  erp:
    build: .
    ports:
      - "3000:3000"
    environment:
      - VITE_API_URL=http://api:3000
      - VITE_APP_NAME=ERP Company
    depends_on:
      - api
  
  api:
    image: your-api-image:latest
    ports:
      - "3001:3000"
    environment:
      - DATABASE_URL=postgresql://user:password@db:5432/erp
```

## Cloud Deployment

### Vercel

1. Connect your GitHub repository
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Set environment variables
4. Deploy

### Netlify

1. Connect your GitHub repository
2. Configure build settings:
   - Build Command: `npm run build`
   - Publish Directory: `dist`
3. Set environment variables
4. Deploy

### AWS S3 + CloudFront

1. Build the application: `npm run build`
2. Upload to S3:
```bash
aws s3 sync dist/ s3://your-bucket-name/
```
3. Create CloudFront distribution
4. Configure SSL certificate
5. Set up cache invalidation

## Performance Optimization

### Asset Optimization
- Enable gzip compression
- Use CDN for static assets
- Implement cache busting
- Minify CSS and JavaScript

### Database Optimization
- Use connection pooling
- Implement query caching
- Create appropriate indexes
- Monitor query performance

### Monitoring
- Set up error tracking (Sentry, etc.)
- Monitor application performance
- Track user analytics
- Set up alerts

## Backup and Recovery

### Regular Backups
```bash
# Backup database
pg_dump erp_database > backup_$(date +%Y%m%d).sql

# Backup application files
tar -czf erp_backup_$(date +%Y%m%d).tar.gz /var/www/erp-production/
```

### Recovery Procedure
1. Restore database from backup
2. Restore application files
3. Verify configuration
4. Test functionality
5. Monitor for issues

## Rollback Procedure

1. Keep previous version available
2. Update reverse proxy to point to previous version
3. Verify functionality
4. Investigate issue with new version
5. Deploy fix and retry

## Security Checklist

- [ ] SSL/TLS certificate installed
- [ ] Security headers configured
- [ ] CORS properly configured
- [ ] Environment variables secured
- [ ] Database credentials protected
- [ ] Regular backups enabled
- [ ] Monitoring and alerts set up
- [ ] Access logs enabled
- [ ] Rate limiting configured
- [ ] DDoS protection enabled

## Related Documentation

- [PROJECT_SETUP](./PROJECT_SETUP.md) - Setup instructions
- [SECURITY](./SECURITY.md) - Security best practices
- [TECHNOLOGIES](./TECHNOLOGIES.md) - Technology stack
