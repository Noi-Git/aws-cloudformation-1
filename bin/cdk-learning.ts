#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib'
import { CdkLearningStack } from '../lib/cdk-learning-stack'

const app = new cdk.App()
new CdkLearningStack(app, 'CdkLearningStack', {})
