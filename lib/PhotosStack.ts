import * as cdk from 'aws-cdk-lib'
import { Bucket, CfnBucket } from 'aws-cdk-lib/aws-s3'
import { Construct } from 'constructs'
import { CfnOutput, Fn } from 'aws-cdk-lib'

// export class PhotosStack extends cdk.Stack {
//   private stackSuffix: string
//   public readonly photosBucketArn: string

//   constructor(scope: Construct, id: string, props?: cdk.StackProps) {
//     super(scope, id, props)

//     this.initializeSuffix()

//     const photosBucket = new Bucket(this, 'PhotosBucket2', {
//       bucketName: `photos-bucket-${this.stackSuffix}`,
//     })
//     this.photosBucketArn = photosBucket.bucketArn
//   }

//   private initializeSuffix() {
//     const shortStackId = Fn.select(2, Fn.split('/', this.stackId))
//     this.stackSuffix = Fn.select(4, Fn.split('-', shortStackId))
//   }
// }

export class PhotosStack extends cdk.Stack {
  // step 1: create a private suffix name
  private stackSuffix: string
  public readonly photosBucketArn: string

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    // step 4: call the initializeSuffix function
    this.initializeSuffix()

    // step 5: use the suffix created for physical id
    const photosBucket = new Bucket(this, 'PhotosBucket2', {
      bucketName: `noi-photo-bucket-${this.stackSuffix}`,
    })
    this.photosBucketArn = photosBucket.bucketArn
    // console.log('🚀 ~~:', Fn.select(2, Fn.split('/', this.stackId)))
  }
  // step 2: initialize
  private initializeSuffix() {
    // step 3: get the second index of the stack id
    const shortStackId = Fn.select(2, Fn.split('/', this.stackId))
    this.stackSuffix = Fn.select(4, Fn.split('-', shortStackId))
    // console.log('🚀 ~ this.stackSuffix:', this.stackSuffix)
  }
}
