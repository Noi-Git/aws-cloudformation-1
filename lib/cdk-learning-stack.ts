import * as cdk from 'aws-cdk-lib'
import { Bucket } from 'aws-cdk-lib/aws-s3'
import { Construct } from 'constructs'
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkLearningStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    //use CDK construct to create AWS s3 bucket
    // first way -- create an L2 bucket and set to expired in 2 days
    new Bucket(this, 'NoiL2Bucket', {
      lifecycleRules: [
        {
          expiration: cdk.Duration.days(2),
        },
      ],
    })
  }
}
