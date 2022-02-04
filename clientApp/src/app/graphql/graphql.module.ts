import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';

import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
const url = '<Your Url>';
const apiKey = '<Your Key>';
// <-- add the URL of the GraphQL server here

export function createAWSAppSyncClient() {
  return new AWSAppSyncClient({
    disableOffline: true,
    url,
    region: 'us-east-1',
    auth: {
      type: AUTH_TYPE.API_KEY,
      apiKey,

      // Lambda Authoriser
      // type: AUTH_TYPE.AWS_LAMBDA,
      // token: 'token',
    },
    cacheOptions: {},
  });
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createAWSAppSyncClient,
    },
  ],
})
export class GraphQLModule {}
