# Netlify Deployment Guide

## Quick Start

The ERP Company System is configured for automatic deployment to Netlify. Follow these steps to deploy.

## Prerequisites

- GitHub account with access to the repository
- Netlify account (free tier available)
- Custom domain (optional)

## Step-by-Step Deployment

### 1. Connect Repository to Netlify

1. Go to [Netlify](https://app.netlify.com)
2. Click **"New site from Git"**
3. Choose **GitHub** as your Git provider
4. Authorize Netlify to access your GitHub account
5. Search for and select **`Mostafa-SAID7/ERP-Company`**

### 2. Configure Build Settings

Netlify will automatically detect the configuration from `netlify.toml`:

- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Node version**: 18

These are already configured, so you can proceed.

### 3. Deploy

1. Click **"Deploy site"**
2. Netlify will:
   - Clone the repository
   - Install dependencies
   - Run the build command
   - Deploy to a temporary URL

3. Wait for the deployment to complete (usually 2-5 minutes)

### 4. Access Your Site

Once deployed, you'll get a temporary URL like:
```
https://[random-name].netlify.app
```

## Custom Domain Setup

### Add Custom Domain

1. Go to **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Enter your domain: `erp-company.netlify.app`
4. Netlify will verify ownership
5. SSL certificate will be auto-provisioned

### DNS Configuration

If using a custom domain:

1. Update your domain's DNS records to point to Netlify
2. Netlify provides specific DNS records to add
3. Wait for DNS propagation (can take up to 48 hours)

## Automatic Deployments

Once connected, Netlify will automatically deploy when you:

1. Push to the `main` branch
2. Create a pull request (preview deployment)
3. Merge a pull request

### Deployment Triggers

- **Production**: Pushes to `main` branch
- **Preview**: Pull requests
- **Branch deploys**: Other branches (optional)

## Environment Variables

If you need environment variables:

1. Go to **Site settings** → **Build & deploy** → **Environment**
2. Click **"Edit variables"**
3. Add your variables:
   ```
   VITE_API_URL=https://api.example.com
   VITE_APP_NAME=ERP Company
   ```

4. Redeploy the site for changes to take effect

## Build Configuration

The `netlify.toml` file contains:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"
```

### Modify Build Settings

To change build settings:

1. Edit `netlify.toml` in the repository
2. Commit and push changes
3. Netlify will use the new configuration for next deployment

## Security Headers

The following security headers are configured in `netlify.toml`:

```
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

These protect against common web vulnerabilities.

## Cache Control

- **Static assets** (`/assets/*`): Cached for 1 year
- **HTML files** (`/*.html`): Cached for 1 hour
- **Default**: Public cache

This ensures users get the latest HTML while static assets are cached efficiently.

## SPA Routing

The configuration includes SPA routing:

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

This ensures all routes are handled by React Router.

## Monitoring Deployments

### View Deployment History

1. Go to **Deploys** tab
2. See all deployments with:
   - Deployment status
   - Commit hash
   - Deployment time
   - Build logs

### View Build Logs

1. Click on a deployment
2. Click **"View deploy log"**
3. See detailed build output

### Rollback to Previous Deployment

1. Go to **Deploys** tab
2. Find the deployment to rollback to
3. Click **"Publish deploy"**

## Troubleshooting

### Build Fails

1. Check the build logs
2. Common issues:
   - Missing dependencies: Run `npm install`
   - Node version mismatch: Update `netlify.toml`
   - Environment variables: Add missing variables

### Site Not Updating

1. Check if deployment completed successfully
2. Clear browser cache (Ctrl+Shift+Delete)
3. Check if changes were pushed to `main` branch

### Performance Issues

1. Check Lighthouse scores in Netlify Analytics
2. Optimize images
3. Review bundle size
4. Check for slow API calls

### SSL Certificate Issues

1. Verify domain ownership
2. Wait for certificate provisioning (can take 24 hours)
3. Contact Netlify support if issues persist

## Advanced Configuration

### Redirect Rules

Add redirects in `netlify.toml`:

```toml
[[redirects]]
  from = "/old-path"
  to = "/new-path"
  status = 301
```

### Custom Headers

Add headers in `netlify.toml`:

```toml
[[headers]]
  for = "/api/*"
  [headers.values]
    Authorization = "Bearer token"
```

### Functions

Deploy serverless functions:

1. Create `netlify/functions/` directory
2. Add JavaScript files
3. Deploy automatically

## Performance Optimization

### Image Optimization

- Use modern formats (WebP)
- Compress images
- Use responsive images
- Lazy load images

### Code Splitting

- Already configured in Vite
- Automatic chunk splitting
- Reduces initial bundle size

### Caching Strategy

- Static assets: 1 year cache
- HTML: 1 hour cache
- API responses: Configure in code

## Monitoring & Analytics

### Enable Analytics

1. Go to **Site settings** → **Analytics**
2. Enable Netlify Analytics
3. View traffic and performance data

### Set Up Alerts

1. Go to **Notifications**
2. Configure alerts for:
   - Build failures
   - Deployment issues
   - Performance degradation

## Support & Resources

- **Netlify Docs**: https://docs.netlify.com/
- **Netlify Support**: https://support.netlify.com/
- **Community**: https://community.netlify.com/

## Deployment Checklist

Before deploying:

- [ ] All changes committed and pushed
- [ ] Build succeeds locally (`npm run build`)
- [ ] No console errors
- [ ] Documentation updated
- [ ] Security headers configured
- [ ] Environment variables set
- [ ] Custom domain configured (if applicable)

## Post-Deployment

After deployment:

- [ ] Test all features
- [ ] Check responsive design
- [ ] Verify security headers
- [ ] Monitor performance
- [ ] Check analytics
- [ ] Gather user feedback

## Rollback Procedure

If you need to rollback:

1. Go to **Deploys** tab
2. Find the previous stable deployment
3. Click **"Publish deploy"**
4. Confirm the rollback

The site will be restored to the previous version.

## Continuous Deployment

The repository is configured for continuous deployment:

1. Push to `main` branch
2. GitHub webhook triggers Netlify
3. Netlify builds and deploys automatically
4. Site updates within 2-5 minutes

No manual deployment needed!

---

**Deployment URL**: https://erp-company.netlify.app
**Repository**: https://github.com/Mostafa-SAID7/ERP-Company
**Status**: ✅ Ready for Production

**We3DS** - Enterprise Solutions
