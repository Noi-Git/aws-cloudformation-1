import { IAspect } from 'aws-cdk-lib'
import { CfnBucket } from 'aws-cdk-lib/aws-s3'
import { IConstruct } from 'constructs'

// === Built our own CDK Aspects ===
export class BucketTagger implements IAspect {
  // step 2: create key and value type as private
  private key: string
  private value: string

  // step 3: create constructor
  constructor(key: string, value: string) {
    this.key = key
    this.value = value
  }

  // step 1: add visit method
  visit(node: IConstruct): void {
    console.log('visiting: ', node.node.id)

    // step 4: add condition by checking type of CfnBucket
    if (node instanceof CfnBucket) {
      node.tags.setTag(this.key, this.value)
    }
    // throw new Error('Method not implemented.')
  }
}
