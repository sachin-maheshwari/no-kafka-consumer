/**
 * Kafka consumer
 */
'use strict'

const Config = require('config')
const _ = require('lodash')
const Kafka = require('no-kafka')

const options = {
  groupId: Config.KAFKA_GROUP_ID,
  connectionString: Config.KAFKA_URL,
  handlerConcurrency: 1
}
if (Config.KAFKA_CLIENT_CERT && Config.KAFKA_CLIENT_CERT_KEY) {
  options.ssl = {
    cert: Config.KAFKA_CLIENT_CERT,
    key: Config.KAFKA_CLIENT_CERT_KEY
  }
}
const consumer = new Kafka.SimpleConsumer(options)

// message handler   
const messageHandler = (messageSet, topic, partition) => new Promise(function (resolve, reject) {
  _.map(messageSet, (m) => {
    const message = m.message.value.toString('utf8')
    console.log(`Handle Kafka event message; Topic: ${topic};`)
    console.log(`Partition: ${partition}; Offset: ${m.offset}; Message: ${message}.`)

    // dummy delay commit 
    setTimeout(() => {
      consumer.commitOffset({ topic, partition, offset: m.offset })
      console.log('commited now..')
      resolve(true) // resolving promise here 
    }, 100) // 100 ms 
  })

})


/**
 * Start Kafka consumer 
 * @param {Object} handlers  the handlers
 */
function startKafkaConsumer(topics) {
  consumer
    .init()
    .then(
      () => _.map(topics, (topic) => {
        console.log(`Subscribe topic: ${topic}`)
        consumer.subscribe(topic,{ time: Kafka.EARLIEST_OFFSET }, messageHandler)
      }
      )
    )
    .catch((err) => {
      Logger.error('Kafka Consumer failed');
      Logger.error(err);
    })
}

// execute consumer
startKafkaConsumer(Config.KAFKA_CONSUMER_TOPICS)