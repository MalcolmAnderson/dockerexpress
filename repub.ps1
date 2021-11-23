docker rm node-app -fv
docker build -t node-app-image .
# docker run -d -p 4000:3000 --name node-app node-app-image
# docker run -v $(pwd):/app:ro -v /app/node_modules  -p 4000:3000 -d --name node-app node-app-image
# docker run -v $(pwd):/app:ro -v /app/node_modules --env PORT=2000  -p 4000:2000 -d --name node-app node-app-image
docker run -v $(pwd):/app:ro -v /app/node_modules --env-file=./.env  -p 4000:2000 -d --name node-app node-app-image
# docker exec -it node-app bash

# docker-compose up -d
# docker-compose up -d --build
# docker-compose down -v

# docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml up -d (--build)
# docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml down -v

