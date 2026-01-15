---
title: "Creating a UI library for Next.js with Storybook"
subtitle: "How to build a library with Next.js, Storybook, TypeScript and Rollup"
date: "2026-01-15"
tags: ["digital"]
lang: "en"
---

Here is a recap of how I created a UI library (with Storybook and TypeScript) optimized for a Next.js website.

## Initialize a new project

Create a new project, and initialize it with Node.js.

```bash
mkdir ui-library
cd ui-library
npm init
```

Install the React, Next.js and TypeScript dependencies:

```bash
npm install --save-dev rollup react react-dom next typescript @types/react
```

If you want linting, install ESLint following their [installation guide](https://eslint.org/docs/latest/use/getting-started). Accept installing the extra dependencies when prompted.

```bash
npm init @eslint/config@latest

<!-- Choose these answers when prompted: -->
<!-- ✔ What do you want to lint? **javascript** -->
<!-- ✔ What type of modules does your project use? **esm** -->
<!-- ✔ Which framework does your project use? **react** -->
<!-- ✔ Does your project use TypeScript? **Yes** -->
<!-- ✔ Where does your code run? **browser** -->
<!-- ✔ Which language do you want your configuration file be written in? **js** -->
```

Your `package.json` file should look like this:

```json
// package.json
{
  "name": "ui-library",
  "version": "1.0.0",
  "description": "A UI library built for Next.js — with Storybook, React, Typescript, and Rollup",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Jane Doe",
  "license": "ISC",
  "devDependencies": {
    "@eslint/js": "^9.39.2",
    "@types/react": "^19.2.8",
    "eslint": "^9.39.2",
    "eslint-plugin-react": "^7.37.5",
    "globals": "^17.0.0",
    "next": "^16.1.2",
    "react": "^19.2.3",
    "react-dom": "^19.2.3",
    "typescript": "^5.9.3",
    "typescript-eslint": "^8.53.0"
  }
}
```

Add a `tsconfig.json` file in your project root with the following info:

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "esnext" /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */,
    "jsx": "react-jsx" /* Specify what JSX code is generated. */,
    "module": "ESNext" /* Specify what module code is generated. */,
    "moduleResolution": "Node" /* Specify how TypeScript looks up a file from a given module specifier. */,
    "declaration": true /* Generate .d.ts files from TypeScript and JavaScript files in your project. */,
    "declarationMap": true /* Create sourcemaps for d.ts files. */,
    "emitDeclarationOnly": false /* Only output d.ts files and not JavaScript files. */,
    "sourceMap": true /* Create source map files for emitted JavaScript files. */,
    "outDir": "dist" /* Specify an output folder for all emitted files. */,
    "esModuleInterop": true /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility. */,
    "forceConsistentCasingInFileNames": true /* Ensure that casing is correct in imports. */,
        "skipLibCheck": true /* Skip type checking all .d.ts files. */
    "strict": true /* Enable all strict type-checking options. */,
  },
  "exclude": ["**/*.stories.ts", "**/*.stories.tsx"]
}
```

## Create your UI library with Storybook

### Install Storybook

Set up Storybook following their [Storybook for Next.js installation guide](https://storybook.js.org/docs/get-started/frameworks/nextjs-vite).

```bash
npm create storybook@latest
```

The installation helper should detect the Next.js framework, and install everything needed by itself. If Next.js is not detected, select the generic `Vite` builder, and install `@storybook/nextjs-vite` manually.[^1]

<aside>

Installing Storybook for Next.js (specifically) will allow you to use [Next.js built-in components](https://nextjs.org/docs/pages/api-reference/components) in your library — e.g. `<Link>` or `<Image>`.

</aside>

This sets up a Storybook starter project, that you can immediately run in dev mode with `npm run storybook`.

### Create your UI library

From there, create your Storybook library, as you see fit. Personally, I went for the following project structure:

```bash
src
├── assets
│   └── globals.css
├── components
│   ├── Banner
│   │   ├── Banner.module.css
│   │   ├── Banner.stories.tsx
│   │   ├── index.tsx
│   │   └── types.ts
│   └── Button
│       ├── Button.module.css
│       ├── Button.stories.tsx
│       ├── index.tsx
│       └── types.ts
├─── declaration.d.ts
└─── index.ts
```

The `globals.css` file contains all the base styles, CSS variables, and CSS utils reused throughout the library — e.g. colors, spacings, general typography styles.

Each component has a directory (e.g. `Button`), which contains the component main file `index.ts`, its types `types.ts`, its styles (e.g. `Button.module.css`) and linked story (e.g. `Button.stories.tsx`).

So that `Button/index.ts` can import `Button.module.css` without any error, you need to declare the CSS module type. Create a `declaration.d.ts` file in the `src` directory, and add the following code:

```ts
// src/declaration.d.ts
declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}
```

Create the main `index.ts` file in the `src` directory, that will export all components to one root file. This will be useful for the next bundling step.

```ts
export { default as Banner } from "./components/Banner";
export { default as Button } from "./components/Button";
```

## Bundle your package with Rollup

### Install Rollup and other dependencies

When you have a few components ready, you will need to set up Rollup (and a few other dependencies) to package your library.

```bash
npm install --save-dev rollup @rollup/plugin-typescript rollup-plugin-copy rollup-plugin-peer-deps-external
```

Edit your `package.json` file to look like this:

```json
{
  // ... same config as before
  "type": "module",
  "main": "./dist/index.js", // update this path
  "types": "./dist/index.d.ts",
  "files": ["dist"],
  "scripts": {
    "prebuild": "rm -rf dist",
    "build": "rollup -c",
    "dev": "rollup -c -w",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build",
    "serve-storybook": "serve storybook-static",
    "lint": "eslint ./src --ext .tsx,.ts",
    "fix": "eslint ./src --fix"
  },
  // ... same config as before
  "devDependencies": {
    "@rollup/plugin-typescript": "^12.3.0",
    "rollup": "^4.55.1",
    "rollup-plugin-copy": "^3.5.0",
    "rollup-plugin-peer-deps-external": "^2.2.4",
    "next": "^16.1.2" // uninstall this Next.js dependency
    // ... same dev dependencies as before
  },
  // add the following peer dependencies
  "peerDependencies": {
    "next": ">=15",
    "react": ">=19",
    "react-dom": ">=19"
  }
}
```

As you can see, we added some extra metadata and scripts. You can also mark `next`, `react`, and `react-dom` as peer dependencies.[^2]

As Next.js is marked as a peer dependency, you can safely remove it from the library (`npm uninstall next`).

### Set up the Rollup config

In your project root, create a `rollup.config.mjs` file with this config:

```js
// rollup.congif.mjs
import fs from "fs";
import path from "path";
import typescript from "@rollup/plugin-typescript";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

// get all component entry files dynamically
const componentsDir = "src/components";
const componentFiles = fs
  .readdirSync(componentsDir)
  .filter((name) => fs.statSync(path.join(componentsDir, name)).isDirectory())
  .map((name) => path.join(componentsDir, name, "index.tsx"));

// add the main `src/index.ts` file to the files to be bundled
componentFiles.push("src/index.ts");

export default [
  {
    input: componentFiles,
    output: {
      dir: "dist",
      format: "esm",
      sourcemap: true, // for debugging
      preserveModules: true, // preserve folder structure from "src"
      preserveModulesRoot: "src",
    },
    external: ["react", "react-dom", "next"],
    // note: the order in which the plugins are added is important
    plugins: [
      // avoids bundling peer dependencies
      peerDepsExternal(),
      // handles typescript
      typescript({
        tsconfig: "./tsconfig.json",
      }),
    ],
  },
];
```

Build the package with Rollup (`npm run build`). Rollup tries to create a `dist` folder from your components... but an error appears:

```bash
src/index.ts → dist...
[!] RollupError: src/components/Banner/Banner.module.css (1:0): Expression expected (Note that you need plugins to import files that are not JavaScript)
src/components/Banner/Banner.module.css (1:0)
```

In English, this means that Rollup cannot import non-JavaScript files without a plugin help. In other words, our `.css` and `.module.css` files break the bundling.

#### Solution A: one shared CSS file (not recommended for Next.js)

<aside>

Generating one shared CSS is the easiest implementation, but also not the best solution for Next.js projects. Skip straight to solution B if you are not interested in these technical details.

</aside>

The PostCSS plugin is made just for that. You can install PostCSS like this...

```bash
npm i --save-dev postcss rollup-plugin-postcss
```

... and add it to your Rollup config:

```js
// rollup.congif.mjs
import postcss from "rollup-plugin-postcss";

// ... same config as before

export default [
  {
    // ... same config as before
    plugins: [
      peerDepsExternal(),
      // bundles CSS modules
      postcss({
        modules: true,
        extract: true, // generates one single `index.css` file
      }),
      typescript({
        tsconfig: "./tsconfig.json",
      }),
    ],
  },
];
```

Try bundling your package again, and the new `dist` structure should look like this:

```bash
dist
├── components
│   ├── Banner
│   │   ├── Banner.module.css.js # from `.css` to `.css.js`
│   │   ├── index.d.ts
│   │   ├── index.js
│   │   ├── types.d.ts
│   │   ├── ... other source map files, used for debugging
│   └── Button
│       ├── ...
│       └── ...
├── index.css # one CSS file created
└── index.d.ts
```

As you can see, each component has a directory (e.g. `Banner`), which contains the component main file (`index.js`)[^3], its types (`index.d.ts` and `types.d.ts`), and its styles (e.g. `Banner.module.css.js`).

But why do we get a `.css.js` file instead of a regular `.css` format? Rollup treats CSS as a JavaScript module by default.

`Banner.module.css.js` exports the class names only, which link to the `index.css` stylesheet, that regroups all component styles. To make it clearer, here is an example of the generated built...

```js
// dist/components/Banner/Banner.module.css.js
var styles = {
  Button: "Button-module_Button__4GoXJ",
  primary: "Button-module_primary__s1sM6",
  secondary: "Button-module_secondary__R0waJ",
  ternary: "Button-module_ternary__5nqwd",
};

export { styles as default };
```

... and the `index.css` regrouping all components styles:

```css
/* dist/index.css */
.Banner-module_Banner__rjws- {
  /* ... some CSS */
}

.Button-module_Button__4GoXJ.Button-module_primary__s1sM6,
.Button-module_Button__4GoXJ.Button-module_secondary__R0waJ {
  /* ... some CSS */
}

/* ... other components CSS */
```

This setup is quite simple and would work. In your app, you need to import a single CSS file to get all components styles:

```js
import "ui-library/index.css";
```

Using PostCSS to generate one single CSS file works great for UI libraries that are not attached to a single framework. It allows for more flexibility, even though it sacrifices in performance.

There is however a much better implementation for a Next.js app.

#### Solution B: per-component CSS (recommended for Next.js)

The Next.js framework is more than just a bundler. It can handle routing, rendering (SSR), CSS extraction, and the preloading strategy. In short, if we emit a CSS module (as-is) per component, Next.js will be able to extract that CSS at built time, know which components are used per route, and inject that CSS into the `<head>` before render.

This per-component CSS solution enables:

- Smaller initial CSS
- Better caching
- Faster route transitions
- No unused styles

At the end of this implementation, your generated `dist` directory should look like this

```bash
dist
├── components
│   ├── Banner
│   │   ├── Banner.module.css # a pure `.module.css` file!
│   │   ├── index.d.ts
│   │   ├── index.js
│   │   ├── types.d.ts
│   │   └── ...
│   └── Button
│       ├── ...
│       └── ...
├── index.d.ts
└── ...

```

To obtain this final `dist` folder, we need to:

1. bundle all files, but ignore the CSS module files
2. copy the CSS module files manually to `dist` at the end

The copying part is done through the `rollup-plugin-copy` that can be installed the usual way (`npm i --save-dev rollup-plugin-copy`).

Here is the updated `rollup.config.mjs`:

```js
// rollup.config.mjs
import copy from "rollup-plugin-copy";

// ... same config as before

export default [
  {
    // ... same config as before
    // ignore CSS modules and peer dependencies
    external: (id) =>
      id.endsWith(".module.css") ||
      id === "react" ||
      id === "react-dom" ||
      id === "next",
    plugins: [
      peerDepsExternal(),
      typescript({
        tsconfig: "./tsconfig.json",
      }),
      // copy CSS modules
      copy({
        targets: [
          // 1. copy the CSS modules
          {
            src: "src/components/**/*.module.css",
            dest: "dist/components",
            rename: (name, ext, fullPath) =>
              // preserve component folder structure
              path.relative("src/components", fullPath),
          },
          // 2. copy the global styles
          {
            src: "src/assets/globals.css",
            dest: "dist/assets",
          },
        ],
        hook: "writeBundle",
      }),
    ],
  },
];
```

Build the `dist` package again, you should now see a `.module.css` file inside each component folder. If that's your case: great success!

<aside>

Do you remember that `src/assets/globals.css` file containing our library CSS variables and base styles? As you can see in the above snippet, I also extracted them into `dist`, right after dealing with the CSS modules.

</aside>

### Enabling the correct imports

We are almost done. Everything left is to connect the export/import paths to our UI library package files.

Get back to the `package.json` file, and add the following:

```json
{
  "exports": {
    // enables `import { Button } from "@hgcle/ui-library"`
    ".": {
      "import": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    // enables `import Button from "@hgcle/ui-library/Button"`
    "./*": {
      "import": "./dist/components/*/index.js",
      "types": "./dist/components/*/index.d.ts"
    },
    // enables `import "@hgcle/ui-library/globals.css"`
    "./globals.css": "./dist/assets/globals.css"
  },
  // avoids tree-shaking
  "sideEffects": ["**/*.css"]

  // ... same config as before
}
```

In your Next.js app, you can now import the library components and global styles:

```ts
import { Button } from "@hgcle/ui-library";
// or
import Button from "@hgcle/ui-library/Button";

import "@hgcle/ui-library/globals.css";
```

We are finished with the library. Let's publish it!

## Publish the library on NPM

1. Create an NPM account if you don't already have one.
2. In the root of your project, run `npm login`.
3. Update the `package.json` version number.
4. Build the package by running `npm run build`.
5. Run `npm publish` (or `npm publish --access public` if you want it public)

... and your library should be live!

[^1]: You will also need to replace `@storybook/react-vite` with `@storybook/nextjs-vite` in the `.storybook/main.ts` and `.storybook/preview.ts` files.
[^2]: Basically, the UI library won't provide these dependencies, but use the ones from your Next.js app directly. This avoids potential compatibility conflicts.
[^3]: transformed from the original TypeScript file
