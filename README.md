# Phrasly - AI Writing Assistant

A modern AI writing assistant tool that helps users enhance their writing with AI-powered features.

## Prerequisites

- Node.js (Latest LTS version recommended)
- npm (comes with Node.js)
- Git (for cloning the repository)

## Getting Started

### 1. Clone the Repository

```bash
git clone [repository-url]
# or download and extract the ZIP file
```

### 2. Environment Setup

Create a `.env` file in the root directory and add the following environment variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
DATABASE_URL=your_database_url
DIRECT_URL=your_direct_url

# Strapi Configuration
NEXT_PUBLIC_STRAPI_API_URL=your_strapi_api_url
NEXT_PUBLIC_STRAPI_API_TOKEN=your_strapi_api_token

# Undetectable AI Configuration
NEXT_PUBLIC_UNDETECTABLE_API_URL=your_undetectable_api_url
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Database Setup

Run the following Prisma commands to set up your database:

```bash
npx prisma migrate deploy
npx prisma generate
npx prisma migrate status
```

### 5. Build and Run

Build the application:
```bash
npm run build
```

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Features

- AI-powered writing assistance
- User authentication
- AI text detection
- Content management via Strapi
- Database management with Prisma and Supabase

## Tech Stack

- Next.js
- Supabase
- Strapi CMS
- Prisma ORM
- Undetectable AI API

## Project Structure

- `/src` - Source code
- `/public` - Static assets
- `/prisma` - Database schema and migrations
"# ai-detection-tool" 
"# ai-detection-tool" 
