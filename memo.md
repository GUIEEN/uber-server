# Uber_Backend

## Setup

### Install

```
-D
@types/node
nodemon
ts-node
tslint-config-prettier
typescript
```

`yarn add @types/node nodemon ts-node tslint-config-prettier typescript --dev`
`mkdir tsconfig.json tslint.json`

```json
// tslint.json
{
  "extends": ["tslint:latest", "tslint-config-prettier"],
  "linterOptions": {
    "exclude": ["config/**/*.js", "node_modules/**/*."]
  },
  "rules": {
    "no-console": false,
    "member-access": false,
    "object-literal-sort-keys": false,
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

### Install

```
graphql-yoga
morgan
cors
helmet

-D
@types/cors
@types/helmet
@types/morgan
```

`yarn add graphql-yoga morgan cors helmet`
`yarn add @types/cors @types/helmet @types/morgan --dev`

```json
// User Setting on VS-code
  "editor.formatOnSave": true,
  "prettier.semi": false,
  "prettier.singleQuote": true,
```

## Merge Graphql files to one Graphql file

어떤 디렉토리 안의 모든 그레프큐엘 파일들을 하나로 뭉쳐서 export 하기위해서 밑을 설치한다.

### Install

```
graphql-tools
merge-graphql-schemas
```

`yarn add graphql-tools merge-graphql-schemas`

```js
// ./src/schema.ts
import { GraphQLSchema } from 'graphql'
import { makeExecutableSchema } from 'graphql-tools'
import { fileLoader, mergeResolvers, mergeTypes } from 'merge-graphql-schemas'
import path from 'path'

// merge-graphql-schemas
// 1. Read all Types & Resolvers
const allTypes: GraphQLSchema[] = fileLoader(
  path.join(__dirname, './api/**/*.graphql')
)
const allResolvers: string[] = fileLoader(
  path.join(__dirname, './api/**/*.resolvers.*')
)
// 2. Merge that shits
const mergedTypes = mergeTypes(allTypes)
const mergedResolvers = mergeResolvers(allResolvers)

// graphql-tools
// 3. Make a Merged_Schema !
const schema = makeExecutableSchema({
  resolvers: mergedResolvers,
  typeDefs: mergedTypes
})

export default schema
```

## Graphql to Typescript

이전 스텝에서 우린 graphql files (distributed into multiple directories) 를 하나의 file 로 로드하여 express 와 GraphQLServer 에서 사용하는법을 배웠다. 근데 문제점은 `.graphql` 안에 정의된 타입들을 resolver 에서 사용시 하나하나 우리가 정확하게 기억하기 힘들다는 점이다. 따라서,

> Purpose : Graphql type 파일을 TypeScript 로 정의하여 명확하게 만든다.

### Install

```
-D
graphql-to-typescript
gql-merge
babel-runtime
```

`yarn add graphql-to-typescript gql-merge --dev`
위의 디펜던시를 사용하기위해서 밑의 설치도 추가적으로 필요하다.

`yarn add babel-runtime --dev`

```json
{
  "scripts": {
    "pretypes":
      "gql-merge --out-file ./src/mergedSchema.graphql ./src/api/**/*.graphql",
    "types":
      "graphql-to-typescript ./src/mergedSchema.graphql ./src/types/graph.d.ts"
  }
}
```

**여기서 `pre` 란 prefix 를 scripts 에 사용해주었는데, 이렇게 하게되면 단순히 `yarn types`를 입력시 `yarn pretypes -> yarn types` 순으로 실행이 된다.**

- `pretypes` 에서는 `mergedSchma.graphql`이란 하나의 파일로 모든 graphql 파일들을 merge 시키고
- `types`에서는 merged 된 shcema 를 바탕으로 타입 definition 파일을 생성한다.

## Typechecking Graphql Arguments

이제 밑에처럼 `sayHello`에 파라메터를 추가시키고 `yarn types`를 실행해보자

```graphql
type SayHelloResponse {
  text: String!
  error: Boolean!
}

type Query {
  sayHello(name: String!): SayHelloResponse!
}
```

이후 merge 된 graphql 을 바탕으로 생성된 `graph.d.ts`를 보면

```js
export interface Query {
  sayHello: SayHelloResponse;
}

export interface SayHelloQueryArgs {
  name: string;
}
```

처럼 `SayHelloQueryArgs`란게 생성되었다.

이를 이용하여 이제 resolver 를 수정해보자

```js
const resolvers = {
  Query: {
    sayHello: (parent, args: SayHelloQueryArgs, context): SayHelloResponse => {
      // console.log(args) 로 채크하여 코딩할 필요가 없어짐 !
      return {
        error: false,
        text: 'love you ' + args.name
      }
    }
  }
}
```

위를 보면, args 의 타입정의를 이제 할 수 있으므로 보다 더 안전하고 간편하게 우리는 코딩을 할 수 있다.

## Configuring TypeORM

ORM

- Object Relational Mapper
- Our codes -> ORM -> SQL Queries

### Install

```
typeorm
pg = Postgres package
```

`yarn add typeorm pg`

이렇게 설치를 한 이후에는 typeorm 의 구성설정 파일인 `ormConfig.ts`를 만들어주자.

```js
import { ConnectionOptions } from 'typeorm'

const connectionOptions: ConnectionOptions = {
  type: 'postgres',
  database: 'uber_server',
  entities: ['entities/**/*.*'],
  logging: true,
  synchronize: true,
  port: 5432,
  host: process.env.DB_ENDPOINT || 'localhost',
  username: process.env.DB_USERNAME || 'seungUber',
  password: process.env.DB_PASSWORD || ''
}

export default connectionOptions
```

```bash
> psql
psql (10.4)
Type "help" for help.

# 보다시피 ; 를 뒤에 붙여주지 않으면 실행되지 않음 !
guieenoutis=# DROP DATABASE uber-server
guieenoutis-# CREATE DATABASE uber-server

# DB 이름안의 `-` 는 syntax error를 일으킴
guieenoutis-# CREATE DATABASE uber-server;
ERROR:  syntax error at or near "-"
LINE 1: CREATE DATABASE uber-server;
                            ^

# CamelCase나 underBar를 사용해서 적어준다.
guieenoutis=# CREATE DATABASE uberServer;
CREATE DATABASE
guieenoutis=# CREATE DATABASE uber_server;
CREATE DATABASE

# \q로 종료 !
guieenoutis=# \q
```

## 11. Creating a Virtual Environment on NodeJS

먼저 `.env`파일을 만들고 안에다가 설정하고싶은 변수들을 입력해준다.

```env
DB_ENDPOINT=localhost
DB_USERNAME=uber
DB_PASSWORD=
```

### Install

```
dotenv
```

`yarn add dotenv --dev`

설치 후,

```js
import dotenv from 'dotenv'

dotenv.config() // process.env에 .env 변수들을 등록한다 !!
console.log(process.env)
```

```bash
{
  ...
  npm_node_execpath: '/usr/local/Cellar/node/9.3.0_1/bin/node',
  npm_config_version_tag_prefix: 'v',
  DB_ENDPOINT: 'localhost',
  DB_USERNAME: 'uber',
  DB_PASSWORD: ''
}
```

`process.env`에 이렇게 추가된 것을 확인할 수 있다.

그리고 우린 `.env`에 private 한 정보들을 담을것이므로, `.gitignore` 파일에

```
# dotenv environment variables file
.env
```

를 등록시켜주는걸 잊지말자.

## 12. User Entity GraphQL Type

먼저 `/src/api/User/shared/` 를 생성한다. 이 `share` 디렉토리 안에는 graphql 의 type 만 들어갈꺼다. not resolvers, etc..

그리고 서비스에 필요한 타입들이 뭘지 정의해주자.
예를 들면 이렇게

```ts
type User {
  id: Int!
  email: String
  verifiedEmail: Boolean!
  firstName: String!
  lastName: String!
  age: Int
  password: String
  phoneNumber: String
  verifiedPhoneNumber: Boolean!
  profilePhoto: String
  createdAt: String!
  updatedAt: String
  fullName: String
  isDriving: Boolean!
  isRiding: Boolean!
  isTaken: Boolean!
  lastLng: Float
  lastLat: Float
  lastOrientation: Float
}
```

## 13. User Entity

`/src/entities/User.ts`를 생성.

```js
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn() id: number

  @Column({ type: 'text', unique: true })
  email: string
}

export default User
```

### Install

```
class-validators
```

`yarn add class-validator`

class-validator 를 이용하게되면 decorator 로 entity 안에 validate 을 적어줄 수 있다.

```ts
import { IsEmail } from 'class-validator'

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn() id: number

  @Column({ type: 'text', unique: true })
  @IsEmail()
  email: string
```

## 15. Hashing & Encrypting User Passwords

### Install

```
bcrypt

-D
@types/bcrypt
```

```js
  @BeforeInsert()
  @BeforeUpdate()
  async savePassword(): Promise<void> {
    if (this.password) {
      const hashedPassword = await this.hashPassword(this.password)
      this.password = hashedPassword
    }
  }

  private hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, BCRYPT_ROUNDS)
  }
```

## 25. Resolver

resolver 의 타입을 커스텀으로 지정해준다.

```js
export type Resolver = (parent: any, args: any, context: any, info: any) => any

export interface Resolvers {
  [key: string]: {
    [key: string]: Resolver
  };
}
```

## 34. Introduction to Twilio

### Install

```
twilio

-D

@types/twilio
```
