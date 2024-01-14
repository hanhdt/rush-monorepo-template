#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import path from 'path';
import '@hanhdt/config-inject';
import { CanframesRestApiStack } from './canframesRestApiStack';
import { BuildConfig } from './buildConfig';
import { name } from '../package.json';

const app = new cdk.App();

function ensureString(object: { [name: string]: any }, propName: string): string {
  if (process.env[propName]) {
    return process.env[propName] || '';
  }

  if (!object[propName] || object[propName].trim().length === 0) {
    process.emitWarning(`${propName} does not exist or is empty globally`);
  }

  return object[propName];
}

function getConfig(): BuildConfig {
  const env = app.node.tryGetContext('config');
  if (!env) {
    throw new Error('Context variable missing on CDK command. Please pass in as -c config=<XXX>');
  }

  const appConfigJSON = require(path.resolve(`../../../../config/app-config-${env}.json`));
  const unparsedEnv = appConfigJSON || app.node.tryGetContext(env);

  const buildConfig: BuildConfig = {
    AWSAccountID: ensureString(unparsedEnv, 'AWSAccountID'),
    AWSProfileName: ensureString(unparsedEnv, 'AWSProfileName'),
    AWSProfileRegion: ensureString(unparsedEnv, 'AWSProfileRegion'),

    Solution: ensureString(unparsedEnv, 'Solution'),
    Environment: ensureString(unparsedEnv, 'Environment'),
    App: ensureString(unparsedEnv, 'App'),
    Version: ensureString(unparsedEnv, 'Version'),
    Build: ensureString(unparsedEnv, 'Build'),

    Parameters: {
      LogLevel: ensureString(unparsedEnv, 'LogLevel'),
      LambdaInsightsLayer: ensureString(unparsedEnv, 'LambdaInsightsLayer'),
      ExternalApiUrl: ensureString(unparsedEnv, 'ExternalApiUrl'),
      CanframesTableName: ensureString(unparsedEnv, 'CanframesTableName'),
    }
  };

  return buildConfig;
}

async function main() {
  const buildConfig: BuildConfig = getConfig();

  const serviceName = name.replace('@', '').replace('/', '-');
  const canframesRestApiStackName = `${buildConfig.Solution}-${buildConfig.App}-${serviceName}-stack-${buildConfig.Environment}`;

  cdk.Tags.of(app).add('App', `${buildConfig.Solution}-${buildConfig.App}`);
  cdk.Tags.of(app).add('Environment', buildConfig.Environment);
  cdk.Tags.of(app).add('Service', serviceName);

  new CanframesRestApiStack(app, canframesRestApiStackName, {
    env: {
      region: buildConfig.AWSProfileRegion,
      account: buildConfig.AWSAccountID,
    },
  }, buildConfig);
}

main();