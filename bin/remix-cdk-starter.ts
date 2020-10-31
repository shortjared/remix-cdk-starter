#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { RemixCdkStarterStack } from '../lib/remix-cdk-starter-stack';

const app = new cdk.App();
new RemixCdkStarterStack(app, 'RemixCdkStarterStack');
