# Remix && AWS CDK == ❤️

Git clone this repo, `npm install` get to hacking with `npm run dev`. Make sure you have our `REMIX_TOKEN` (license) exported in your env somewhere so you can download the remix resources from the private npm registry.

## Getting started

Update the repository information in `package.json`. We use that to make a couple other things easier.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

`npm run dev` start remix server process and watchers
`npm run deploy:dev` deploys the full app stack (including remix) for the dev environment


## CI / CD Pipeline 

One of the great features of the CDK is the pipelines construct to build a pretty thourough experience to flow your CDK app from a source provider through to all your different envs.

Make sure you've configured the package.json `aws.piplines` section with the correct account and region. Then you'll need to boostrap things. (Only necessary for the first CDK app in this account / region.)

`npm run cdk bootstrap`

Add a `GITHUB_TOKEN` in Secrets Manager

Then once, and only once, you'll need to run `npm run deploy:pipeline`. Why only once? The pipeline stack is self-mutating on pushes to you main branch.

Everything is Infrastructure as Code (IaC) and self-contained in this repo.