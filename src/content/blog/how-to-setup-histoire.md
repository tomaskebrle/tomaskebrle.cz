---
  postSlug: how-to-setup-histoire.md
  title: How to setup components in a monorepo
  description: Guide on how to setup components and Histoire in a monorepo architecture
  tags: 
    - monorepo
  pubDate: February 11, 2023
  updatedDate: February 11, 2023
---

In this guide I'll focus on setting up components package in our monorepo, for that we are gonna use [Histoire](https://histoire.dev). Which is a tool that will allow us to develop components in isolation, and document them. It's a [vite](https://vitejs.dev) powered alternative to [Storybook](https://storybook.js.org).

:::note{.tip}
This is a continuation of my [monorepo guide](/tags/monorepo), you can find the first article [here](/blog/how-to-setup-a-monorepo).
:::

## Table of contents

## Creating our package

First of all we need to create a space for our components.

```bash:Terminal
cd packages
mkdir components
cd components
npm init -y
```

This will create a `components` folder where we'll put all our components.

Then create a `src` folder and put a `index.ts` file here. This file will be our entrypoint to components and we'll export all the components from here, and that's why we also need to modify `package.json` and change the `main` property, to tell PNPM where to find our components.

```json:package.json
"main" : "src/index.ts"
```

## Creating our first component

Finally we can create our first component let's start by creating a `Button.svelte`.

```svelte:Button.svelte
<button on:click>
  <slot/>
</button>

<style>
  button {
    padding: 8px;
    border-radius: 4px;
    background: tomato;
  }
</style>
```

Now to use this component we must modify the `index.ts` file we create earlier, by exporting the component.

```ts:index.ts
export { default as Button } from "./Button.svelte";
```

:::note{.error}
You don't need to do this, but you would have to then do `import Button from "components/Button.svelte"`, by putting this here you can then import multiple components at once like this `import {Button, Input, Count} from "components"`
:::

Before we can go test out our new component we need to add the components package as dependency to our app, by running:

```bash:Terminal
pnpm add components
```

:::note{.tip}
If you have problems runnnig this command check that you have put `components` folder in packages, or in other folder defined by `pnpm-workspace.yaml`, and that your `package.json` name matches the name of the package you are trying to install.
:::

After doing this we can go to `+page.svelte` and import our Button component

```svelte:+page.svelte
<script>
  import {Button} from "components"
</script>

<Button on:click={() => alert('Hello')}>Test</Button>
```

Then you can run `pnpm dev` to start the development server, and test out your button component.

## Adding histoire

Now we are going to add [Histoire](https://histoire.dev), which will allow us to develop, test and document components, nicely in isolation. And it's all powered by vite so it's all blazingly fast<sup>tm</sup>.

Firs of all since it's powered by vite we need to install and setup vite with svelte

```bash:Terminal
pnpm add -D vite @sveltejs/vite-plugin-svelte typescript
pnpm add svelte
```

And create a `vite.config.ts`

```typescript:vite.config.ts
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
});
```

After that we can setup Histoire, create an `histoire.config.ts`

```typescript:histoire.config.ts
import { defineConfig } from "histoire";
import { HstSvelte } from "@histoire/plugin-svelte";

export default defineConfig({
  plugins: [HstSvelte()],
});
```

Our last config will be the `svelte.config.js`.

```javascript:svelte.config.js
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

export default {
  preprocess: vitePreprocess(),
};
```

and don't forget to install the dependencies

```bash:Terminal
pnpm add histoire -D @histoire/plugin-svelte
```

Now modify the `package.json`. Don't forget the `"type"` key because leaving it out will break vite.

```json:package.json
"type": "module",
"scripts": {
  "dev": "histoire dev",
  "build" : "histoire build"
},
```

Naming these script the same as in our sveltekit application will tell turbo to run them alongside your other apps, so when you now run `pnpm dev` it will start both development servers, and you should be able to acces your stories on [localhost:6006](http://localhost:6006). Well acces, you don't have any stories currently configured.

## Creating our first story

For us to be able to see the stories we need to create a story file that will tell Histoire how to render our story, I won't go into much detail about this since the [documentation](https://histoire.dev/guide/svelte3/stories.html) on how to do that is great.

But just to showcase the power of Histoire let's create our first story by creating a `Button.story.svelte`

```svelte:Button.story.svelte
<script lang="ts">
  import type { Hst } from '@histoire/plugin-svelte';
  import Button from './Button.svelte';
  import { logEvent } from 'histoire/client';

  export let Hst: Hst;

  let content = 'Click me!';
</script>

<Hst.Story>
 <svelte:fragment slot="controls">
  <Hst.Text bind:value={content} title="Content" />
 </svelte:fragment>

 <Button on:click={(event) => logEvent('Click', event)}>
  {content}
 </Button>
</Hst.Story>
```

:::note{.tip}
I recommend creating a folder for each component since it can get messy with a story file, documentation file and a component file all placed next to other component files.
:::

Now when you open you Histoire dev server you can click on your Button story, and try it out. It will give you a clean slate to develop your components in with options to trigger responsivity, change the background color. We've also implented a `logEvent` which you can see in the Events tab.

## Creating docs for our story

And lastly historie also allows us to create docs for our stories.

Create a `Button.story.md` file. This file will allow you to document your components using markdown. For more info visit the [histoire documentation](https://histoire.dev/guide/svelte3/docs.html).

For example

````markdown:Button.story.md
# Button

Component used for clicking

## How to use

```svelte
<Button on:click={handleClick} />
```
````
