# CHA Portfolio (Eleventy + Handlebars + SCSS + Decap CMS)

## What is already set up

- Eleventy static site generator
- Handlebars templates
- SCSS build pipeline
- Decap CMS admin at `/admin/`
- Decap local backend proxy for local content editing

## Commands

- `npm run dev` starts:
  - Eleventy dev server (`http://localhost:8080`)
  - SCSS watcher
  - Decap local backend (`http://localhost:8081`)
- `npm run build` builds production output to `_site/`

## Do I need to sign up for Decap?

No. Decap CMS itself does not require a Decap account.

You do need:

- A Git provider account (usually GitHub)
- A hosting provider with auth/backend support (recommended: Netlify + Netlify Identity + Git Gateway)

## First-time setup (recommended path)

1. Create a GitHub repository and push this project.
2. Create a Netlify account and import the GitHub repo.
3. In Netlify for this site:
   - Enable **Identity**
   - Enable **Git Gateway**
   - Invite yourself as a user in Identity (email invite)
4. Deploy the site on Netlify.
5. Visit `https://<your-site>.netlify.app/admin/` and log in.

## Local CMS workflow

1. Run `npm run dev`
2. Open `http://localhost:8080/admin/`
3. Edit content in the CMS UI
4. Publish changes to write files locally
5. Commit and push changes to GitHub

## Content model in this repo

- `src/_data/site.yml`: homepage data edited from CMS
- `src/content/projects/*.md`: comic project entries edited from CMS
- `src/admin/config.yml`: Decap CMS configuration

## Language switching and translations

- See detailed guide: `docs/i18n.md`
