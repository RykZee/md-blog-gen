## Getting Started

## Build

This is meant to be built and run in a Docker container. Run the following command when standing in the root of the project.
`docker build -t md-blog-gen .`

To build for linux production machine.
`docker build --file Dockerfile.prod --platform linux/amd64 --tag <DOCKER_USERNAME>/md-blog-gen:x.y-linux .`

The docker hub repository is [here](https://hub.docker.com/repository/docker/sebastianzee/md-blog-gen/general)

## Run

Then run:
`docker run -d --rm --name blog -v "$(pwd)/app:/md-blog-gen/app" -p 80:3000 md-blog-gen`
