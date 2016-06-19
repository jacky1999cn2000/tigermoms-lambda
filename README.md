# tigermom-lambda

### General Info
Each controller in `tigermom-koa` will be rewritten as an independent lambda function stored in a folder with the same name

### Test Lambda Function Locally
* [lambda-local](https://github.com/ashiina/lambda-local)

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
