# Builds production version of Community App inside Docker container,
# and runs it against the specified Topcoder backend (development or
# production) when container is executed.

FROM node:8.2.1
LABEL app="no-kafka-lib" version="1.0"

WORKDIR /opt/app
COPY . .
RUN npm install
RUN npm install dotenv --save
RUN npm test
