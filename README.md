Author: Vladimir Budilov

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

#### Deployment/Setup

Run the following command to deploy the function:

`serverless deploy`

Go to your Cognito User Pool and assign the deployed Lambda 
function to the "Post confirmation" trigger: 

`General Settings --> Triggers --> Post Confirmation`

You're all set!    
