---
  postSlug: how-to-setup-a-monorepo
  title: How to setup a monorepo
  description: Guide on how to setup a basic Sveltekit monorepo
  tags: 
    - mesh
    - monorepo
  pubDate: February 10, 2023
  updatedDate: February 10, 2023
---

In this guide I will show you how to setup a basic Sveltekit monorepo using [Turborepo](https://turbo.buld) and [PNPM](http://pnpm.io). In other guides I'll show you how to add other cool features. You can find all the guides [here](/tags/monorepo).

## Table of contents

## Initial setup

To better scale and this monorepo we are gonna use [Turborepo](https://turbo.build). For the initial scaffolding we are gonna use create-turbo CLI, altough we are gonna delete most of the files it creates.

```bash:Terminal
npx create-turbo@latest
```

This command will ask you where do you want to put your monorepo, and which package manager you want to use. I recommend [PNPM](http://pnpm.io), since it's the fastest, and saves your disk space.

This will give us these initial directories

```bash:Files
├── apps
│   ├── docs
│   └── web
└── packages
    ├── eslint-config-custom
    ├── tsconfig
    └── ui
```

## Creating a Sveltekit application

And as I said we can delete most of this stuff.

Start of by removing the `docs` and `web` folders from the `apps` directory. Then create a new sveltekit app inside:

```bash:Terminal
cd apps
pnpm create svelte@latest my-app
```

Configure the app however you want, though I recommend selecting the Skeleton project and using Typescript, ESLint and Prettier.

## Setting up ESLint

Copy the created eslint config from sveltekit app into `index.js` in eslint-config-custom. The file should look like this:

```js:index.js
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "turbo", // Don't forget to add this one back
  ],
  plugins: ["svelte3", "@typescript-eslint"],
  ignorePatterns: ["*.cjs"],
  overrides: [{ files: ["*.svelte"], processor: "svelte3/svelte3" }],
  settings: {
    "svelte3/typescript": () => require("typescript"),
  },
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2020,
  },
  env: {
    browser: true,
    es2017: true,
    node: true,
  },
};
```

We'll also need to install all the dependencies and remove the old ones.

```bash:Terminal
cd packages/eslint-config-custom
pnpm add -D @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-config-prettier eslint-plugin-svelte3
pnpm remove eslint-config-next eslint-plugin-react
```

Also move the `.eslintignore` to the root directory.

And then comeback to the `apps` directory and remove all the eslint dependencies that we installed in the `eslint-config-custom`, since they are no longer needed.

```bash:Terminal
pnpm remove @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-config-prettier eslint-plugin-svelte3
```

And add the `eslint-config-custom` package

```bash:Terminal
pnpm add -D eslint-config-custom
```

Also don't forget to change the `.eslintrc.js`, to extend the custom config.

```js:.eslintrc.js
module.exports = {
  root: true,
  extends: ["custom"],
};
```

Now you can check that eslint work by just running `pnpm run lint`

## Setting up Prettier

You can copy the `.prettierrc` and `.prettierignore` files to the root, and then you need to modify the `.prettierignore`, by putting the `**/` before the nested folders.

```text:.prettierrc
.DS_Store
node_modules
**/build
**/.svelte-kit
**/package
.env
.env.*
!.env.example

# Ignore files for PNPM, NPM and YARN
pnpm-lock.yaml
package-lock.json
yarn.lock

```

Due to [some issues](https://github.com/prettier/prettier/issues/4081) in prettier itself you will need to modify the scripts.
First modify the `lint` script in the `apps/web/package.json` , by removing the prettier command.

```diff:package.json
- "lint": "prettier --plugin-search-dir . --check . && eslint .",
+ "lint": "eslint .",
```

And add these two script into your root `package.json`

```json:package.json
"prettier": "prettier --write \"**/*.{ts,tsx,md,svelte,js,json,yaml}\"",
"prettier-check": "prettier --plugin-search-dir . --check ."
```

The first command will format all your code, and the second one will only check it.

**NOTE:** You will need to do this for all other apps where you want to use prettier

### Formatting on Auto-save

I have had numerous problems when working with prettier on autosave, so if it's not working you can try these tips

#### Changing Svelte default formatter

As far as I understand by default svelte files are formatted by the svelte VSCode extension instead of the prettier extension and the svelte extension ignores the `.prettierc` config file, so you can go to you `settings.json` in VSCode (open the command pallete
<kbd>Ctrl</kbd>+<kbd>P</kbd> and search for _Open User Settings (JSON)_)

And add these two lines:

```json:settings.json
"prettier.documentSelectors": ["**/*.svelte"],
"[svelte]": {
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
},
```

### Debugging

If it still doesn't work the best tip I can give is to open up the prettier output console in VSCode, you can go to it by clicking on the prettier text in the right bottom corner, or by opening terminal and clicking the _Output_ tab and selecting Prettier

![Prettier output console](/blog/prettier-output-console.png)

## TS Config

Sadly there's currently no way to extend two `tsconfig.json` in one, and you need to extend the sveltekit generated `tsconfig.json` to have the end to end typesafety. Though this feature is [coming in Typescript 5.0](https://devblogs.microsoft.com/typescript/announcing-typescript-5-0-beta/#supporting-multiple-configuration-files-in-extends), so I will update this guide when it lands, for now you'll need to resort to copy pasting the config, or just using the defaults, which I found are good enough.

## Svelte and Vite config

In my expirience using monorepos, I found that I have different configs for each, but still if you want to share them just create a new package by creating a new folder and running `npm init -y`, then create your base configs, and export a <abbr title="Plain Old Javascript Object">POJO</abbr>, which you then import in the config.

## The end

To see how to set-up [Histoire](https://histoire.dev) or [TailwindCSS](https://tailwindcss.com), you can look at all the guides from this series [here](/tags/monorepo).
