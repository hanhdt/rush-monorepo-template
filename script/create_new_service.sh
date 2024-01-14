#!/bin/bash

# Configuration File Path
export GLOBAL_APP_CONFIG=$1
export SERVICE_NAME=$2
export SOLUTION_NAME=$(cat $GLOBAL_APP_CONFIG | jq -r '.Solution')
export APP_NAME=$(cat $GLOBAL_APP_CONFIG | jq -r '.App')
export PROJECT_STAGE=$(cat $GLOBAL_APP_CONFIG | jq -r '.Environment') #ex> development

echo ==--------ConfigInfo---------==
echo "$GLOBAL_APP_CONFIG"
echo "Profile: $AWS_PROFILE"
echo "Env: $PROJECT_STAGE"
echo "Solution: $SOLUTION_NAME"
echo "App: $APP_NAME"
echo "Service: $SERVICE_NAME"
echo .
echo .

echo ==--------CreateServiceRepo---------==
currntPWD=`pwd`
cd ${currntPWD}/source/packages/services
mkdir $SERVICE_NAME
SAMPLE_REPO_DIR="${currntPWD}/source/packages/services/sample-service"
cd $SAMPLE_REPO_DIR
tar cf - --exclude="./dist" --exclude="./node_modules" --exclude="./cdk.out" . | (cd ${currntPWD}/source/packages/services/$SERVICE_NAME && tar xvf -)
echo .
echo .
exit