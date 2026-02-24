# WriteCraft Frontend

Modern blogging platform web application built with **Next.js 16**, **React 19**, and **TypeScript**. A professional, responsive interface for reading, creating, and sharing blog posts.

## 📋 Prerequisites

- **Node.js** 18+ and **npm** or **yarn**
- **Backend API** running (see [backend README](../backend/README.md))
- **Modern web browser** (Chrome, Firefox, Safari, Edge)

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the project root:

```bash
# API Configuration (Required)
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### 3. Start the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 📚 Available Scripts

```bash
# Development
npm run dev              # Start dev server with hot reload

# Production
npm run build            # Build for production
npm run start            # Start production server

# Code Quality
npm run lint             # Run ESLint
```

## 🏗️ Project Structure

```
src/
├── app/                              # Next.js app directory
│   ├── globals.css                   # Global styles
│   ├── layout.tsx                    # Root layout
│   ├── page.tsx                      # Homepage
│   ├── login/                        # Login page
│   ├── register/                     # Registration page
│   ├── feed/                         # Blog feed page
│   ├── blog/[slug]/                  # Blog detail page
│   └── (protected)/                  # Protected routes
│
├── components/
│   ├── common/                       # Shared components
│   │   ├── navbar.tsx                # Navigation bar
│   │   └── footer.tsx                # Footer
│   ├── pages/                        # Page-specific components
│   └── ui/                           # UI components (shadcn)
│
├── features/                         # Feature modules
│   ├── auth/                         # Authentication
│   ├── blogs/                        # Blog functionality
│   ├── comments/                     # Comments feature
│   ├── likes/                        # Likes feature
│   └── feed/                         # Feed functionality
│
├── hooks/                            # Custom React hooks
├── lib/
│   ├── api-client.ts                 # Axios API client
│   └── utils.ts                      # Utility functions
├── providers/
│   └── react-query-provider.tsx      # React Query setup
├── store/
│   └── auth.store.ts                 # Zustand auth store
└── types/
    ├── api.types.ts                  # API type definitions
    └── global.d.ts                   # Global types
```

## 🎨 Features

### User Authentication

- **Register** - Create new account with email and password
- **Login** - Access your account securely
- **Protected Routes** - Some features require authentication
- **User Profiles** - View and edit your profile

### Blog Management

- **Create Blogs** - Write and publish blog posts
- **Edit Blogs** - Modify existing posts
- **Delete Blogs** - Remove your posts
- **View Blogs** - Read blogs from the community

### Interactions

- **Like Posts** - Show appreciation for great content
- **Comment** - Engage in discussions
- **View Engagement** - See likes and comments count

### Discovery

- **Explore Feed** - Discover blogs from the community
- **Search** - Find blogs by title or author
- **Sorting** - View latest or most popular posts
- **Pagination** - Browse through content easily

### Design Features

- **Responsive Design** - Works on all devices
- **Dark Mode** - Comfortable reading in any lighting
- **Modern UI** - Clean, professional interface
- **Fast Loading** - Optimized performance

## 🔧 Technology Stack

### Frontend Framework

- **Next.js 16** - App Router, Server Components, API Routes
- **React 19** - Latest React features
- **TypeScript** - Type-safe code

### Styling

- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **Lucide Icons** - Beautiful icon library

### State Management

- **Zustand** - Simple store for auth state
- **React Query** - Server state management and caching

### Forms & Validation

- **React Hook Form** - Efficient form handling
- **Zod** - TypeScript-first schema validation

### Data Management

- **Axios** - HTTP client for API calls
- **date-fns** - Date formatting and manipulation

### Other Libraries

- **next-themes** - Dark mode support
- **sonner** - Toast notifications
- **jwt-decode** - JWT token parsing

## ⚖️ Key Decisions & Tradeoffs

The frontend focuses on **performance, developer experience, maintainability, and scalability for a modern SaaS-style blogging platform** while keeping complexity manageable for rapid iteration.

---

### Framework — Next.js App Router

The application uses **Next.js App Router** to leverage Server Components, optimized routing, and production-ready performance features.

**Pros**

- Server Components reduce client bundle size.
- Built-in routing and layouts simplify page organization.
- SEO-friendly rendering through hybrid SSR/CSR support.

**Tradeoffs**

- Requires understanding server vs client component boundaries.
- Some ecosystem libraries still primarily target traditional SPA setups.

Traditional SPA frameworks were avoided to benefit from SEO and performance optimizations.

---

### Component Architecture — Feature-Based Structure

Features are grouped into domains such as `auth`, `blogs`, `comments`, and `feed`.

**Pros**

- Improves scalability as features grow.
- Easier ownership boundaries for teams.
- Logic, hooks, and schemas remain colocated.

**Tradeoffs**

- Slightly more upfront organization compared to flat component structures.
- Requires discipline to avoid cross-feature coupling.

---

### State Management — Zustand + React Query

The application separates **client UI state** and **server data state**.

- Zustand → authentication and UI state.
- React Query → server caching and async API data.

**Pros**

- Lightweight global state management.
- Automatic caching, retries, and background refetching.
- Reduces manual loading/error handling boilerplate.

**Tradeoffs**

- Developers must understand differences between local and server state.
- Slight learning curve compared to single-store solutions.

Redux was avoided to reduce boilerplate and complexity.

---

### Data Fetching — React Query

Server data is handled using React Query.

**Pros**

- Built-in caching improves perceived performance.
- Automatic request deduplication.
- Background synchronization keeps UI fresh.

**Tradeoffs**

- Requires query key discipline.
- Additional abstraction over direct API calls.

Direct Axios-only fetching was avoided due to manual cache management overhead.

---

### Styling — Tailwind CSS + shadcn/ui

Tailwind CSS provides utility-first styling combined with shadcn/ui components.

**Pros**

- Rapid UI development.
- Consistent design system.
- Easy dark mode support.

**Tradeoffs**

- Utility classes can become verbose.
- Requires familiarity with Tailwind conventions.

Traditional CSS frameworks were avoided to reduce global style conflicts.

---

### Form Management — React Hook Form + Zod

Forms use React Hook Form integrated with Zod validation schemas.

**Pros**

- Minimal re-renders improve performance.
- Shared validation logic between frontend and backend.
- Strong TypeScript inference.

**Tradeoffs**

- Schema setup adds initial development overhead.
- Requires understanding resolver patterns.

---

### Authentication Strategy — JWT Client Storage

JWT tokens are stored client-side and attached to API requests through Axios interceptors.

**Pros**

- Simple integration with backend stateless authentication.
- Works well for SPA-style interactions.

**Tradeoffs**

- Requires careful handling against XSS risks.
- Token expiration handling must be managed.

HTTP-only cookie sessions may be considered in future iterations for stronger browser security.

---

### API Communication — Centralized Axios Client

All API communication passes through a shared Axios instance.

**Pros**

- Centralized error handling.
- Automatic authentication headers.
- Easier debugging and logging.

**Tradeoffs**

- Requires interceptor maintenance when APIs evolve.

---

### Rendering Strategy — Hybrid Client + Server Rendering

The application uses a mix of server and client rendering.

**Pros**

- Faster initial page loads.
- Improved SEO for public content.
- Reduced JavaScript shipped to users.

**Tradeoffs**

- Requires awareness of server-only APIs.
- Debugging hydration mismatches can be complex.

---

### Deployment Strategy

Optimized for deployment on platforms like Vercel but supports Docker and self-hosted environments.

**Pros**

- Flexible hosting options.
- Easy CI/CD integration.

**Tradeoffs**

- Environment configuration must remain consistent between environments.

## 🔌 API Configuration

The frontend communicates with the backend API:

```
API Base URL: http://localhost:3001/api
```

### Key API Endpoints

**Authentication**

- `POST /auth/register` - Register user
- `POST /auth/login` - Login user
- `POST /auth/logout` - Logout user

**Blogs**

- `GET /blogs` - List all blogs
- `GET /blogs/:slug` - Get single blog
- `POST /blogs` - Create blog
- `PATCH /blogs/:id` - Update blog
- `DELETE /blogs/:id` - Delete blog

**Comments**

- `GET /comments/blog/:blogId` - Get blog comments
- `POST /comments` - Create comment
- `DELETE /comments/:id` - Delete comment

**Likes**

- `POST /likes` - Like/unlike blog
- `GET /likes/blog/:blogId` - Get likes count

**Users**

- `GET /users/:id` - Get user profile
- `PATCH /users/:id` - Update profile

## 🎯 Component Overview

### Pages

**Home** (`/`)

- Hero section
- Statistics
- Featured blogs
- Call-to-action

**Feed** (`/feed`)

- Search blogs
- Filter by author
- Sort (latest, popular)
- Infinite scroll

**Blog Detail** (`/blog/[slug]`)

- Full blog content
- Author information
- Like/comment section
- Related posts

**Login** (`/login`)

- Email/password form
- Error handling
- Redirect to home on success

**Register** (`/register`)

- User signup form
- Validation
- Auto-login after signup

### Components

**Navbar**

- Logo and branding
- Navigation links
- Auth buttons
- Mobile menu
- User profile dropdown

**Footer**

- Links (explore, community)
- Social media
- Copyright info
- Quick navigation

**Blog Cards**

- Author info
- Title and summary
- Engagement metrics
- Quick read time

## 🔐 Authentication

### How It Works

1. **Register** - User creates account
2. **Login** - User receives JWT token
3. **Store Token** - Token saved in localStorage
4. **Include Token** - Token sent in headers for protected requests
5. **Protected Routes** - Components check auth state

### Auth State Management

Uses Zustand store at `src/store/auth.store.ts`:

```typescript
useAuthStore.getState().isAuthenticated;
useAuthStore.getState().user;
useAuthStore.getState().logout();
```

## 📝 Form Handling

All forms use React Hook Form with Zod validation:

**Example:**

```tsx
const { register, handleSubmit } = useForm({
  resolver: zodResolver(schema),
});
```

See feature schemas at `src/features/*/[feature].schema.ts`

## 🌐 Internationalization (Placeholder)

Currently supports English. Structure ready for i18n expansion.

## 🧪 Code Quality

```bash
npm run lint
```

Uses:

- **ESLint** for code linting
- **TypeScript** for type safety
- **Prettier** (formatting via editor)

## 🚀 Production Build

### Build

```bash
npm run build
```

Creates optimized production build in `.next/` directory.

### Start

```bash
npm start
```

Starts the production server (requires `.env.local` configuration).

## 🌍 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Connect repository
4. Add `NEXT_PUBLIC_API_URL` environment variable
5. Deploy!

### Docker

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

Build and run:

```bash
docker build -t writecraft-frontend .
docker run -p 3000:3000 -e NEXT_PUBLIC_API_URL=http://api:3001/api writecraft-frontend
```

### Self-hosted

```bash
npm install
npm run build
npm start
```

Ensure `NEXT_PUBLIC_API_URL` points to your backend.

## 🐛 Troubleshooting

### "Cannot find module" errors

```bash
rm -rf node_modules .next
npm install
```

### API connection issues

- Verify backend is running on port 3001
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Check browser console for network errors

### Build errors

```bash
npm run lint
```

Fix any TypeScript or ESLint errors.

### Performance issues

- Clear `.next` folder: `rm -rf .next`
- Clear browser cache
- Check React DevTools for unnecessary re-renders

## 🎨 Styling

### Tailwind CSS

Classes use Tailwind utilities. Common patterns:

```tsx
<div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
```

### Dark Mode

Automatically supported via `next-themes`. Toggle in theme switcher.

### Custom Components

shadcn/ui components located in `src/components/ui/`

Add new components:

```bash
npx shadcn-ui@latest add [component-name]
```

## 🔗 API Client

Centralized Axios client at `src/lib/api-client.ts`:

```typescript
import { apiClient } from "@/lib/api-client";

const response = await apiClient.get(`/blogs?page=1`);
```

Handles:

- Base URL configuration
- Authentication headers
- Error handling
- Request/response interceptors

## 📚 Hooks

### Custom Hooks

Located in `src/hooks/` and `src/features/*/[feature].hooks.ts`

**Example Usage:**

```typescript
const { data, isLoading } = useFeed(page, limit);
```

## 🎯 Best Practices

- Use TypeScript for type safety
- Follow naming conventions (camelCase for files)
- Keep components small and focused
- Use custom hooks for logic
- Validate all forms with Zod
- Handle loading and error states
- Use React Query for caching

## 📄 License

Unlicensed - All rights reserved.

## 🔗 Links

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind Docs](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [React Query Docs](https://tanstack.com/query/latest)
