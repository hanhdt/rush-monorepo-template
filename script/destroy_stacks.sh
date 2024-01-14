#!/bin/bash

# Configuration File Path
export GLOBAL_APP_CONFIG=$1
export PROJECT_STAGE=$(cat $GLOBAL_APP_CONFIG | jq -r '.Environment') #ex> development
export SOLUTION_NAME=$(cat $GLOBAL_APP_CONFIG | jq -r '.Solution')
export APP_NAME=$(cat $GLOBAL_APP_CONFIG | jq -r '.App')

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
echo $AWS_PROFILE
echo $PROJECT_STAGE
echo $SOLUTION_NAME
echo $APP_NAME
echo .
echo .

# rush purge

echo .
echo .

echo ==--------DestroyStacks---------==
rush destroy-services

exit
