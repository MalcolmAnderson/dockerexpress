docker rm node-app -f
docker build -t node-app-image .
# docker run -d -p 4000:3000 --name node-app node-app-image
#docker run -v $(pwd):/app:ro -v /app/node_modules  -p 4000:3000 -d --name node-app node-app-image
docker run -v $(pwd):/app:ro -v /app/node_modules --env PORT=2000  -p 4000:2000 -d --name node-app node-app-image
# docker exec -it node-app bash
