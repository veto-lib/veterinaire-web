export const environment = {
  production: true,
  api: 'https://docto-congo-back.herokuapp.com',
  p2p: 'https://docto-congo-p2p-www.herokuapp.com',
  auth: {
    tenantId: 'eae410ed-7a7e-451a-b931-636bbc191a74',
    clientId: '40cb24bc-81b4-44d7-9f96-2e2a089ce685',
    scope: 'openid profile email api://docto-congo/all',
    get issuer(): string {
      return `https://sts.windows.net/${this.tenantId}/v2.0`;
    }
  }
};
