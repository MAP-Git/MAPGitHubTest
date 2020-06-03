import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http'; 

export interface IHelloWorldProps {
  description: string;
  spcontect : SPHttpClient;
}
