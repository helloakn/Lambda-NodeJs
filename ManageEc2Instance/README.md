#  Manage Ec2 Instance 
We have to create IAM policy for our lambda execution role.  
We have to create layour to save our key and secret. 
## SetUp IAM Role/Policy
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "statement2",
            "Effect": "Allow",
            "Action": [
                "logs:*"
            ],
            "Resource": "arn:aws:logs:*:*:*"
        },
        {
            "Sid": "VisualEditor1",
            "Effect": "Allow",
            "Action": [
                "ec2:*"
            ],
            "Resource": "*"
        },
        {
            "Sid": "statement2",
            "Effect": "Allow",
            "Action": "logs:CreateLogGroup",
            "Resource": "arn:aws:logs:*:*:*"
        }
    ]
}
```
## Deploy your layer 
To create a layer (console)  

Open the Layers page of the Lambda console.  

Choose Create layer.  

Under Layer configuration, for Name, enter a name for your layer.  

(Optional) For Description, enter a description for your layer.  

To upload your layer code, do one of the following:  

To upload a .zip file from your computer, choose Upload a .zip file. Then, choose Upload to select your local .zip file.  

To upload a file from Amazon S3, choose Upload a file from Amazon S3. Then, for Amazon S3 link URL, enter a link to the file.  

(Optional) For Compatible instruction set architectures, choose one value or both values.  

(Optional) For Compatible runtimes, choose up to 15 runtimes.  

(Optional) For License, enter any necessary license information.  

Choose Create.  

To create a layer (API)  

To create a layer, use the publish-layer-version command with a name, description, .zip file archive, a list of runtimes and a list of architectures that are compatible with the layer.   The runtimes and architecture parameters are optional.  
```
aws lambda publish-layer-version --layer-name my-layer --description "My layer"  \ 
--license-info "MIT" --content S3Bucket=lambda-layers-us-east-2-123456789012,S3Key=layer.zip \
 --compatible-runtimes python3.6 python3.7 python3.8
  --compatible-architectures "arm64" "x86_64" 
```

## Deploy your functions
### Deploy CreateInstance Function
```
zip CreateInstanceFunction.zip ./CreateInstance/index.js
aws lambda create-function --function-name CreateInstance \
--zip-file fileb://CreateInstanceFunction.zip --handler index.handler --runtime nodejs12.x \
--role arn:aws:iam::123456789012:role/lambda-ex
```
### Deploy StartInstance Function
```
zip StartInstanceFunction.zip ./StartInstance/index.js
aws lambda create-function --function-name StartInstance \
--zip-file fileb://StartInstanceFunction.zip --handler index.handler --runtime nodejs12.x \
--role arn:aws:iam::123456789012:role/lambda-ex
```
### Deploy StopInstance Function
```
zip StopInstanceFunction.zip ./StopInstance/index.js
aws lambda create-function --function-name StopInstance \
--zip-file fileb://StopInstanceFunction.zip --handler index.handler --runtime nodejs12.x \
--role arn:aws:iam::123456789012:role/lambda-ex
```

### attach layer
```
aws lambda update-function-configuration --function-name my-function \
--layers arn:aws:lambda:us-east-2:123456789012:layer:my-layer:3 \
arn:aws:lambda:us-east-2:210987654321:layer:their-layer:2
```

## Test
```
aws lambda invoke --function-name CreateInstance out --log-type Tail
```