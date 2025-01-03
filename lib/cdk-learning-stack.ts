import * as cdk from 'aws-cdk-lib'
import { Bucket, CfnBucket } from 'aws-cdk-lib/aws-s3'
import { Construct } from 'constructs'

class L3Bucket extends Construct {
  constructor(scope: Construct, id: string, expirations: number) {
    super(scope, id)

    new Bucket(this, 'L3Bucket', {
      lifecycleRules: [
        {
          expiration: cdk.Duration.days(expirations),
        },
      ],
    })
  }
}
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

    // second way -- create a L1 construct
    new CfnBucket(this, 'NoiL1Bucket', {
      lifecycleConfiguration: {
        rules: [
          {
            expirationInDays: 1,
            status: 'Enabled',
          },
        ],
      },
    })

    // call the L3Bucket
    new L3Bucket(this, 'NoiL3Bucket', 3)
  }
}
