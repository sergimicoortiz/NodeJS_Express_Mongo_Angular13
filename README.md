# Docker

##### En caso de que no se encuentre solo debe entrar en la rama main_docker_compose y ahí tendra directamente los archivos de configuración del docker

##### Archivo de configuración de docker-compose con todo explicado en comentarios dentro del propio archivo
#### Command: docker-compose up --build
##### En caso de el anterior commando no funcionar pruebe a usar sudo

https://github.com/sergimicoortiz/NodeJS_Express_Mongo_Angular13/blob/main_docker_compose/docker-compose.yml

##### Archivo Dokerfile explicado en comentarios dentro del propio archivo

https://github.com/sergimicoortiz/NodeJS_Express_Mongo_Angular13/blob/main_docker_compose/frontend/Dockerfile

##### Archivo de configuración de prometheus

https://github.com/sergimicoortiz/NodeJS_Express_Mongo_Angular13/blob/main_docker_compose/prometheus.yml

##### Archivo de configuración de grafana

https://github.com/sergimicoortiz/NodeJS_Express_Mongo_Angular13/blob/main_docker_compose/datasources.yml

##### Archivo nginx.conf donde esta la configuración de Load Balancer

https://github.com/sergimicoortiz/NodeJS_Express_Mongo_Angular13/blob/main_docker_compose/loadbalancer/nginx.conf


#### Una vez este el contenedor lanzado puede probar las siguientes URL
- Lista de URLS del proyecto
    - localhost:8080 -> Puerto para acceder al frontend(LoadBalancer activado)
    - localhost:8080/api/products -> Puerto para acceder al backend de products(LoadBalancer activado)
    - localhost:9090 -> Puerto para acceder al panel de Prometheus
    - localhost:3500 -> Puerto para acceder al panel Grafana
    - localhost:8081 -> Puerto para acceder al panel de mongo-express