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

#Remove container
#Delete the Image Use the docker rmi command with the image name or ID
docker rmi my-image
#Or, if using the ID:
docker rmi abc123456789

#Force Remove the Image (if needed)
docker rmi -f how_to-laravel
