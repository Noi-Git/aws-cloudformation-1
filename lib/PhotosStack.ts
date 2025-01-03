import * as cdk from 'aws-cdk-lib'
import { Bucket, CfnBucket } from 'aws-cdk-lib/aws-s3'
import { Construct } from 'constructs'

export class PhotosStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    new Bucket(this, 'PhotosBucket', {
      // provide name for the bucket ourself instead of cdk randomly generated
      bucketName: 'noi-photosStack-skdlkdi',
    })
  }
}
