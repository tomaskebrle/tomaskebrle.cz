---
  postSlug: setting-up-monorepo-for-mesh
  title: Setting up a monorepo for mesh
  description: What I learned and found when setting up a monorepo for mesh
  tags: 
    - mesh
  pubDate: February 13, 2023
  updatedDate: February 13, 2023
---

After trying to create schoolmesh for a better part of year, I decided that I need a way to be able to colocate my code more together and that I need a way tie the apps I am developing together. Turns the thing I wanted is a monorepo would be the ideal structure for my new attempt at it. And since it's been a year since I first started working on this project I wanted to share how it helped with building my app and how it could help you. I've also found out and learned a lout about monorepos, so I decided I would help people new to this project by creating guides on how to set it up which you can find [here](/tags/monorepo).

## Table of contents

## What are the benefits?

The main benefit for me is the reusability of all the stuff I create. Even though I currently have only two applications, I plan on expanding the project, and even with only two apps I can see how it will help in the future. I can easily create components, and thanks to the power tailwind config they are automatically themed based on the application they are currently running in.

Even though that putting all your code into one repository doesn't sound really clean, I think it actually cleaned up my codebase a lot. Instead of all the reusable stuff living in the `lib` folder, they are now individial packages, which also cleaned up my imports by a lot, even at the cost of having to export everything in barrel `index.ts` files.

Another great thing is that it allows me to share code between different frameworks. For example I can use Sveltekit for the heavy apps, and have a documentation site, or the landing page built with astro, for better performance.

And the last thing is ease of use, instead of having to open each seperate app in it's own window, and run them all I can just do `pnpm run dev`, and everything starts automatically.

## How do I go about it?

At the heart of my monorepo is [TurboRepo](https://turbo.build) and [PNPM workspace](https://pnpm.io). TurboRepo is great because it automatically caches thing that haven't changed and it makes everything faster. And pnpm is also useful because it creates symlinks for node_modules saving quite a lot of disk space. And also it's faster and who would'nt want more performance for free?

### How does my monorepo look like?

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

#### `apps` directory

The apps direcotry is surprisingly for apps. Everything that eventually gets deployed goes here.

#### `backend` directory

Self describing directory, I have my GO backend here, I keep it here because the backend is just one file and it nicely allows me to run the development server in one VSCode terminal, instead of having two VSCode windows open.

#### `packages` directory

All the code that I want shared accros apps I put here. The biggest package is definitely `components`, where I have [Histoire](https://histoire.dev) set-up, and I develop all my components here in isolation.

The `i18n` folder is used for translations, for that I use [typesafe-i18n](https://github.com/ivanhofer/typesafe-i18n), so far it's great, and I love the typesafety. It also has one quite unique trick which I didn't see anywhere else, which is that all the translations are not of type `string` but `LocalizedString` which you can then use as a type in you components to ensure translation is being provided.
One disadvantege having it in a package is that I could propably save a few bytes by shipping the translations used only for the specific application, but more often than not I see myself re-using translations, and it's just a few bytes, I ship way more Javascript than this.

`pocketbase` directory holds some utility functions for pocketbase, but since switching from firebase to pocketbase I find myself using this folder less, and writing more of code inside the app itself, since I don't need to re-use this stuff often, and it's easier.

`styles` is for [TailwindCSS](https://tailwindcss.com), I put my base tailwind config here, and base `global.css` styles. It allows me to [share tailwind config accros my applications](/blog/tailwindcss-in-monorepo) and then just extend it, for special purposes.

Lastly the `utils` folder, I try to not to put much stuff here, because I usually find I have a better place for it. The one useful file I have here is `urls.ts`. It exports all the various URLs, so I don't need to hardcode them.

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
