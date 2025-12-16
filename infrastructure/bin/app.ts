#!/usr/bin/env node

/**
 * Fleet Monitor DevSecOps Platform
 * AWS CDK TypeScript Infrastructure as Code
 * 
 * This file serves as the entry point for the CDK application.
 * It defines multiple environments (dev, staging, prod) with proper
 * resource tagging, cost optimization, and security configurations.
 */

import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { FleetMonitorStack } from '../lib/fleet-monitor-stack';
import { FleetMonitorNetworkStack } from '../lib/fleet-monitor-network-stack';
import { FleetMonitorSecurityStack } from '../lib/fleet-monitor-security-stack';
import { FleetMonitorMonitoringStack } from '../lib/fleet-monitor-monitoring-stack';

const app = new cdk.App();

// Environment configuration
const environments = {
  dev: {
    account: process.env.CDK_DEFAULT_ACCOUNT || process.env.AWS_ACCOUNT_ID,
    region: process.env.CDK_DEFAULT_REGION || 'us-east-1',
  },
  staging: {
    account: process.env.CDK_DEFAULT_ACCOUNT || process.env.AWS_ACCOUNT_ID,
    region: process.env.CDK_DEFAULT_REGION || 'us-east-1',
  },
  prod: {
    account: process.env.CDK_DEFAULT_ACCOUNT || process.env.AWS_ACCOUNT_ID,
    region: process.env.CDK_DEFAULT_REGION || 'us-east-1',
  }
};

// Common tags for all resources
const commonTags = {
  Project: 'Fleet Monitor',
  Owner: 'Diego Cruz',
  Purpose: 'DevSecOps Portfolio Demonstration',
  Repository: 'https://github.com/diegocruzo/fleet-monitor-devops',
  ManagedBy: 'AWS CDK',
};

// Development Environment
const devNetworkStack = new FleetMonitorNetworkStack(app, 'FleetMonitorNetworkDev', {
  env: environments.dev,
  environmentName: 'dev',
  stackName: 'fleet-monitor-network-dev',
  tags: {
    ...commonTags,
    Environment: 'Development',
    CostCenter: 'Development',
  },
});

const devSecurityStack = new FleetMonitorSecurityStack(app, 'FleetMonitorSecurityDev', {
  env: environments.dev,
  environmentName: 'dev',
  vpc: devNetworkStack.vpc,
  stackName: 'fleet-monitor-security-dev',
  tags: {
    ...commonTags,
    Environment: 'Development',
    CostCenter: 'Development',
  },
});

const devMonitoringStack = new FleetMonitorMonitoringStack(app, 'FleetMonitorMonitoringDev', {
  env: environments.dev,
  environmentName: 'dev',
  stackName: 'fleet-monitor-monitoring-dev',
  tags: {
    ...commonTags,
    Environment: 'Development',
    CostCenter: 'Development',
  },
});

const devMainStack = new FleetMonitorStack(app, 'FleetMonitorDev', {
  env: environments.dev,
  environmentName: 'dev',
  vpc: devNetworkStack.vpc,
  securityGroup: devSecurityStack.securityGroup,
  stackName: 'fleet-monitor-dev',
  tags: {
    ...commonTags,
    Environment: 'Development',
    CostCenter: 'Development',
  },
});

// Dependencies
devSecurityStack.addDependency(devNetworkStack);
devMainStack.addDependency(devNetworkStack);
devMainStack.addDependency(devSecurityStack);
devMonitoringStack.addDependency(devMainStack);

// Staging Environment
const stagingNetworkStack = new FleetMonitorNetworkStack(app, 'FleetMonitorNetworkStaging', {
  env: environments.staging,
  environmentName: 'staging',
  stackName: 'fleet-monitor-network-staging',
  tags: {
    ...commonTags,
    Environment: 'Staging',
    CostCenter: 'Testing',
  },
});

const stagingSecurityStack = new FleetMonitorSecurityStack(app, 'FleetMonitorSecurityStaging', {
  env: environments.staging,
  environmentName: 'staging',
  vpc: stagingNetworkStack.vpc,
  stackName: 'fleet-monitor-security-staging',
  tags: {
    ...commonTags,
    Environment: 'Staging',
    CostCenter: 'Testing',
  },
});

const stagingMonitoringStack = new FleetMonitorMonitoringStack(app, 'FleetMonitorMonitoringStaging', {
  env: environments.staging,
  environmentName: 'staging',
  stackName: 'fleet-monitor-monitoring-staging',
  tags: {
    ...commonTags,
    Environment: 'Staging',
    CostCenter: 'Testing',
  },
});

const stagingMainStack = new FleetMonitorStack(app, 'FleetMonitorStaging', {
  env: environments.staging,
  environmentName: 'staging',
  vpc: stagingNetworkStack.vpc,
  securityGroup: stagingSecurityStack.securityGroup,
  stackName: 'fleet-monitor-staging',
  tags: {
    ...commonTags,
    Environment: 'Staging',
    CostCenter: 'Testing',
  },
});

// Dependencies
stagingSecurityStack.addDependency(stagingNetworkStack);
stagingMainStack.addDependency(stagingNetworkStack);
stagingMainStack.addDependency(stagingSecurityStack);
stagingMonitoringStack.addDependency(stagingMainStack);

// Production Environment
const prodNetworkStack = new FleetMonitorNetworkStack(app, 'FleetMonitorNetworkProd', {
  env: environments.prod,
  environmentName: 'prod',
  stackName: 'fleet-monitor-network-prod',
  tags: {
    ...commonTags,
    Environment: 'Production',
    CostCenter: 'Production',
    Backup: 'Required',
  },
});

const prodSecurityStack = new FleetMonitorSecurityStack(app, 'FleetMonitorSecurityProd', {
  env: environments.prod,
  environmentName: 'prod',
  vpc: prodNetworkStack.vpc,
  stackName: 'fleet-monitor-security-prod',
  tags: {
    ...commonTags,
    Environment: 'Production',
    CostCenter: 'Production',
    Backup: 'Required',
  },
});

const prodMonitoringStack = new FleetMonitorMonitoringStack(app, 'FleetMonitorMonitoringProd', {
  env: environments.prod,
  environmentName: 'prod',
  stackName: 'fleet-monitor-monitoring-prod',
  tags: {
    ...commonTags,
    Environment: 'Production',
    CostCenter: 'Production',
    Backup: 'Required',
  },
});

const prodMainStack = new FleetMonitorStack(app, 'FleetMonitorProd', {
  env: environments.prod,
  environmentName: 'prod',
  vpc: prodNetworkStack.vpc,
  securityGroup: prodSecurityStack.securityGroup,
  stackName: 'fleet-monitor-prod',
  tags: {
    ...commonTags,
    Environment: 'Production',
    CostCenter: 'Production',
    Backup: 'Required',
  },
});

// Dependencies
prodSecurityStack.addDependency(prodNetworkStack);
prodMainStack.addDependency(prodNetworkStack);
prodMainStack.addDependency(prodSecurityStack);
prodMonitoringStack.addDependency(prodMainStack);

// CDK Nag for security and compliance checks
import { AwsSolutionsChecks } from 'cdk-nag';
import { Aspects } from 'aws-cdk-lib';

Aspects.of(app).add(new AwsSolutionsChecks({ verbose: true }));