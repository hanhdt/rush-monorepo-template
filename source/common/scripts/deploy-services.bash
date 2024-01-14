#!/bin/bash

set -e
if [[ "$DEBUG" == "true" ]]; then
  set -x
fi

echo ==--------ConfigInfo---------==
echo $GLOBAL_APP_CONFIG
echo $PROJECT_STAGE
echo .
echo .

cwd=$(dirname "$0")
root_dir=$(pwd)

deploy_setting_file="$root_dir/common/config/rush/deploy.json"
json=$(cat $deploy_setting_file)
projects_list=`echo $json | jq .deploymentProjectNames -r`
services_array=$(echo $projects_list | jq -r -c '.[]')

services_root="$root_dir/packages/services"
for service in $services_array; do
  arrIN=(${service//\// })
  cd $services_root/${arrIN[1]}
  export APP_CONFIG_DIR="$(pwd)/config"

  if [[ $PROJECT_STAGE == "dev" || $PROJECT_STAGE == "development" ]];
  then
    export NODE_ENV=development
    npm run deploy:dev
  elif [[ $PROJECT_STAGE == "prod" || $PROJECT_STAGE == "production" ]];
  then
    export NODE_ENV=production
    npm run deploy:prod
  else
    echo 'Please check your configuration file'
  fi
done

exit
