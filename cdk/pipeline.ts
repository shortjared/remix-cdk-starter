import { RemixAppStack } from "./app/stack"

import { Construct, Stage, Stack, StackProps, StageProps } from '@aws-cdk/core';
import { CdkPipeline, SimpleSynthAction } from '@aws-cdk/pipelines';
import * as codepipeline from '@aws-cdk/aws-codepipeline';
import * as codepipeline_actions from '@aws-cdk/aws-codepipeline-actions';
import * as cdk from "@aws-cdk/core"


// pull repo information from package.json!
import * as project from "../package.json"
const repoOwner = project.repository.url.split('/')[3];
const repoName = project.repository.url.split('/')[4];
 
class RemixApplication extends Stage {
    constructor(scope: Construct, id: string, props?: StageProps) {
        super(scope, id, props);

        const remixStack = new RemixAppStack(this, 'RemixApp');
    }
}

export class RemixPipelineStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const sourceArtifact = new codepipeline.Artifact();
        const cloudAssemblyArtifact = new codepipeline.Artifact();

        const pipeline = new CdkPipeline(this, 'RemixPipeline', {
            // Only required to be set to true for Multi-Account Deployments
            // https://docs.aws.amazon.com/cdk/api/latest/docs/pipelines-readme.html#a-note-on-cost
            cloudAssemblyArtifact,
            crossAccountKeys: false,
            sourceAction: new codepipeline_actions.GitHubSourceAction({
                actionName: 'GitHub',
                output: sourceArtifact,
                oauthToken: cdk.SecretValue.secretsManager('GITHUB_TOKEN'),
                // Replace these with your actual GitHub project name
                owner: repoOwner,
                repo: repoName,
                branch: 'main', // default: 'master'
            }),

            synthAction: SimpleSynthAction.standardNpmSynth({
                sourceArtifact,
                cloudAssemblyArtifact,

                // Optionally specify a VPC in which the action runs
                // vpc: new ec2.Vpc(this, 'NpmSynthVpc'),

                // Use this if you need a build step (if you're not using ts-node
                // or if you have TypeScript Lambdas that need to be compiled).
                buildCommand: 'npm run build',
            })
        });


        // Do this as many times as necessary with any account and region
        // Account and region may different from the pipeline's.
        pipeline.addApplicationStage(new RemixApplication(this, 'Dev', {
            env: {
                account: process.env.AWS_ACCOUNT_ID,
                region: 'us-east-1',
            }
        }));

        pipeline.addApplicationStage(new RemixApplication(this, 'Prod', {
            env: {
                account: process.env.AWS_ACCOUNT_ID,
                region: 'us-east-1',
            }
        }));
    }
}
