import { Stack, StackProps, Duration, RemovalPolicy } from 'aws-cdk-lib';
import { Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import { RestApi, LambdaIntegration, Resource } from 'aws-cdk-lib/aws-apigateway';
import * as ddb from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';
import { TypeScriptCode } from "@mrgrain/cdk-esbuild";
import { BuildConfig } from './buildConfig';

export class CanframesRestApiStack extends Stack {
  private restAPI: RestApi;
  private canframesResource: Resource;
  private getCanframesFunction: Function;
  private getCanframeFunction: Function;
  private createCanframeFunction: Function;
  private updateCanframeFunction: Function;
  private deleteCanframeFunction: Function;


  constructor(scope: Construct, id: string, props: StackProps, buildConfig: BuildConfig) {
    super(scope, id, props);
  
    // crate a dynamodb table
    const canframesTableName = buildConfig.Parameters.CanframesTableName;
    const canframesTable = new ddb.Table(this, 'CanframesApiTable', {
      tableName: canframesTableName,
      partitionKey: { name: 'id', type: ddb.AttributeType.STRING },
      sortKey: { name: 'year', type: ddb.AttributeType.STRING },
      removalPolicy: RemovalPolicy.DESTROY
    })

    const getCanframesCode = new TypeScriptCode('src/getCanframesHandler.ts', {
      buildOptions: {
        bundle: true,
        treeShaking: true,
        external: ['aws-sdk'],
      },
    });

    const getCanframeCode = new TypeScriptCode('src/getCanframeHandler.ts', {
      buildOptions: {
        bundle: true,
        treeShaking: true,
        external: ['aws-sdk'],
      }
    });

    const createCanframeCode = new TypeScriptCode('src/createCanframeHandler.ts', {
      buildOptions: {
        bundle: true,
        treeShaking: true,
        external: ['aws-sdk'],
      }
    });

    const updateCanframeCode = new TypeScriptCode('src/updateCanframeHandler.ts', {
      buildOptions: {
        bundle: true,
        treeShaking: true,
        external: ['aws-sdk'],
      }
    });

    const deleteCanframeCode = new TypeScriptCode('src/deleteCanframeHandler.ts', {
      buildOptions: {
        bundle: true,
        treeShaking: true,
        external: ['aws-sdk'],
      }
    });

    this.getCanframesFunction = new Function(this, 'getCanframes', {
      functionName: `${buildConfig.Solution}-${buildConfig.App}-getCanframes-${buildConfig.Environment}`,
      runtime: Runtime.NODEJS_16_X,
      code: getCanframesCode,
      handler: 'getCanframesHandler.handler',
      memorySize: 512,
      timeout: Duration.seconds(10),
      environment: {
        LOG_LEVEL: buildConfig.Parameters.LogLevel,
        DYNAMODB_TABLE_CANFRAMES: buildConfig.Parameters.CanframesTableName,
      }
    });

    this.getCanframeFunction = new Function(this, 'getCanframe', {
      functionName: `${buildConfig.Solution}-${buildConfig.App}-getCanframe-${buildConfig.Environment}`,
      runtime: Runtime.NODEJS_16_X,
      code: getCanframeCode,
      handler: 'getCanframeHandler.handler',
      memorySize: 512,
      timeout: Duration.seconds(10),
      environment: {
        LOG_LEVEL: buildConfig.Parameters.LogLevel,
        DYNAMODB_TABLE_CANFRAMES: buildConfig.Parameters.CanframesTableName,
      }
    });

    this.createCanframeFunction = new Function(this, 'createCanframe', {
      functionName: `${buildConfig.Solution}-${buildConfig.App}-createCanframe-${buildConfig.Environment}`,
      runtime: Runtime.NODEJS_16_X,
      code: createCanframeCode,
      handler: 'createCanframeHandler.handler',
      memorySize: 512,
      timeout: Duration.seconds(10),
      environment: {
        LOG_LEVEL: buildConfig.Parameters.LogLevel,
        DYNAMODB_TABLE_CANFRAMES: buildConfig.Parameters.CanframesTableName,
      }
    });
    
    this.updateCanframeFunction = new Function(this, 'updateCanframe', {
      functionName: `${buildConfig.Solution}-${buildConfig.App}-updateCanframe-${buildConfig.Environment}`,
      runtime: Runtime.NODEJS_16_X,
      code: updateCanframeCode,
      handler: 'updateCanframeHandler.handler',
      memorySize: 512,
      timeout: Duration.seconds(10),
      environment: {
        LOG_LEVEL: buildConfig.Parameters.LogLevel,
        DYNAMODB_TABLE_CANFRAMES: buildConfig.Parameters.CanframesTableName,
      }
    });

    this.deleteCanframeFunction = new Function(this, 'deleteCanframe', {
      functionName: `${buildConfig.Solution}-${buildConfig.App}-deleteCanframe-${buildConfig.Environment}`,
      runtime: Runtime.NODEJS_16_X,
      code: deleteCanframeCode,
      handler: 'deleteCanframeHandler.handler',
      memorySize: 512,
      timeout: Duration.seconds(10),
      environment: {
        LOG_LEVEL: buildConfig.Parameters.LogLevel,
        DYNAMODB_TABLE_CANFRAMES: buildConfig.Parameters.CanframesTableName,
      }
    });

    // defines Rest API gateway with one CRUD methods
    this.restAPI = new RestApi(this, 'CanframeAPI', {
      restApiName: `${buildConfig.Solution}-${buildConfig.App}-CanframeAPI-${buildConfig.Environment}`,
    });

    this.canframesResource = this.restAPI.root.addResource('canframes');
    this.canframesResource.addMethod('GET', new LambdaIntegration(this.getCanframesFunction, {}));
    this.canframesResource.addMethod('POST', new LambdaIntegration(this.createCanframeFunction, {}));
    this.canframesResource.addMethod('PUT', new LambdaIntegration(this.updateCanframeFunction, {}));
    this.canframesResource.addMethod('DELETE', new LambdaIntegration(this.deleteCanframeFunction, {}));
    this.canframesResource.addResource('{vinId}').addMethod('GET', new LambdaIntegration(this.getCanframeFunction, {}));

    // grant the lambda role read/write permissions to our table
    canframesTable.grantReadWriteData(this.getCanframesFunction);
    canframesTable.grantReadWriteData(this.getCanframeFunction);
    canframesTable.grantReadWriteData(this.createCanframeFunction);
    canframesTable.grantReadWriteData(this.updateCanframeFunction);
    canframesTable.grantReadWriteData(this.deleteCanframeFunction);
  }
}

export default CanframesRestApiStack;
