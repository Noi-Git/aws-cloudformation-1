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

    const myL4Bucket = new Bucket(this, 'MyL4bucket', {
      lifecycleRules: [{ expiration: cdk.Duration.days(2) }],
    })

    // find bucket name using console.log
    console.log('🚀 ~ myL4Bucket:', myL4Bucket.bucketName)

    // find bucket name using CfnOutput()
    new cdk.CfnOutput(this, 'MyL4BucketName', {
      value: myL4Bucket.bucketName,
    })

    // add expiration day to the MyL5Bucket using parameter
    const duration = new cdk.CfnParameter(this, 'duration', {
      default: 6,
      minValue: 1,
      maxValue: 10,
      type: 'Number',
    })

    const myL5Bucket = new Bucket(this, 'MyL5bucket', {
      lifecycleRules: [
        { expiration: cdk.Duration.days(duration.valueAsNumber) },
      ],
    })

    // run : cdk deploy <-- will get the result expiration day is 6
    // run : cdk deploy --parameters duration=9 <-- will get the result expiration day is 9

    /* === use cdk destroy <name of your bucket in this case the name is CdkLearningStack === >
           --- cdk destroy CdkLearningStack
    
      - this command will not delete s3 bucket created with L2 or L3 level 
        --- those s3 bucket need to be deleted manually on the console
      - *** be careful === don't delete the bucket that have -assets- this on is created by cdk
        --- if you delete this one 
        --- you will not be able to delete any thing else 
    */
  }
}
