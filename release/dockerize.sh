docker login -u $DOCKER_USER -p $DOCKER_PWD
docker build -f release/Dockerfile -t iancl/pi_auth_server .
mkdir -p ./tmp/
docker save -o ./tmp/iancl_pi_auth_server.tar iancl/pi_auth_server
docker push iancl/pi_auth_server