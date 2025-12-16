/**
 * Fleet Monitor DevSecOps Platform
 * Network Stack - VPC, Subnets, and Network Security
 * 
 * This stack creates the foundational networking infrastructure:
 * - VPC with public and private subnets across AZs
 * - NAT Gateways for private subnet internet access
 * - Internet Gateway for public subnet access
 * - Route tables and security configurations
 */

import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';

export interface FleetMonitorNetworkStackProps extends cdk.StackProps {
  environmentName: string;
  stackName?: string;
}

export class FleetMonitorNetworkStack extends cdk.Stack {
  public readonly vpc: ec2.Vpc;
  public readonly publicSubnets: ec2.ISubnet[];
  public readonly privateSubnets: ec2.ISubnet[];

  constructor(scope: Construct, id: string, props: FleetMonitorNetworkStackProps) {
    super(scope, id, props);

    // VPC Configuration based on environment
    const vpcConfig = this.getVpcConfig(props.environmentName);

    // Create VPC with public and private subnets
    this.vpc = new ec2.Vpc(this, 'FleetMonitorVPC', {
      maxAzs: vpcConfig.maxAzs,
      cidr: vpcConfig.cidr,
      enableDnsHostnames: true,
      enableDnsSupport: true,
      natGateways: vpcConfig.natGateways,
      subnetConfiguration: [
        {
          cidrMask: 24,
          name: 'Public',
          subnetType: ec2.SubnetType.PUBLIC,
        },
        {
          cidrMask: 24,
          name: 'Private',
          subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
        },
        {
          cidrMask: 28,
          name: 'Isolated',
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
        },
      ],
    });

    // Store subnet references
    this.publicSubnets = this.vpc.publicSubnets;
    this.privateSubnets = this.vpc.privateSubnets;

    // VPC Flow Logs for security monitoring
    const flowLogRole = new cdk.aws_iam.Role(this, 'FlowLogRole', {
      assumedBy: new cdk.aws_iam.ServicePrincipal('vpc-flow-logs.amazonaws.com'),
      managedPolicies: [
        cdk.aws_iam.ManagedPolicy.fromAwsManagedPolicyName('CloudWatchLogsFullAccess'),
      ],
    });

    const flowLogGroup = new cdk.aws_logs.LogGroup(this, 'VPCFlowLogGroup', {
      logGroupName: `/aws/vpc/flowlogs/${props.environmentName}`,
      retention: this.getLogRetention(props.environmentName),
      removalPolicy: props.environmentName === 'prod' ? cdk.RemovalPolicy.RETAIN : cdk.RemovalPolicy.DESTROY,
    });

    new ec2.FlowLog(this, 'VPCFlowLog', {
      resourceType: ec2.FlowLogResourceType.fromVpc(this.vpc),
      destination: ec2.FlowLogDestination.toCloudWatchLogs(flowLogGroup, flowLogRole),
      trafficType: ec2.FlowLogTrafficType.ALL,
    });

    // VPC Endpoints for AWS Services (cost optimization and security)
    this.createVpcEndpoints();

    // Resource tagging
    cdk.Tags.of(this.vpc).add('Name', `FleetMonitor-VPC-${props.environmentName}`);
    cdk.Tags.of(this).add('StackType', 'Network');

    // CloudFormation outputs
    new cdk.CfnOutput(this, 'VpcId', {
      value: this.vpc.vpcId,
      description: 'Fleet Monitor VPC ID',
      exportName: `FleetMonitor-VPC-${props.environmentName}`,
    });

    new cdk.CfnOutput(this, 'VpcCidr', {
      value: this.vpc.vpcCidrBlock,
      description: 'Fleet Monitor VPC CIDR Block',
    });

    new cdk.CfnOutput(this, 'PublicSubnetIds', {
      value: this.publicSubnets.map(subnet => subnet.subnetId).join(','),
      description: 'Public Subnet IDs',
      exportName: `FleetMonitor-PublicSubnets-${props.environmentName}`,
    });

    new cdk.CfnOutput(this, 'PrivateSubnetIds', {
      value: this.privateSubnets.map(subnet => subnet.subnetId).join(','),
      description: 'Private Subnet IDs',
      exportName: `FleetMonitor-PrivateSubnets-${props.environmentName}`,
    });
  }

  /**
   * Get VPC configuration based on environment
   */
  private getVpcConfig(env: string) {
    const configs = {
      dev: {
        maxAzs: 2,
        cidr: '10.0.0.0/16',
        natGateways: 1, // Cost optimization for dev
      },
      staging: {
        maxAzs: 2,
        cidr: '10.1.0.0/16',
        natGateways: 1,
      },
      prod: {
        maxAzs: 3,
        cidr: '10.2.0.0/16',
        natGateways: 2, // High availability for production
      },
    };

    return configs[env as keyof typeof configs] || configs.dev;
  }

  /**
   * Get log retention based on environment
   */
  private getLogRetention(env: string): cdk.aws_logs.RetentionDays {
    const retentions = {
      dev: cdk.aws_logs.RetentionDays.ONE_WEEK,
      staging: cdk.aws_logs.RetentionDays.TWO_WEEKS,
      prod: cdk.aws_logs.RetentionDays.SIX_MONTHS,
    };

    return retentions[env as keyof typeof retentions] || retentions.dev;
  }

  /**
   * Create VPC Endpoints for AWS services to reduce costs and improve security
   */
  private createVpcEndpoints() {
    // S3 Gateway Endpoint (no cost)
    this.vpc.addGatewayEndpoint('S3Endpoint', {
      service: ec2.GatewayVpcEndpointAwsService.S3,
    });

    // DynamoDB Gateway Endpoint (no cost)
    this.vpc.addGatewayEndpoint('DynamoDBEndpoint', {
      service: ec2.GatewayVpcEndpointAwsService.DYNAMODB,
    });

    // ECR Interface Endpoints (for container image pulls)
    this.vpc.addInterfaceEndpoint('ECREndpoint', {
      service: ec2.InterfaceVpcEndpointAwsService.ECR,
    });

    this.vpc.addInterfaceEndpoint('ECRDockerEndpoint', {
      service: ec2.InterfaceVpcEndpointAwsService.ECR_DOCKER,
    });

    // CloudWatch Logs Interface Endpoint
    this.vpc.addInterfaceEndpoint('CloudWatchLogsEndpoint', {
      service: ec2.InterfaceVpcEndpointAwsService.CLOUDWATCH_LOGS,
    });

    // Secrets Manager Interface Endpoint
    this.vpc.addInterfaceEndpoint('SecretsManagerEndpoint', {
      service: ec2.InterfaceVpcEndpointAwsService.SECRETS_MANAGER,
    });
  }
}