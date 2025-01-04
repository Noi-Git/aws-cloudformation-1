import * as cdk from 'aws-cdk-lib'
import { Bucket, CfnBucket } from 'aws-cdk-lib/aws-s3'
import { Construct } from 'constructs'

export class PhotosStack extends cdk.Stack {
  // step 1: create a private suffix name
  private stackSuffix: string

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    // step 4: call the initializeSuffix function
    this.initializeSuffix()

    // step 5: use the suffix created for physical id
    new Bucket(this, 'PhotosBucket2', {
      bucketName: `noi-photo-bucket-overide-${this.stackSuffix}`,
    })
  }
  // step 2: initialize
  private initializeSuffix() {
    // step 3: get the second index of the stack id
    const shortStackId = cdk.Fn.select(2, cdk.Fn.split('/', this.stackId))
    const stackSuffix = cdk.Fn.select(4, cdk.Fn.split('-', shortStackId))
  }
}
