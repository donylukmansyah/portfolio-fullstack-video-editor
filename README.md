# Portfolio - Fullstack Video Editor

A modern, dynamic portfolio website designed for a video editor, showcasing projects, skills, and professional experience. Built as a complete fullstack application with a secure admin dashboard for content management.

## 🚀 Features

- **Project Showcase**: Beautifully crafted portfolio cards to display video editing and image projects.
- **Filtering System**: Multi-level filtering (Main Category -> Sub-Category) to easily navigate through different types of content.
- **Neobrutalism Design**: Trendy and engaging UI with modern design aesthetics, including dynamic animations, hover effects, and a custom scrollbar.
- **Admin Dashboard**: Secure backend portal to manage portfolio items, categories, and view contact messages.
- **Responsive Layout**: Fully responsive design ensuring a seamless experience across desktop, tablet, and mobile devices.
- **Social Sharing**: Built-in share links with polished UI and copy-to-clipboard functionality.
- **Contact System**: Built-in contact form with rate-limiting and device fingerprinting.

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (v4) / Neobrutalism theme
- **Database:** PostgreSQL (Supabase)
- **ORM:** Prisma
- **Authentication:** Better Auth
- **Validation:** Zod
- **Components:** shadcn/ui & Radix UI

## 💻 Getting Started

### Prerequisites

- Node.js 20+
- A Supabase account (for database and storage)
- PostgreSQL database

### 1. Clone & Install

```bash
npm install
# or
pnpm install
```

### 2. Environment Variables

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Fill in the required variables:
- `DATABASE_URL` and `DIRECT_URL`: Your Supabase PostgreSQL connection strings.
- `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`: From your Supabase project settings.
- `SUPABASE_SERVICE_ROLE_KEY`: For backend storage operations.
- `BETTER_AUTH_SECRET`: A 32-character random string.
- `BETTER_AUTH_URL`: `http://localhost:3000` (change for production).
- `NEXT_PUBLIC_SITE_URL`: Your production URL.
- `ADMIN_EMAIL` and `ADMIN_PASSWORD`: Credentials for the initial admin account.

### 3. Database Setup

Generate the Prisma client and push the schema to your database:

```bash
npx prisma generate
npx prisma db push
```

### 4. Run Development Server

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
The admin dashboard is available at `/admin`.

## ☁️ Deployment (Vercel)

This application is optimized for deployment on Vercel's Hobby (Free) tier:

1. Push your code to GitHub/GitLab.
2. Import the project in Vercel.
3. Add all the environment variables from your `.env` file to the Vercel project settings.
4. Update `BETTER_AUTH_URL` and `NEXT_PUBLIC_SITE_URL` to match your Vercel domain.
5. Deploy! The `postinstall` script will automatically generate the Prisma client during the build process.

*Note: Image optimization limits are configured to stay within Vercel's 5,000 monthly transformations quota.*

## ✨ Author

**Dony Lukmansyah**

- GitHub: [@donylukmansyah](https://github.com/donylukmansyah)
