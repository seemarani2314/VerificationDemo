To construct the docker image

With Docker, we can create images setting the parameters we need in a dockerfile.

ENTRYPOINT will specify the command the container will be using,
and CMD will be the parameters we are going to use with the executable.

docker build -t my-cypress-image:1.0.0 .

To Execute run the specific command
docker run -i -v "%cd%":/my-cypress-project -t my-cypress-image:1.0.0