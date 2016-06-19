# tigermoms-lambda

### General Info
Each controller in `tigermom-koa` will be rewritten as an independent lambda function stored in a folder with the same name

### Test Lambda Function Locally
* [lambda-local](https://github.com/ashiina/lambda-local)
```javascript
lambda-local -l index.js -h handler -e mock/event.js
```

### Role
* Created a customized policy called "TigerMoms"
```javascript
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "Stmt1466317859000",
            "Effect": "Allow",
            "Action": [
                "dynamodb:BatchGetItem",
                "dynamodb:BatchWriteItem",
                "dynamodb:DeleteItem",
                "dynamodb:GetItem",
                "dynamodb:PutItem",
                "dynamodb:Query",
                "dynamodb:Scan"
            ],
            "Resource": [
                "arn:aws:dynamodb:us-west-2:817031825439:table/User"
            ]
        }
    ]
}
```
* Created a Role called "TigerMomsRole", and attached above policy
* In Lambda function's Configuration panel, select "TigerMomsRole"

### AWS API GATEWAY
* [How to create a Request object for your Lambda event from API Gateway](http://kennbrodhagen.net/2015/12/06/how-to-create-a-request-object-for-your-lambda-event-from-api-gateway/)
```javascript
{
  "body" : $input.json('$'),
  "headers": {
    #foreach($header in $input.params().header.keySet())
    "$header": "$util.escapeJavaScript($input.params().header.get($header))" #if($foreach.hasNext),#end

    #end
  },
  "method": "$context.httpMethod",
  "path": "$context.resourcePath",
  "params": {
    #foreach($param in $input.params().path.keySet())
    "$param": "$util.escapeJavaScript($input.params().path.get($param))" #if($foreach.hasNext),#end

    #end
  },
  "query": {
    #foreach($queryParam in $input.params().querystring.keySet())
    "$queryParam": "$util.escapeJavaScript($input.params().querystring.get($queryParam))" #if($foreach.hasNext),#end

    #end
  }  
}
```
* [Error handling in AWS API Gateway with Lambda](https://medium.com/@pahud/error-handling-in-aws-api-gateway-with-lambda-28fb86b3ea1e#.ti6kotqcr)
```javascript
.*status.*error.*
```
```javascript
#set($inputRoot = $input.path("$.errorMessage"))
$inputRoot
```
