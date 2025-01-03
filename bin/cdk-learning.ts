#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib'
import { PhotosStack } from '../lib/PhotosStack'
import { Bucket } from 'aws-cdk-lib/aws-s3'

const app = new cdk.App()
new Bucket(app, 'PhotosStack', {
  // provide name for our bucket instead of have it randomly egnerated
  bucketName: 'noi-photosbucket-slkdki',
})
