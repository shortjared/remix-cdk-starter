import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as RemixCdkStarter from '../lib/remix-cdk-starter-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new RemixCdkStarter.RemixCdkStarterStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
