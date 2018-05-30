var aws = require('aws-sdk');
var ddb = new aws.DynamoDB({apiVersion: '2012-10-08'});

/**
 * Upon Cognito SignUp, a user is added to the DDB table
 *
 * Cognito event:
 * https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools-lambda-trigger-examples.html#aws-lambda-triggers-post-confirmation-example
 *
 * Writing to DDB:
 * https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/dynamodb-example-table-read-write.html
 *
 * Sample input:
 *
 {
    version:'1',
    region:'us-east-1',
    userPoolId:'us-east-1_9xasdfasdf3A',
    userName:'budilov@domain.com',
    callerContext:{
       awsSdkVersion:'aws-sdk-unknown-unknown',
       clientId:'1asdfasdfasdfasdf3hjjgp'
    },
    triggerSource:'PostConfirmation_ConfirmSignUp',
    request:{
       userAttributes:{
          sub:'4asdfasfa-944f-4444-9444-e644444444b',
          'cognito:user_status':'CONFIRMED',
          email_verified:'true',
          email:'budilov@domain.com'
       }
    },
    response:{
    }
 }
 * @param event
 * @param context
 */
exports.handler = async (event, context) => {
    console.log(event);

    let date = new Date();

    const tableName = process.env.TABLE_NAME;
    const region = process.env.REGION;

    console.log("table=" + tableName + " -- region=" + region);

    aws.config.update({region: region});

    // If the required parameters are present, proceed
    if (event.request.userAttributes.sub) {

        // -- Write data to DDB
        let ddbParams = {
            TableName: tableName,
            Item: {
                'userId': {S: event.request.userAttributes.sub},
                'sortKey': {S: "user"},
                'email': {S: event.request.userAttributes.email},
                'createdDate': {S: date.toISOString()},
                'firstLogin': {BOOL: true}
            }
        };

        // Call DynamoDB
        try {
            ddbResult = await ddb.putItem(ddbParams).promise();
            console.log("Success");
        } catch (err) {
            console.log("Error", err);
        }

        console.log("Success: Everything executed correctly")
        context.done(null, event);

    } else {
        // Nothing to do, the user's email ID is unknown
        console.log("Error: Nothing was written to DDB or SQS");
        context.done(null, event);
    }
};
