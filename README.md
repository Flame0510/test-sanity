# Sanity + Next.js 15 Boilerplate

A production-ready starter template integrating **Sanity CMS** (headless) with **Next.js 15 App Router**.

## ⚡ Features

- ✅ Next.js 15 with App Router
- ✅ TypeScript for type safety
- ✅ Tailwind CSS for styling
- ✅ Sanity CMS integration
- ✅ `@sanity/client` for headless queries
- ✅ GROQ query support
- ✅ Dynamic content rendering
- ✅ Error handling & loading states

## 📋 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/Flame0510/test-sanity.git
cd test-sanity
npm install
```

### 2. Set Up Sanity Project

If you don't have a Sanity project:
1. Sign up at [sanity.io](https://www.sanity.io)
2. Create a new project
3. Note your **Project ID**, **Dataset name**, and create an **API Token**

### 3. Configure Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your Sanity credentials:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token
```

⚠️ **Important:** Never commit `.env.local` — it contains secrets!

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Add Test Content

To see the app work:

1. Open Sanity Studio (usually `https://your-project.sanity.studio`)
2. Create a new "Page" document
3. Add a title and body content
4. Publish the document
5. Refresh [http://localhost:3000](http://localhost:3000)

## 🗂️ Project Structure

```
test-sanity/
├── app/
│   ├── page.tsx              # Home page (client component)
│   └── layout.tsx
├── lib/
│   └── sanity.ts             # Sanity client & query functions
├── sanity/
│   ├── schemaTypes/
│   │   ├── page.ts           # Page document schema
│   │   └── index.ts
│   └── config.ts             # Sanity Studio config (not in Next.js)
├── .env.example              # Environment template
├── .env.local                # Your secrets (git-ignored)
├── sanity.config.ts          # Sanity configuration
├── tsconfig.json
├── tailwind.config.ts
└── package.json
```

## 📘 Schema Reference

### Page Document Type

```typescript
{
  _id: string
  title: string (required)
  body: string (required)
}
```

## 🚀 Deployment

### Deploy to Vercel

1. Push your repo to GitHub
2. Connect to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `SANITY_API_TOKEN`
4. Deploy!

```bash
vercel env add NEXT_PUBLIC_SANITY_PROJECT_ID
vercel env add NEXT_PUBLIC_SANITY_DATASET
vercel env add SANITY_API_TOKEN
vercel deploy
```

## 📦 Available Scripts

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
```

## 🔗 API Endpoints

The app uses GROQ queries via `@sanity/client`:

- **`fetchPages()`** - Fetch all pages
- **`fetchPage(id)`** - Fetch a specific page by ID

See `lib/sanity.ts` for implementation.

## 🛠️ Troubleshooting

### "Failed to load pages" Error

1. Verify `.env.local` exists with correct credentials
2. Check that your Sanity project is active
3. Ensure the API token has read permissions
4. Confirm the dataset name matches your Sanity project

### Empty Pages

1. Create a new "Page" document in Sanity
2. Fill in title and body fields
3. Publish the document
4. Wait a few seconds and refresh the page

### Build Errors

Run `npm run build` to check for TypeScript errors:

```bash
npm run build
```

## 📚 Learn More

- [Sanity Documentation](https://www.sanity.io/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Tailwind CSS](https://tailwindcss.com)

## 🎓 Next Steps

- Add more document types in `sanity/schemaTypes/`
- Create dynamic routes (e.g., `app/pages/[slug]/page.tsx`)
- Add image fields to schema
- Implement caching strategies
- Add authentication

## 📄 License

MIT

---

**Created with ❤️ for testing Sanity + Next.js integration**
