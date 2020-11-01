#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import * as project from '../package.json';

import { RemixAppStack } from '../cdk/app/stack';
import { RemixPipelineStack } from '../cdk/pipeline';

const app = new cdk.App();

new RemixAppStack(app, 'RemixApp', {});
new RemixPipelineStack(app, 'RemixAppPipeline', {
    env: {
        account: project.aws.pipeline.account,
        region: project.aws.pipeline.region
    }
});