
1、Bump up logging level by editing kubectl edit deployment istio-policy -n istio-system, and adding --log_output_level=api:debug to mixer container, e.g.:
      - args:
        - --address
        - unix:///sock/mixer.socket
        - --configStoreURL=k8s://
        - --configDefaultNamespace=istio-system
        - --trace_zipkin_url=http://zipkin:9411/api/v1/spans
        - --log_output_level=api:debug
        
2、After observing the misbehavior, report the logs from policy mixer: 
kubectl logs -l istio-mixer-type=policy -n istio-system -c mixer


enable istio auto injection
kubectl label namespace default istio-injection=enabled

end!!!！
