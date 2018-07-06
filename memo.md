# Uber_Backend

## Setup

`yarn add @types/node nodemon ts-node tslint-config-prettier typescript --dev`
`mkdir tsconfig.json tslint.json`

```json
// tslint.json
{
  "extends": ["tslint:recommended", "tslint-config-prettier"],
  "linterOptions": {
    "exclude": ["config/**/*.js", "node_modules/**/*."]
  },
  "rules": {
    "no-console": false,
    "member-access": false,
    "object-linteral-sort-keys": false,
    "ordered-imports": true,
    "interface-name": false,
    "strict-null-checks": false
  },
  "rulesDirectory": []
}
```

```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "module": "commonjs",
    "target": "es5",
    "lib": ["es6", "dom", "esnext.asynciterable"],
    "sourceMap": true,
    "allowJs": true,
    "moduleResolution": "node",
    "rootDir": "src",
    "forceConsistentCasingInFileNames": true,
    "noImplicitReturns": true,
    "noImplicitThis": true,
    "noImplicitAny": false,
    "strictNullChecks": true,
    "suppressImplicitAnyIndexErrors": true,
    "noUnusedLocals": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  },
  "exclude": [
    "node_modules",
    "build",
    "scripts",
    "acceptance-tests",
    "webpack",
    "jest",
    "src/setupTests.ts"
  ]
}
```

## GraphQL and Express

### part 1

`yarn add graphql-yoga morgan cors helmet`
`yarn add @types/cors @types/helmet @types/morgan --dev`

```json
// User Setting on VS-code
  "editor.formatOnSave": true,
  "prettier.semi": false,
  "prettier.singleQuote": true,
```
