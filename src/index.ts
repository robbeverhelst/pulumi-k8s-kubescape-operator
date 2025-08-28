import { config, Helm } from '@homelab/shared'

const cfg = config('kubescape-operator')

const kubescape = new Helm('kubescape-operator', {
  namespace: cfg.get('namespace', 'kubescape'),
  chart: 'kubescape-operator',
  repo: 'https://kubescape.github.io/helm-charts/',
  version: process.env.KUBESCAPE_VERSION || cfg.get('version'),
  values: {
    capabilities: {
      configurationScan: 'enable',
      continuousScan: 'enable',
      vulnerabilityScan: 'enable',
    },
    cloudConfig: {
      clusterName: cfg.get('clusterName', 'homelab'),
    },
    persistence: {
      enabled: true,
      storageClass: cfg.get('storageClass', 'truenas-hdd-mirror-iscsi'),
      accessMode: 'ReadWriteOnce',
      size: {
        backingStorage: cfg.get('storageSize', '5Gi'),
        kubevuln: cfg.get('storageSize', '5Gi'),
      },
    },
    resources: {
      requests: { cpu: '100m', memory: '256Mi' },
      limits: { cpu: '500m', memory: '1Gi' },
    },
  },
})

export const namespace = kubescape.namespace.metadata.name
export const release = kubescape.release.name
