#Check all images
docker images

#Build the Docker Image
docker build -t my-image .

#Remove All Unused Images
docker image prune -a

#Start the Containers. Run the following command to start the services defined in your Docker Compose file. The -d flag runs the containers in the background (detached mode).
docker-compose up -d

#Start the Containers. If you want to see logs live, omit -d.
docker-compose up

#Rebuild (if needed). If you made changes to your Dockerfile or the services and need to rebuild.
docker-compose up --build -d

#Stop the Containers. If you need to stop the services
docker-compose down

#Verify Running Containers. Check if your services started correctly.
docker ps

#Rebuild Docker images from scratch without using any cached layers
docker-compose build --no-cache

#Remove container
#Delete the Image Use the docker rmi command with the image name or ID
docker rmi my-image
#Or, if using the ID:
docker rmi abc123456789

#Force Remove the Image (if needed)
docker rmi -f how_to-laravel

#Check logs from a Docker service
#1. View logs for a running container
docker logs <container_name_or_id>
#2. Follow logs in real-time (like tail -f)
docker logs -f <container_name_or_id>
#3. View logs with timestamps
docker logs --timestamps <container_name_or_id>
#4. View last N lines
docker logs --tail=100 <container_name_or_id>
#5. For Docker Compose services
docker-compose logs <service_name>
#6. Follow logs in Docker Compose
docker-compose logs -f <service_name>
#7. View logs since specific time
docker logs --since 1h <container_name_or_id>
#8. View logs for a specific time period
docker logs --since 2025-08-05T20:00:00 --until 2025-08-05T21:00:00 <container_name_or_id>
