# RunSheetControl

Google Cloud project with the following services:

1. functions
   This is what is used to generate weekly runsheets
2. cloud sql
   Hosting player, team, and game data
3. cloud run
   Wix adapter to connect cloud sql to the Wix Data API

Also includes an electron project which can be used for downloading weekly scoresheets, possibly team management as well

Database notes:

- Wix CMS is a cool tool, however clunky to manage and contains some annoyances which will make maintainability more difficult
- Cloud SQL
  - Setting up the data to be hosted in cloud sql means that if we pivot from wix we can connect to whatever service we choose to utilise without much fuss
  - it also means that the player, team, and game management can be done from the electron app, ensuring a customisable and seamless experience
  - unfortunantely, has an estimated cost of $9 per month

Todo:

1. Object Resource Manager setup to enable easy type safe communication to the database (seperate project so electron and functions can utilise it)
2. Cloud function, with the ORM create a runnable function to demonstrate
3. Setup electron application to initially demo downloading weekly scoresheet from there

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
DATABASE_IP="35.201.1.63"
DATABASE_NAME="postgres"
DATABASE_URL="postgresql://developer:%2Ch6VKM7gX.m%5BL%24B%2C@35.201.1.63:5432/postgres"
GCLOUD_AUTH_BEARER=<auth bearer>
```

You can get a google cloud auth bearer from gcloud cli by running `gcloud auth print-identity-token`.

## Functions deployment
Currently there's an issue with authenticating the custom NPM package when deploying the cloud functions. To resolve this,
1. Add in the auth token to `/functions/.npmrc`
2. Run `firebase deploy --only functions`
3. **Remove auth token prior to committing** 

For some reason, I can't add the `.npmrc` file to the `.gitignore`, and adding google cloud secrets won't work either, because you need to be authenticated while deploying and in the actual deployment itself.