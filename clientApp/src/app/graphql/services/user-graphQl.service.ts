import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { Observable } from 'rxjs';
import {
  userQuery,
  createUserMutation,
  onCreateUserSubscription,
} from '../constants/user.constant';

@Injectable({
  providedIn: 'root',
})
export class UserGraphQLService {
  private userQueryRef!: QueryRef<any>;

  constructor(private apollo: Apollo) {}

  initiateUser(user: any): void {
    this.apollo
      .mutate({
        mutation: createUserMutation,
        variables: {
          user,
        },
      })
      .subscribe();
  }

  setUserQuery(id: any): void {
    this.userQueryRef = this.apollo.watchQuery({
      query: userQuery,
    });
    this.userQueryRef.subscribeToMore({
      document: onCreateUserSubscription,
      updateQuery: (prev, { subscriptionData }) => {
        console.log(prev, subscriptionData);
        if (!subscriptionData.data) {
          return prev;
        }
        const newMessage = subscriptionData.data.onAddMessage;
        prev.User.messages = [...prev.User.messages, newMessage];
        console.log(prev, 'prev');
        return prev;
      },
    });
  }

  get user$(): Observable<any> {
    return this.userQueryRef.valueChanges;
  }
}
