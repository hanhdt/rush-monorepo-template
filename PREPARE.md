# PREPARE

## jq

```sh
$sudo apt update
$sudo apt install -y jq
```

## aws-cli

```sh
$curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"   
$unzip awscliv2.zip   
$sudo ./aws/install   
$/usr/local/bin/aws --version   
aws-cli/2.11.2 Python/3.11.2 Linux/4.14.305-227.531.amzn2.x86_64 exe/x86_64.amzn.2 prompt/off     
```

## nodejs

```sh
$nvm install 16
$nvm use 16
Now using node v16.19.1 (npm v8.19.3)

$node --version
v16.19.1
```

## pnpm

```sh
npm install -g npm@9.6.1
npm install -g pnpm@6.4.0    
```

## git

```sh
$git --version
git version 2.39.2
```

## rush

```bash
$git config --global user.name "sample"
$git config --local user.email "mrexample@users.noreply.github.com"
$npm install -g @microsoft/rush
$git clone https://github.com/microsoft/rushstack
$cd rushstack
$rush update
$rush rebuild
$rush build
$rush rebuild --verbose
```

## aws profile(if necessary)

```bash
aws configue
cat ~/.aws/credentials
[defaule]
aws_access_key_id=xxx
aws_secret_access_key=yyy
aws_session_token=zzz
```
