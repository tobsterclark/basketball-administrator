# NSBL Manager

## Remembering how this rubbish works + helpful commands
1. `cd electron` 
2. delete `node_modules/.prisma` and `node_modules/@prisma` 
3. `npm i --legacy-peer-deps`
4. copy `orm/prisma/schema.prisma` to `electron/node_modules/.prisma/client/schema.prisma`
5. in electron folder `npx prisma generate --schema=./node_modules/.prisma/client/schema.prisma` but delete the `output` line in the generated client definition
6. happy days babooshka!

## Getting Started

You will need to authenticate your npm with Github to download the standard ORM package, to do this perform the following steps:

1. Add a line to your `~/.npmrc` file as follows: `//npm.pkg.github.com/:_authToken=TOKEN`
2. Switch out the `TOKEN` with a Github **classic** personal access token
3. Clone Github repo
4. In `functions` **and** in `electron` run `npm install`

## Packaging a electron build
> NOTE: MacOS currently not supported.

1. Ensure you have the following info in your `.env` file.
2. Check the build works with `npm start`
3. Bump the `package.json` versions with `npm run bump-version <x.x.x>`
4. Package and deploy the release with `npm run package`
5. Publish the release in GitHub releases
6. Open the NSBL Manager app and it should prompt an update.

## .env file
You need to have a .env file in each directory with with the following lines:
```
DATABASE_USERNAME="developer"
DATABASE_PASSWORD="<password>"
DATABASE_IP="<ip>"
DATABASE_NAME="postgres"
DATABASE_URL="postgresql://<username>:<hashed password>@<ip>:5432/postgres"
GCLOUD_AUTH_BEARER=<auth bearer>
```

You can get a google cloud auth bearer from gcloud cli by running `gcloud auth print-identity-token`.

## Functions deployment
Currently there's an issue with authenticating the custom NPM package when deploying the cloud functions. To resolve this,
1. Add in the auth token to `/functions/.npmrc`
2. Run `firebase deploy --only functions`
3. **Remove auth token prior to committing** 

For some reason, I can't add the `.npmrc` file to the `.gitignore`, and adding google cloud secrets won't work either, because you need to be authenticated while deploying and in the actual deployment itself.