/* What the platform supports natively, from its MCP providers
 * (martian/mcp/src/providers: aws, azure, gcp, vcenter, ssh) plus custom MCP
 * servers. Every item here gets inventory, utilization and approved changes. Keep
 * this list honest: anything only shown in the demo catalog doesn't belong here. */

export type Environment = { name: string; logo: string; detail: string };
export type Service = { name: string; logo: string; env: string };

export const ENVIRONMENTS: Environment[] = [
  { name: "Amazon Web Services", logo: "/logos/aws.svg", detail: "Every account and region you grant a role in" },
  { name: "Microsoft Azure", logo: "/logos/azure.svg", detail: "Subscriptions, through a managed identity" },
  { name: "Google Cloud", logo: "/logos/gcp.svg", detail: "Projects, through workload identity" },
  { name: "VMware vCenter", logo: "/logos/vmware.svg", detail: "Hosts, VMs and datastores in your data centers" },
  { name: "Linux and Unix servers", logo: "/logos/linux.svg", detail: "Over SSH, from a connector on your network" },
  { name: "Any MCP server", logo: "/logos/mcp.svg", detail: "Your own tools, over Streamable HTTP" },
];

export const SERVICES: Service[] = [
  { name: "EC2 instances", logo: "/logos/aws-ec2.svg", env: "AWS" },
  { name: "EBS volumes and snapshots", logo: "/logos/aws.svg", env: "AWS" },
  { name: "RDS databases", logo: "/logos/aws-rds.svg", env: "AWS" },
  { name: "Load balancers", logo: "/logos/aws-elb.svg", env: "AWS" },
  { name: "NAT gateways", logo: "/logos/aws-vpc.svg", env: "AWS" },
  { name: "Auto Scaling groups", logo: "/logos/aws.svg", env: "AWS" },
  { name: "CloudWatch metrics", logo: "/logos/aws-cloudwatch.svg", env: "AWS" },
  { name: "Cost Explorer", logo: "/logos/aws.svg", env: "AWS" },
  { name: "Virtual machines", logo: "/logos/azure.svg", env: "Azure" },
  { name: "Managed disks", logo: "/logos/azure.svg", env: "Azure" },
  { name: "Azure Monitor metrics", logo: "/logos/azure.svg", env: "Azure" },
  { name: "Compute Engine", logo: "/logos/gcp.svg", env: "Google Cloud" },
  { name: "Persistent disks", logo: "/logos/gcp.svg", env: "Google Cloud" },
  { name: "Cloud Monitoring", logo: "/logos/gcp.svg", env: "Google Cloud" },
  { name: "ESXi hosts", logo: "/logos/vmware.svg", env: "vCenter" },
  { name: "Virtual machines", logo: "/logos/vmware.svg", env: "vCenter" },
  { name: "Datastores", logo: "/logos/vmware.svg", env: "vCenter" },
  { name: "File shares and duplicate files", logo: "/logos/linux.svg", env: "SSH" },
];
