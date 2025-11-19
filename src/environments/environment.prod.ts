import packageInfo from '../../package.json';

export const environment = {
  appVersion: packageInfo.version,
  production: true,
  baseUrl : 'https://azureleaningapi-fcdedph0cdc8fcc6.centralindia-01.azurewebsites.net/api/v1/'
};
