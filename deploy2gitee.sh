#!/usr/bin/env bash
cd dist
git init 
git remote add origin git@gitee.com:zhuiyue132/editor.git
git add .
git commit -m 'build'
git push -u origin master

curl -X POST --header 'Content-Type: application/json;charset=UTF-8' 'https://gitee.com/api/v5/repos/zhuiyue132/editor/pages/builds' -d '{"access_token":"cbd22cb7634a7b825fad1e8158c9f7a2"}'