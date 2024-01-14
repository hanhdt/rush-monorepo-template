# Welcome to your CDK TypeScript project

You should explore the contents of this project. It demonstrates a CDK app with an instance of a stack (`p2-dashboard-cdf-[env]-canframesRestApi-stack`)

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Share bootstrapping with AWS CDK Toolkit

```bash
  $cdk bootstrap aws://<account>/<region>
```

## Useful commands

* `npm run build`           compile typescript to js
* `npm run watch`           watch for changes and compile
* `npm run test`            perform the BDD tests with Cucumber.js
* `npm run deploy`          deploy this stack to your default AWS account/region
* `npm run cdk diff`        compare deployed stack with current state
* `npm run cdk synth`       emits the synthesized CloudFormation template

## Test framework

We are using Cucumber.js for BDD testing. The tests are located in the `test` folder.
