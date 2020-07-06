#!/usr/bin/env bash
cd dist
git init 
git remote add origin git@gitee.com:zhuiyue132/editor.git
git add .
git commit -m 'build'
git push -u origin master