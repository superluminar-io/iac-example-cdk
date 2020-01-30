import * as Lambda from '@aws-cdk/aws-lambda'
import * as DynamoDB from '@aws-cdk/aws-dynamodb'
import * as cdk from '@aws-cdk/core'

import * as path from 'path'

class ExampleStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const exampleTable = new DynamoDB.Table(this, 'ExampleTable', {
      partitionKey: { name: 'key', type: DynamoDB.AttributeType.STRING },
    })

    const exampleFunction = new Lambda.Function(this, 'ExampleFunction', {
      runtime: Lambda.Runtime.NODEJS_12_X,
      code: Lambda.Code.fromAsset(path.resolve(__dirname, 'src')),
      handler: 'handler.run',
      environment: {
        TABLE_NAME: exampleTable.tableName,
      },
    })

    exampleTable.grantReadData(exampleFunction)
  }
}

const app = new cdk.App()
new ExampleStack(app, 'ExampleStack', { env: { region: 'us-east-1' } })

app.synth()
