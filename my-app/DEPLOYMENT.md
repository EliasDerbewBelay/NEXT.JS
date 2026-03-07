# Deployment Guide

This guide will help you deploy your Next.js DevEvent application to production.

## Prerequisites

Before deploying, ensure you have:

1. A MongoDB database (MongoDB Atlas recommended)
2. A Cloudinary account for image hosting
3. (Optional) PostHog account for analytics

## Environment Variables

Create a `.env.local` file (for local development) or configure these variables in your deployment platform:

```env
# Required
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Optional (for analytics)
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

### Setting up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Whitelist your IP address (or use 0.0.0.0/0 for all IPs in production)
5. Get your connection string and replace `<username>`, `<password>`, and `<database>`

### Setting up Cloudinary

1. Go to [Cloudinary](https://cloudinary.com)
2. Sign up for a free account
3. Go to Dashboard to find your Cloud Name, API Key, and API Secret
4. Add these to your environment variables

## Deployment Platforms

### Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Add environment variables
6. Deploy!

**Important**: Make sure to set `NEXT_PUBLIC_BASE_URL` to your Vercel deployment URL.

### Netlify

1. Push your code to GitHub
2. Go to [Netlify](https://www.netlify.com)
3. Click "New site from Git"
4. Select your repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Add environment variables
7. Deploy!

### Docker

A `Dockerfile` is included. To deploy with Docker:

```bash
# Build the image
docker build -t devevent .

# Run the container
docker run -p 3000:3000 --env-file .env.local devevent
```

## Pre-Deployment Checklist

- [ ] All environment variables are set
- [ ] MongoDB connection is working
- [ ] Cloudinary credentials are correct
- [ ] `NEXT_PUBLIC_BASE_URL` matches your production URL
- [ ] Run `npm run build` locally to check for TypeScript errors
- [ ] Test the production build locally: `npm run build && npm start`

## Post-Deployment

1. Test the deployed site
2. Check that images load correctly
3. Test event creation and booking
4. Monitor error logs in your deployment platform

## Troubleshooting

### "Blocking navigation" error
This has been fixed by implementing Suspense boundaries. If you still see this error, ensure you're using the latest code.

### Images not loading
- Verify Cloudinary credentials
- Check that `res.cloudinary.com` is in the `remotePatterns` in `next.config.ts`
- Ensure the Cloudinary loader is correctly configured

### Database connection issues
- Verify your MongoDB URI
- Check that your IP is whitelisted in MongoDB Atlas
- Ensure the database user has correct permissions

### Build fails
- Check TypeScript errors: `npm run build`
- Ensure all required dependencies are in `package.json`
- Verify Node.js version matches requirements (18.x or later recommended)

## Performance Optimization

The app includes:
- Server-side caching with `revalidate` options
- API route caching headers
- Suspense boundaries for non-blocking data fetching
- Image optimization via Cloudinary
- Static generation where possible

## Security Notes

- Never commit `.env.local` to version control
- Use environment variables for all secrets
- Keep dependencies updated: `npm audit` and `npm update`
- MongoDB connection uses SSL by default

## Support

If you encounter issues during deployment, check:
1. Your platform's deployment logs
2. Browser console for client-side errors
3. MongoDB connection string format
4. Environment variable spelling and format
