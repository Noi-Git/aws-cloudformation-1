import * as cdk from 'aws-cdk-lib'
import { Bucket, CfnBucket } from 'aws-cdk-lib/aws-s3'
import { Construct } from 'constructs'
import { CfnOutput, Fn } from 'aws-cdk-lib'

export class PhotosStack extends cdk.Stack {
  private stackSuffix: string
  public readonly photosBucketArn: string

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    this.initializeSuffix()

    const photosBucket = new Bucket(this, 'PhotosBucket2', {
      bucketName: `noi-photo-bucket-${this.stackSuffix}`,
    })

    // export -- lecture 23
    this.photosBucketArn = photosBucket.bucketArn

    // reference aws resources
    // new CfnOutput(this, 'noi-photo-bucket', {
    //   value: photosBucket.bucketArn,
    //   exportName: 'noi-photo-bucket',
    // })
  }
  private initializeSuffix() {
    const shortStackId = Fn.select(2, Fn.split('/', this.stackId))
    this.stackSuffix = Fn.select(4, Fn.split('-', shortStackId))
  }
}
