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
# docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml up -d --build -V 
# docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml down -v

# docker volume ls // show docker volumes

# docker exec -it dockerexpress_mongo_1 mongo -u "mba" -p "mba"
# show dbs
# use mybd
# db.books.insert({"name": "harry potter"})
# db.books.find()

# docker logs container_name
# docker logs container_name -f (follow i.e. tail command)
# docker inspect container_name
# docker network ls
# docker network inspect network_name



