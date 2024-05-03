## Getting Started

This is meant to be built and run in a Docker container. Run the following command when standing in the root of the project.
`docker build -t md-blog-gen .`

Then run:
`docker run -d --rm --name blog -v "$(pwd)/app:/md-blog-gen/app" -p 80:3000 md-blog-gen`
