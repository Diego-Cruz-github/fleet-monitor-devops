# Fleet Monitor DevSecOps Platform

[![AWS](https://img.shields.io/badge/AWS-Infrastructure-orange.svg)](https://aws.amazon.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-CDK-blue.svg)](https://aws.amazon.com/cdk)
[![Docker](https://img.shields.io/badge/Docker-Containerization-blue.svg)](https://docker.com)
[![Prometheus](https://img.shields.io/badge/Prometheus-Monitoring-red.svg)](https://prometheus.io)
[![Grafana](https://img.shields.io/badge/Grafana-Dashboards-orange.svg)](https://grafana.com)

## Enterprise Fleet Monitoring Platform

Real-time fleet monitoring system demonstrating complete DevSecOps expertise with AWS CDK TypeScript, Infrastructure as Code, containerization, and enterprise observability stack.

### Project Objectives

- **DevSecOps Excellence**: Security-first development with automated compliance
- **Infrastructure as Code**: AWS CDK TypeScript for complete infrastructure automation
- **Observability**: Prometheus + Grafana + CloudWatch integration
- **Enterprise CI/CD**: GitHub Actions + Jenkins with advanced workflows
- **Container Orchestration**: Docker + ECS production deployment
- **Security Integration**: Automated security scanning and compliance

### Architecture Overview

```
┌─────────────────┬─────────────────┬─────────────────┐
│   Frontend      │    Backend      │  Infrastructure │
│                 │                 │                 │
│ React TypeScript│ Node.js APIs    │ AWS CDK TypeScript
│ Real-time UI    │ Python Lambdas  │ CloudFormation  │
│ Mobile-first    │ PostgreSQL RDS  │ ECS + ECR       │
└─────────────────┴─────────────────┴─────────────────┘
┌─────────────────────────────────────────────────────┐
│              Observability Stack                   │
│                                                     │
│ Prometheus → Grafana → CloudWatch → X-Ray          │
│ Custom Metrics | Dashboards | AWS Native | Tracing │
└─────────────────────────────────────────────────────┘
```

### Technology Stack

**Infrastructure & DevOps:**
- AWS CDK TypeScript (Infrastructure as Code)
- Docker + Docker Compose (Containerization)
- ECS + ECR (Production orchestration)
- GitHub Actions (Primary CI/CD)
- Jenkins + Groovy (Advanced workflows)

**Monitoring & Observability:**
- Prometheus (Custom metrics collection)
- Grafana (Dashboard visualization)
- CloudWatch (AWS native monitoring)
- AWS X-Ray (Distributed tracing)

**Security:**
- AWS WAF (Web Application Firewall)
- IAM Policies (Least privilege access)
- Secrets Manager (Credential management)
- VPC + Security Groups (Network isolation)
- Security Scanning (Automated vulnerability assessment)

**Development:**
- Frontend: React TypeScript SPA
- Backend: Node.js + Python Lambda
- Database: PostgreSQL RDS + DynamoDB
- Testing: Jest + Pytest + Cypress

### Quick Start

#### Prerequisites
- AWS CLI configured with proper credentials
- Docker and Docker Compose installed
- Node.js 18+ and npm/yarn
- Python 3.9+
- Git

#### Local Development Setup

```bash
# Clone repository
git clone https://github.com/diegocruzo/fleet-monitor-devops
cd fleet-monitor-devops

# Install dependencies
npm install
cd infrastructure && npm install && cd ..
cd frontend && npm install && cd ..
cd backend && pip install -r requirements.txt && cd ..

# Start local development environment
docker-compose up -d

# Deploy infrastructure (requires AWS credentials)
cd infrastructure
npm run deploy
```

### Monitoring Dashboards

Access monitoring interfaces:
- **Grafana**: `http://localhost:3000` (admin/admin)
- **Prometheus**: `http://localhost:9090`
- **Fleet Dashboard**: `http://localhost:3001`
- **API Health**: `http://localhost:8000/health`

### Security Features

- **Security-First Development**: OWASP compliance verification
- **Automated Security Scanning**: Security tools integration in CI/CD
- **Infrastructure Security**: VPC isolation, Security Groups
- **Data Protection**: Encryption at rest and in transit
- **Compliance**: Automotive industry standards adherence

### Enterprise Simulation

This project simulates complete enterprise development lifecycle:
- Agile methodology (2-week sprints)
- Code review process (mandatory PR reviews)
- Quality assurance (automated testing)
- Documentation standards (enterprise-grade)
- Incident response procedures
- Performance monitoring and optimization

### Project Structure

```
fleet-monitor-devops/
├── infrastructure/          # AWS CDK TypeScript
├── frontend/               # React TypeScript SPA
├── backend/                # Node.js APIs + Python Lambdas
├── monitoring/             # Prometheus + Grafana configs
├── scripts/                # Deployment and utility scripts
├── docs/                   # Documentation
│   ├── ARCHITECTURE.md     # Technical architecture
│   ├── DEPLOYMENT.md       # Deployment procedures
│   ├── RUNBOOKS.md         # Operational procedures
│   └── SECURITY.md         # Security implementation
├── .github/workflows/      # CI/CD pipelines
├── docker-compose.yml      # Local development
└── Jenkinsfile            # Advanced CI/CD workflows
```

### Learning Outcomes

**Technical Skills:**
- AWS CDK TypeScript mastery
- Prometheus + Grafana expertise
- Container orchestration (Docker + ECS)
- CI/CD pipeline design
- Infrastructure as Code best practices
- Linux system administration

**DevOps Methodologies:**
- Security-first development (DevSecOps)
- Infrastructure automation
- Monitoring and observability
- Incident response procedures
- Performance optimization
- Documentation standards

### International Market Focus

Project designed for international DevSecOps opportunities:
- Enterprise-grade architecture
- Automotive industry domain knowledge
- Security specialization
- Remote collaboration practices
- English documentation standards

### Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Follow TDD practices for critical code
4. Ensure security compliance (security scans pass)
5. Update documentation
6. Submit pull request with detailed description

### Contact

**Diego Cruz** - DevSecOps Engineer  
- Portfolio: [www.diegofontedev.com.br](https://www.diegofontedev.com.br)
- LinkedIn: [www.linkedin.com/in/diegof90](https://www.linkedin.com/in/diegof90)

### License

This project is for portfolio demonstration purposes. All rights reserved.

---

**Achievement:** Complete DevSecOps platform demonstrating Infrastructure as Code, containerization, observability, and enterprise security practices for international market positioning.