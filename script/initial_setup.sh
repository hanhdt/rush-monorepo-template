#!/bin/sh

# Configuration File Path
export GLOBAL_APP_CONFIG=$1

export AWS_ACCOUNT=$(cat $GLOBAL_APP_CONFIG | jq -r '.AWSAccountID') #ex> 123456789123
export AWS_REGION=$(cat $GLOBAL_APP_CONFIG | jq -r '.AWSProfileRegion') #ex> us-east-1
export AWS_PROFILE=$(cat $GLOBAL_APP_CONFIG | jq -r '.AWSProfileName') #ex> cdk-demo
export CDK_QUALIFIER=$(cat $GLOBAL_APP_CONFIG | jq -r '.QualifierCustom') #ex> hnb659fds

currntPWD=`pwd`
cd ${currntPWD}/source/

echo ==--------CheckDedendencies---------==
# npm install -g aws-cdk
aws --version
node --version
npm --version
cdk --version
rush version
pnpm --version
git --version
jq --version

echo ==--------ConfigInfo---------==
echo $GLOBAL_APP_CONFIG
echo $AWS_ACCOUNT
echo $AWS_REGION
echo $AWS_PROFILE
echo $CDK_QUALIFIER
echo .
echo .

echo ==--------BootstrapCDKEnvironment---------==
if [ -z "$AWS_PROFILE" ]; then
    cdk bootstrap aws://$AWS_ACCOUNT/$AWS_REGION --qualifier $CDK_QUALIFIER
else
    cdk bootstrap aws://$AWS_ACCOUNT/$AWS_REGION --profile $AWS_PROFILE --qualifier $CDK_QUALIFIER
fi
echo .
echo .

echo ==--------InstallPackages---------==
rush install
rush update
rush rebuild

echo .
echo .
