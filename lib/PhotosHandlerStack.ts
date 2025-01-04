import { Construct } from 'constructs'
import * as cdk from 'aws-cdk-lib'
import { Fn } from 'aws-cdk-lib'

export class PhotosHandlerStack extends cdk.Stack {
  public readonly photosBucketArn: string

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)
  }
}
