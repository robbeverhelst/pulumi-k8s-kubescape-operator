# Kubescape Operator

This Pulumi stack deploys the Kubescape operator for comprehensive Kubernetes security scanning and compliance monitoring.

## Features

- **Configuration Scanning**: Scans Kubernetes manifests against security frameworks (NSA, CIS, MITRE ATT&CK)
- **Vulnerability Scanning**: Scans container images for known vulnerabilities
- **Runtime Security**: Monitors cluster runtime behavior and generates security profiles
- **Compliance Monitoring**: Continuous compliance checking against security benchmarks
- **Network Policy Generation**: Automatically generates network policies based on observed traffic
- **Scheduled Scans**: Daily configuration scans at 8 AM and vulnerability scans at midnight

## Configuration

### Environment Variables

- `KUBESCAPE_VERSION`: Helm chart version (optional)
- `KUBESCAPE_ACCOUNT_ID`: Account ID for ARMO platform integration (optional)
- `KUBESCAPE_ACCESS_KEY`: Access key for ARMO platform integration (optional)

### Pulumi Config

```yaml
config:
  kubescape-operator:namespace: "kubescape"
  kubescape-operator:clusterName: "homelab-prod"
  kubescape-operator:helmChartVersion: "1.20.1"
  kubescape-operator:storageClass: "truenas-hdd-mirror-iscsi"
  kubescape-operator:persistenceSize: "10Gi"
```

## Capabilities

### Enabled by Default
- Configuration scanning (NSA, CIS benchmarks)
- Node scanning and SBOM generation
- Vulnerability scanning with relevancy analysis
- Runtime observability and monitoring
- Network policy service
- Prometheus metrics export

### Available for Enablement
- Admission controller (webhook validation)
- Runtime threat detection
- Malware detection
- Advanced network monitoring

## Usage

### View Scan Results

```bash
# Get configuration scan results
kubectl get configurationscansummaries -A

# Get vulnerability scan results  
kubectl get vulnerabilitymanifestsummaries -A

# View runtime security profiles
kubectl get applicationprofiles -A
kubectl get networkneighborhoods -A
```

### Manual Scanning

```bash
# Trigger manual configuration scan
kubectl create job --from=cronjob/kubescape-scheduler manual-config-scan -n kubescape

# Trigger manual vulnerability scan  
kubectl create job --from=cronjob/kubevuln-scheduler manual-vuln-scan -n kubescape
```

### Monitoring

The operator exports Prometheus metrics when `prometheusExporter` is enabled. Integrate with your existing Grafana/Prometheus setup for dashboards and alerting.

## Security Considerations

- Kubescape requires elevated permissions to scan cluster resources
- Image vulnerability scanning can consume significant storage and compute resources
- Runtime monitoring uses eBPF and may impact performance on resource-constrained nodes
- Ensure network policies allow communication between Kubescape components

## Troubleshooting

```bash
# Check operator status
kubectl get pods -n kubescape

# View operator logs
kubectl logs -f deployment/operator -n kubescape

# Check scan job status
kubectl get jobs -n kubescape

# View scan results
kubectl describe configurationscansummary -A
kubectl describe vulnerabilitymanifestsummary -A
```