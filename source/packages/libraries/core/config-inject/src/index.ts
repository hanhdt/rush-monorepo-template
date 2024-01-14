import { config } from 'dotenv-flow';
import dotenv from 'dotenv';

// APP_CONFIG contains list of environment variables 
// This will be loaded first
if (process.env.APP_CONFIG) {
  const result = dotenv.parse(process.env.APP_CONFIG)
  console.log(`Loaded from APP_CONFIG: ${JSON.stringify(result)}`)
  Object.assign(process.env, result)
}

// APP_CONFIG_DIR is specified in cloudformation definition of lambda and npm run start of the services
// This will populate any value that is not specified by APP_CONFIG with default value (dotenv.load functionality)
const fileLocations = [
  process.env.APP_CONFIG_DIR + '/.env.defaults',
  process.env.APP_CONFIG_DIR + '/.env.local',
  process.env.APP_CONFIG_DIR + '/.env.development',
  process.env.APP_CONFIG_DIR + '/.env.production'
];

const config_location: string = process.env.CONFIG_LOCATION !== undefined ? process.env.CONFIG_LOCATION : '';
if ((config_location.length ?? 0) > 0) {
  console.log(`Loading config from ${config_location}`)
  fileLocations.push(config_location);
}

// load(fileLocations);
config({
  node_env: process.env.NODE_ENV || 'development',
  default_node_env: 'development',
  path: process.env.APP_CONFIG_DIR,
});

console.log(`Module config-inject loaded config:`);
console.log(process.env);