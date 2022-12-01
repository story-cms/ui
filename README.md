# StoryCMS Components

Catalogue of Story CMS widgets and components

## Setup

```
cp secrets.example secrets.ts
```

and then populate from [the password vault](https://start.1password.com/open/i?a=GKKQJPOIFBB2PM5RSLXR6WMYIA&v=c53xvr3gsew3pncvx2fx7vsxzu&i=cejuxu74obe7flkdhf5dw2yhqi&h=onesheep.1password.com)

## Development

```
npm run story:dev
```

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's Take Over mode by following these steps:

1. Run `Extensions: Show Built-in Extensions` from VS Code's command palette, look for `TypeScript and JavaScript Language Features`, then right click and select `Disable (Workspace)`. By default, Take Over mode will enable itself if the default TypeScript extension is disabled.
2. Reload the VS Code window by running `Developer: Reload Window` from the command palette.

You can learn more about Take Over mode [here](https://github.com/johnsoncodehk/volar/discussions/471).
