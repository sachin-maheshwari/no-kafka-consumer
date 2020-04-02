/**
 * The configuration file.
 */
module.exports = {
  LOG_LEVEL: process.env.LOG_LEVEL,
  KAFKA_URL: process.env.KAFKA_URL,
  KAFKA_GROUP_ID: process.env.KAFKA_GROUP_ID || 'sachin',
  KAFKA_CLIENT_CERT: process.env.KAFKA_CLIENT_CERT ? process.env.KAFKA_CLIENT_CERT.replace('\\n', '\n') : null,
  KAFKA_CLIENT_CERT_KEY: process.env.KAFKA_CLIENT_CERT_KEY ?
    process.env.KAFKA_CLIENT_CERT_KEY.replace('\\n', '\n') : null,
  KAFKA_CONSUMER_TOPICS: ["test.sachin"],
};
