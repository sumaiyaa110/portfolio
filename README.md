# Portfolio

A personal portfolio website for an undergraduate student. It presents
education, a learning journey, projects, skills, experience, a blog, a resume
and a contact form, plus a section showing GitHub repositories and activity.

The design direction is a "lab notebook": a narrow reading column, serif
headings, monospace metadata and one accent colour, in light and dark mode.

## Tech stack

| Tool | Used for |
| --- | --- |
| [Next.js 15](https://nextjs.org) (App Router) | Pages, routing, static generation |
| [TypeScript](https://www.typescriptlang.org) | Type-safe code and content |
| [Tailwind CSS 4](https://tailwindcss.com) | Styling |
| [shadcn/ui](https://ui.shadcn.com) | Buttons, form fields, mobile menu |
| [Framer Motion](https://www.framer.com/motion/) | Subtle scroll animations |
| [MDX](https://mdxjs.com) | Blog posts |
| [Vercel](https://vercel.com) | Hosting |

## Local setup

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install
```

```bash
npm run dev
```

Open http://localhost:3000. The page updates as you edit files.

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the development server |
| `npm run build` | Builds the production site (run this before deploying to catch errors) |
| `npm run start` | Serves the production build locally |
| `npm run lint` | Checks the code for common mistakes |

## Make it yours

All content is placeholder text. You only need to edit the files below; no
component changes are required.

| What | Where |
| --- | --- |
| Name, intro, photo, email, social links, GitHub username, interests, goals | `src/data/profile.ts` |
| Education | `src/data/education.ts` |
| Learning journey timeline | `src/data/journey.ts` |
| Skills | `src/data/skills.ts` |
| Projects | `src/data/projects.ts` |
| Research, internships, courses, achievements | `src/data/experience.ts` |
| Resume summary and which projects it lists | `src/data/resume.ts` |
| Blog posts | `content/blog/*.mdx` |
| Navigation items | `src/config/site.ts` |
| Colours and fonts | `src/app/globals.css`, `src/app/layout.tsx` |

Files to add under `public/`:

- `images/profile.jpg`, then set `photo: "/images/profile.jpg"` in `profile.ts`
- `images/projects/<name>.png`, then list the path in that project's `screenshots`
- `resume.pdf`: the "Download PDF" button on the Resume page appears once this file exists

### Writing a blog post

Create `content/blog/my-post.mdx`. The file name becomes the URL (`/blog/my-post`).

```mdx
---
title: "Post title"
description: "One sentence shown in listings and search results."
date: 2026-01-15
category: "Notes"
tags: ["learning", "python"]
draft: false
---

Your post, in Markdown.
```

Reading time, category and tag pages, SEO metadata and the sitemap entry are
generated automatically. Posts with `draft: true` show in development only.

### GitHub section

Set `github.username` in `src/data/profile.ts`. Repositories and recent
activity then load from GitHub's public API with no key. To choose which
repositories appear, list their names in `github.featuredRepos`; otherwise the
most-starred ones are shown. The contribution calendar appears only when
`GITHUB_TOKEN` is set. Data refreshes hourly.

## Environment variables

Environment variables hold settings and secret keys that must not be committed
to Git. All of them are optional: the site builds and runs with none set.

For local development, copy `.env.example` to `.env.local` and fill in the
values you want. `.env.local` is ignored by Git, so your keys stay on your
computer. On Vercel, add the same names in the project settings instead.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Your deployed URL, for SEO links and the sitemap |
| `RESEND_API_KEY` | Lets the contact form send email through [Resend](https://resend.com) |
| `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | Where contact mail goes and who it is from |
| `GITHUB_TOKEN` | Enables the GitHub contribution calendar |

## Project structure

```
content/blog/          MDX blog posts
public/                Images and resume.pdf
src/
  app/                 One folder per page, plus sitemap, robots and social image
  components/
    ui/                shadcn/ui primitives
    layout/            Header, navigation, footer, theme toggle
    shared/            Page header, section, entry rows, tags, icons
    home/ about/ projects/ blog/ github/ resume/ contact/
    motion/            FadeIn scroll animation
  config/site.ts       Navigation and site URL
  data/                All personal content (typed)
  lib/
    blog.ts            Reads and validates MDX posts
    github.ts          GitHub API helper
    seo.ts             Metadata helpers
    actions/contact.ts Contact form server action
    knowledge.ts       All site content as plain text (see below)
  types/content.ts     Types for the data files
```

### Adding an AI assistant later

`src/lib/knowledge.ts` exports `getKnowledgeDocuments()`, which returns every
piece of site content (profile, education, journey, skills, experience,
projects, blog posts) as plain text with the page it belongs to. Nothing uses
it yet. A future "Ask Me" feature can chunk and embed those documents in a
build script and add an API route, without touching the existing pages.

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. Sign in at [vercel.com](https://vercel.com) with your GitHub account.
3. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
   Vercel detects Next.js automatically, so leave the build settings as they are.
4. Click **Deploy**. After a minute or two you get a URL such as
   `https://your-project.vercel.app`.
5. In the Vercel project, open **Settings > Environment Variables**, set
   `NEXT_PUBLIC_SITE_URL` to that URL, and add any other variables you want.
   Then open **Deployments** and redeploy so the new values take effect.

After this, every push to the `main` branch deploys automatically, and pull
requests get their own preview URL.

To use your own domain, add it under **Settings > Domains** in Vercel and
update `NEXT_PUBLIC_SITE_URL` to match.
