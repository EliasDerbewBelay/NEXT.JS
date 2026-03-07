# DevEvent 🎯

> The Hub for Every Dev Event You Can't Miss

A modern, full-stack event management platform built with Next.js 16, designed specifically for developer communities to discover, create, and book technical events including hackathons, meetups, and conferences.

[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.1-green?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

## ✨ Features

### Core Functionality
- 🎪 **Event Discovery** - Browse curated developer events with advanced filtering
- 📝 **Event Creation** - Easy-to-use interface for organizing events
- 🎫 **Event Booking** - Simple registration system with email confirmation
- 🔍 **Smart Recommendations** - AI-powered similar event suggestions based on tags
- 📱 **Responsive Design** - Seamless experience across all devices

### Technical Highlights
- ⚡ **Server-Side Rendering (SSR)** - Lightning-fast page loads with Next.js App Router
- 🔄 **Incremental Static Regeneration (ISR)** - Automatic cache revalidation (5-30 min)
- 🎨 **Dark/Light Mode** - Elegant theme switching with next-themes
- 🖼️ **Optimized Images** - Direct CDN delivery via Cloudinary
- 📊 **Analytics Ready** - PostHog integration for user insights
- ♿ **Accessible** - WCAG 2.1 compliant components
- 🛡️ **Type-Safe** - Full TypeScript coverage with strict mode

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.x or later
- **npm** or **pnpm** or **yarn**
- **MongoDB** database (local or Atlas)
- **Cloudinary** account (for image hosting)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/EliasDerbewBelay/NEXT.JS.git
   cd NEXT.JS/my-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/devevent?retryWrites=true&w=majority
   
   # Base URL (use http://localhost:3000 for development)
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   
   # Cloudinary Configuration
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   
   # Optional: PostHog Analytics
   NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
   NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
   ```
   
   > See `.env.example` for detailed setup instructions

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
my-app/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   └── events/               # Event endpoints
│   │       ├── route.ts          # GET, POST /api/events
│   │       └── [slug]/
│   │           └── route.ts      # GET /api/events/:slug
│   ├── event/                    # Event pages
│   │   └── [slug]/
│   │       ├── page.tsx          # Event detail page
│   │       └── loading.tsx       # Loading skeleton
│   ├── page.tsx                  # Home page
│   ├── layout.tsx                # Root layout
│   ├── loading.tsx               # Global loading state
│   ├── error.tsx                 # Error boundary
│   └── not-found.tsx             # 404 page
├── components/                   # React components
│   ├── cards/
│   │   └── EventCard.tsx         # Event card component
│   ├── layouts/
│   │   └── Navbar.tsx            # Navigation bar
│   ├── BookEvent.tsx             # Booking form
│   ├── ExploreBtn.tsx            # Explore button
│   └── ModeToggle.tsx            # Theme switcher
├── database/                     # Database models
│   ├── event.model.ts            # Event schema
│   ├── booking.model.ts          # Booking schema
│   └── index.ts                  # Model exports
├── lib/                          # Utilities
│   ├── actions/                  # Server actions
│   │   ├── actions.ts            # Event actions
│   │   └── booking-action.ts    # Booking actions
│   ├── mongodb.ts                # Database connection
│   ├── cloudinary-loader.ts     # Image loader
│   ├── utils.ts                  # Helper functions
│   └── constants.ts              # App constants
├── provider/
│   └── theme-provider.tsx        # Theme context
├── public/                       # Static assets
│   ├── icons/                    # SVG icons
│   ├── logo/                     # Brand assets
│   └── events/                   # Event images
├── next.config.ts                # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS config
├── tsconfig.json                 # TypeScript config
└── package.json                  # Dependencies
```

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server at http://localhost:3000 |
| `npm run build` | Build optimized production bundle |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint for code quality checks |

## 🎨 Tech Stack

### Frontend
- **Framework:** [Next.js 16](https://nextjs.org/) - React framework with App Router
- **Language:** [TypeScript 5](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/) - Utility-first CSS
- **UI Components:** Custom components with [Radix UI](https://www.radix-ui.com/) primitives
- **Icons:** [Lucide React](https://lucide.dev/) - Beautiful icon library
- **Theme:** [next-themes](https://github.com/pacocoursey/next-themes) - Dark mode support

### Backend
- **Database:** [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/) ODM
- **Image Storage:** [Cloudinary](https://cloudinary.com/) - Cloud media management
- **API:** Next.js API Routes with RESTful design

### DevOps & Tools
- **Deployment:** [Vercel](https://vercel.com/) - Optimized for Next.js
- **Analytics:** [PostHog](https://posthog.com/) (optional) - Product analytics
- **Version Control:** Git & GitHub
- **Package Manager:** npm/pnpm/yarn

## 🌐 API Endpoints

### Events

#### Get All Events
```http
GET /api/events
```
**Response:** `{ message: string, events: Event[] }`

**Cache:** 5 minutes with stale-while-revalidate

#### Get Event by Slug
```http
GET /api/events/:slug
```
**Response:** `{ message: string, event: Event }`

**Cache:** 30 minutes with stale-while-revalidate

#### Create Event
```http
POST /api/events
Content-Type: multipart/form-data
```
**Body:** Form data with event details and image file

**Response:** `{ message: string, event: Event }`

### Bookings

Server actions in `lib/actions/booking-action.ts`:
- `createBooking(data: { eventId: string, email: string })`

## 🎯 Key Features Explained

### 1. Performance Optimization

**Incremental Static Regeneration (ISR)**
- Home page revalidates every 5 minutes
- Event detail pages revalidate every 30 minutes
- Ensures fresh content without sacrificing performance

**Image Optimization**
- Custom Cloudinary loader for direct CDN delivery
- Automatic format conversion (WebP, AVIF)
- Responsive image sizing with `next/image`

**Caching Strategy**
- API routes use `Cache-Control` headers
- Stale-while-revalidate for instant responses
- Database query optimization with lean queries

### 2. User Experience

**Loading States**
- Skeleton loaders for async content
- Suspense boundaries prevent blocking
- Smooth transitions and animations

**Error Handling**
- Global error boundary for graceful failures
- Custom 404 page for better UX
- User-friendly error messages

**Accessibility**
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader friendly

### 3. Developer Experience

**Type Safety**
- Strict TypeScript configuration
- Type-safe database schemas with Mongoose
- Inferred types for API responses

**Code Quality**
- ESLint configuration for consistent code
- Component-based architecture
- Separation of concerns (UI/Logic/Data)

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your repository

3. **Configure Environment Variables**
   Add all variables from `.env.example` in Vercel dashboard

4. **Deploy!**
   Vercel will automatically build and deploy your app

### Deploy to Other Platforms

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions for:
- Netlify
- Docker
- Custom servers

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | ✅ |
| `NEXT_PUBLIC_BASE_URL` | Application base URL | ✅ |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | ✅ |
| `CLOUDINARY_API_KEY` | Cloudinary API key | ✅ |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | ✅ |
| `NEXT_PUBLIC_POSTHOG_KEY` | PostHog project key | ❌ |
| `NEXT_PUBLIC_POSTHOG_HOST` | PostHog host URL | ❌ |

## 📝 Database Schema

### Event Model
```typescript
{
  title: string;           // Event title
  slug: string;            // URL-friendly slug (auto-generated)
  description: string;     // Short description
  overview: string;        // Detailed overview
  image: string;           // Cloudinary URL
  venue: string;           // Venue name
  location: string;        // Location/address
  date: string;            // YYYY-MM-DD format
  time: string;            // HH:MM 24-hour format
  mode: "online" | "offline" | "hybrid";
  audience: string;        // Target audience
  agenda: string[];        // Event agenda items
  organizer: string;       // Organizer info
  tags: string[];          // Event tags for categorization
  createdAt: Date;
  updatedAt: Date;
}
```

### Booking Model
```typescript
{
  eventId: ObjectId;       // Reference to Event
  email: string;           // Attendee email
  createdAt: Date;
}
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Elias Derbew Belay**

- GitHub: [@EliasDerbewBelay](https://github.com/EliasDerbewBelay)
- Repository: [NEXT.JS](https://github.com/EliasDerbewBelay/NEXT.JS)

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB University](https://university.mongodb.com/)
- [Vercel Platform](https://vercel.com/)

---

**Built with ❤️ using Next.js and TypeScript**

For deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)  
For production fixes and optimizations, see [PRODUCTION_FIXES.md](./PRODUCTION_FIXES.md)
