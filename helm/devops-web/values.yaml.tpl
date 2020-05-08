# Default values for at-crm-frontend.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.
env:
  VUE_APP_APISERVER: $VUE_APP_APISERVER
  BACKEN_API: $BACKEN_API
  BACKEN_PORT: $BACKEN_PORT
  BACKEN_SCHEMA: $BACKEN_SCHEMA
  WS_SCHEMA: $WS_SCHEMA
# secret:
#   SECRET_VAR_HERE: $AMQP_URLS

# Enable the app log in ELK
# MUST fill in custom.lable.scope and custom.lable.service at below
# that will be used as log index
log:
  elk:
    enabled: true

# Custom label for CI/CD and log use
custom:
  deployment:
    environment: $ENVIRONMENT
    hostname: $APP_HOSTNAME
    strategyType: $K8_DEPLOYMENT_STRATEGY # RollingUpdate / Recreate
  lable:
    scope: $SCOPE_NAME
    service: $SERVICE_NAME


# Enable istio proxy for this app
# if disable, you will miss tracing, traffic control feature provided by istio
# Suggest turn that on
istio:
  sidecar:
    inject: true
  gateway:
    name: $K8_GW_NAME

replicaCount: $K8_PODS_COUNT

image:
  repository: 'replaced_by_CICD'
  tag: 'replaced_by_CICD'
  pullPolicy: IfNotPresent
  imagePullSecrets: $K8S_REPO_PULL_SECRET


nameOverride: $STACK_NAME
fullnameOverride: $APP_NAME

pod:
  port: $APPLICATION_PORT

service:
  type: ClusterIP
  port: 80

ingress:
  enabled: false
  annotations: {}
    # kubernetes.io/ingress.class: nginx
    # kubernetes.io/tls-acme: "true"
  hosts:
    - host: $APP_NAME.local
      paths: ['/']

  tls: []
  #  - secretName: chart-example-tls
  #    hosts:
  #      - chart-example.local

resources: {}
  # We usually recommend not to specify default resources and to leave this as a conscious
  # choice for the user. This also increases chances charts run on environments with little
  # resources, such as Minikube. If you do want to specify resources, uncomment the following
  # lines, adjust them as necessary, and remove the curly braces after 'resources:'.
  # limits:
  #   cpu: 100m
  #   memory: 512Mi
  # requests:
  #   cpu: 100m
  #   memory: 256Mi

nodeSelector: {}

tolerations: []

affinity: {}
