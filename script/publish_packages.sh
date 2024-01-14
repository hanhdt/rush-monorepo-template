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

echo ==--------BuildEnvironment---------==
# rush purge
rush install
rush update
rush rebuild

echo .
echo .

echo ==--------PublishServicePackages---------==
rush publish --apply --include-all --publish

echo .
echo .
echo "Publishing Packages Completed"

exit
