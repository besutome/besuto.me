---
comments: true
date: 2015-08-09T14:34:04+09:00
draft: true
eyecatch: .png
tags:
- ""
title: node module
---
## 解決
`mkdir node_modules`してから`npm install <module>`するとローカルインストールされた

## 原因
`npm install <module>`してもローカルインストールされない

なぜかグローバルじゃないのに`~/node_modules`にインストールされる
`nodebrew`使ってるせい？

参考：npmのグローバルインストールとローカルインストール
http://qiita.com/kijitoraneko/items/175ef29d45d155b3f405
