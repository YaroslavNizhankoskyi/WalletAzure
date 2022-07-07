// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  clientId: '8db57514-3ac4-431a-808e-e39a8e4041d5', 
  authority: '940a914e-05a6-4807-8e22-374cf7a71990', 
  redirectUri: 'https://localhost:4200',
  graphEndpoint: 'https://graph.microsoft.com/v1.0/me',
  cloudInstance: 'https://login.microsoftonline.com',
  cacheLocation: 'localStorage',
  permissions: 'user.read'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
