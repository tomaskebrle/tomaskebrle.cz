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

At the heart of my monorepo is [TurboRepo](https://turbo.buil) and [PNPM workspace](https://pnpm.io).
