#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib'
import { PhotosStack } from '../lib/PhotosStack'
import { PhotosHandlerStack } from '../lib/PhotosHandlerStack'
import { BucketTagger } from './Tagger'

const app = new cdk.App()
const photosStack = new PhotosStack(app, 'PhotosStack')
new PhotosHandlerStack(app, 'PhotosHandlerStack', {
  targetBucketArn: photosStack.photosBucketArn,
})

// step 5: call the BucketTagger and add tag to all resources
const tagger = new BucketTagger('level', 'test environment')

// step 6: apply tagger to the whole application
cdk.Aspects.of(app).add(tagger)
