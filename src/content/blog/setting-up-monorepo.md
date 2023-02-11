---
  postSlug: setting-up-monorepo
  title: Setting up a sveltekit monorepo
  description: What I learned and found when setting up a monorepo for mesh
  tags: 
    - mesh
  pubDate: February 11, 2023
  updatedDate: February 11, 2023
---

After trying to create schoolmesh for a better part of year, I decided that a monorepo would be the ideal structure for my new attempt at it. And turns out I was correct. My eventual plan for this project is to create multiple apps for each individiual feature, so it is more versatile than just the one app. And monorepos are exactly the structure I need for this.

## Benefits

- Allows me to create individual nicely reusable components
- Also they are nicely documented thanks to histoire
- Share some parts of the bussines logic
- Share configs

## How do I go about it?

At the heart of my monorepo is [TurboRepo](https://turbo.buil) and [PNPM workspace](https://pnpm.io). And then it's just a whole bunch of packages, like a whole bunch of packages.

## Project structure

```bash
├── apps
│   ├── account
│   └── school
├── backend
│   ├── migrations
│   └── pb_data
└── packages
    ├── components
    ├── eslint-config-custom
    ├── i18n
    ├── pocketbase
    ├── styles
    └── utils
```

### `apps` directory

Pretty much self describing directory, you put all your apps here. I put my SvelteKit apps here, but I have also experimented with putting an Astro webiste, which I planned to use as a Landing page, and it still worked nicely.

### `backend` directory

Also self describing directory, I have my GO backend here, I keep it here because the backend is just one file and it nicely allows me to run the development server in one VSCode terminal, instead of having two VSCode windows open.

### `packages` directory

All the code that I want shared accros apps I put here. The biggest package is definetely `components`, where I have [Histoire](https://histoire.dev) set-up, and I develop all my components there in isolation.

Then `i18n` is used for translations, for that I use [typesafe-i18n](https://github.com/ivanhofer/typesafe-i18n), so far it's great. I could propably save a few bytes by shipping the translations used only for the specific application, but more often than not I see myself re-using translations, and it's just a few bytes, I ship way more Javascript than this.

`pocketbase` directory holds some utility functions for pocketbase, but since switching from firebase to pocketbase I find myself using this folder less, and writing more of code inside the app itself, since I don't need to re-use this stuff often, and it's easier.

`styles` is for [TailwindCSS](https://tailwindcss.com), I put my base tailwind config here, and base `global.css` styles. It allows me to share tailwind config accros my applications and then just extend it, for special purposes.

The `utils` folder, I try to not to put much stuff here, because I usually find I have a better package for it. The one useful file I have is `urls.ts`. It exports all the various URLs, so I don't need to hardcode them.

```js
export const schoolmesh = import.meta.env.DEV
  ? "http://localhost:5173"
  : "https://school.mesh.sk";
export const accountmesh = import.meta.env.DEV
  ? "http://localhost:5174"
  : "https://account.mesh.sk";
export const backendmesh = import.meta.env.DEV
  ? "http://127.0.0.1:8090"
  : "https://mesh-backend.fly.dev";
```
