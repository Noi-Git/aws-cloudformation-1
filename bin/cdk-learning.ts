#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib'
import { PhotosStack } from '../lib/PhotosStack'

const app = new cdk.App()
new PhotosStack(app, 'PhotosStack', {})
