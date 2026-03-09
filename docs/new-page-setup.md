# New Page Setup Checklist (EN/NO)

Use this guide whenever you add a new unique page (for example `contact`, `shop`, `events-landing`).

This project uses:

- singleton page content in `src/_data/*.yml`
- route templates in `src/` and `src/no/`
- navigation labels/routes from `src/content/routes/*.md`

## 1) Create data file for page content

Create a file in `src/_data/`, for example:

- `src/_data/contact.yml`

For i18n `single_file`, use this shape:

```yml
title:
  en: Contact
  no: Kontakt
intro:
  en: Reach out for collaborations.
  no: Ta kontakt for samarbeid.
body:
  en: Write your message here.
  no: Skriv meldingen din her.
```

Notes:

- Use `field.en` and `field.no` for translatable fields.
- For shared values (e.g. image path), both locales can use same value.

## 2) Add CMS config entry for that page

Edit `src/admin/config.yml` in the `pages` collection (`files:` list), add a new file entry:

- `label`: editor-facing name
- `name`: unique id
- `file`: your new data file
- `i18n: true`
- define fields, usually with `i18n: true`

Example fields:

- `title` (`string`, `i18n: true`)
- `intro` (`text`, `i18n: true`)
- `body` (`markdown`, `i18n: true`)

If a field should be same in both locales (e.g. one shared image):

- use `i18n: duplicate`

## 3) Create shared page partial

Create:

- `src/_includes/components/pages/contact-content.hbs`

Pattern:

```hbs
{{#with (localize contact lang) as |contact_data|}}
  <section class="layout-container page-placeholder">
    <h1>{{contact_data.title}}</h1>
    <p>{{contact_data.intro}}</p>
    <p>{{contact_data.body}}</p>
  </section>
{{/with}}
```

## 4) Create EN route template

Create:

- `src/contact.hbs`

```hbs
---
layout: layouts/base.hbs
title: Contact
lang: en
---

{{> components/pages/contact-content}}
```

## 5) Create NO route template

Create:

- `src/no/contact.hbs`

```hbs
---
layout: layouts/base.hbs
title: Kontakt
lang: no
permalink: /no/contact/
---

{{> components/pages/contact-content}}
```

Notes:

- EN route usually resolves from filename (`/contact/`).
- NO route should explicitly be under `/no/...`.

## 6) Add navigation route entry

Create or edit an entry in:

- `src/content/routes/*.md`

Shape:

```md
---
en:
  title: Contact
  route_en: /contact/
  route_no: /no/contact/
no:
  title: Kontakt
  route_en: /contact/
  route_no: /no/contact/
---
```

Notes:

- Always use leading and trailing slashes.
- Keep `route_no` matching the actual NO template permalink.

## 7) (Optional) Add page-specific SCSS

If page has unique styling:

- create `src/scss/pages/_contact.scss`
- import in `src/scss/styles.scss`:
  - `@use "pages/contact";`

If styles are component-specific:

- keep SCSS next to component under `src/_includes/components/...`

## 8) Verify locally

1. Run `npm run dev`
2. Open:
   - EN page route (`/contact/`)
   - NO page route (`/no/contact/`)
3. Open `/admin`, edit page content in EN and NO, publish.
4. Confirm nav shows label and links to correct EN/NO routes.
5. Click language toggle and verify route mapping.

## 9) Common mistakes

- Route missing leading/trailing slash:
  - wrong: `contact`
  - right: `/contact/`

- NO route mismatch:
  - nav points `/no/contact/` but template outputs different permalink.

- Fields blank in CMS:
  - field missing `i18n` configuration.
  - data file shape not using `en`/`no` for translatable fields.

- Data disappears in template inside `with`/`each`:
  - use `@root.*` for globals (`@root.i18n`, `@root.collections`, etc.).
