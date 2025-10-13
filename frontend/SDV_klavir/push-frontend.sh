docker build -t sdv_klavir_frontend .
docker tag sdv_klavir_frontend banana4242/sdv_klavir_frontend:latest
docker push  banana4242/sdv_klavir_frontend:latest