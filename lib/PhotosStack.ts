import * as cdk from 'aws-cdk-lib'
import { Bucket, CfnBucket } from 'aws-cdk-lib/aws-s3'
import { Construct } from 'constructs'

export class PhotosStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    new Bucket(this, 'PhotosBucket', {
      // provide name for the bucket ourself instead of cdk randomly generated
      bucketName: 'noi-photos-stack-skdlkdi3453',
    })

    // === Overide logical ID created when creating stack
    const myBucket = new Bucket(this, 'PhotosBucket2', {
      bucketName: 'noi-photo-bucket-overide-23443',
    })

    ;(myBucket.node.defaultChild as CfnBucket).overrideLogicalId(
      'noi-photo-bucket-2-4l3k4'
    )
  }
}
