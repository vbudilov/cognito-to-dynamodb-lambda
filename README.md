Author: [Vladimir Budilov](https://www.linkedin.com/in/vbudilov/)
Find me on [Medium](https://medium.com/@budilov)

### Copy users from Cognito to DynamoDB

This AWS Lambda function automates the backup of newly-confirmed 
Amazon Cognito users to Amazon DynamoDB. This can be useful in many scenarios, 
especially when trying to tie in user-specific data to the actual users. 
For example, if you're using AWS AppSync you can query for user events 
and automatically retrieve the user info without calling an external 
service. 

#### Prerequisites

1. [Serverless framework](https://serverless.com/framework/docs/providers/aws/)
2. Create your 'Users' DynamoDB table
3. Create your Cognito User Pool
4. Setup your CLI credentials
5. Modify the following 3 variables in the serverless.yml file to fit your needs (the user pool name is the name you gave it during creation):
```
  myRegion: us-east-1
  myDDB: Users
  myPool: my-userpool-name
```
6. By default the code assumes that your composite keys are 'userId' and 'sortKey'. Make sure you either change the code or change your DDB table (preferrably the former), otherwise this Lambda function will keep on failing. 
```
            'userId': {S: event.request.userAttributes.sub},
            'sortKey': {S: "user"},
```
#### Deployment/Setup

Run the following command to deploy the function:

`serverless deploy`

You're all set!    
