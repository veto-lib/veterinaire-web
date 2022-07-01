// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api: 'http://localhost:3001',
  p2p: 'http://localhost:3000',
  auth: {
    tenantId: 'eae410ed-7a7e-451a-b931-636bbc191a74',
    clientId: '40cb24bc-81b4-44d7-9f96-2e2a089ce685',
    scope: 'openid profile email api://docto-congo/all',
    get issuer(): string {
      return `https://sts.windows.net/${this.tenantId}/v2.0`;
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
