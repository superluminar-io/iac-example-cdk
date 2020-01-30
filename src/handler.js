const AWS = require('aws-sdk')
const client = new AWS.DynamoDB({ apiVersion: '2012-08-10' })

exports.run = async event => {
  const params = {
    TableName: process.env.TABLE_NAME,
    Key: {
      key: { S: event.key },
    },
  }

  return client.getItem(params).promise()
}
