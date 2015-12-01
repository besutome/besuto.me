---
comments: true
date: 2015-08-12T01:33:36+09:00
draft: true
eyecatch: .png
tags:
- ""
title: smartphone debug
---

## ローカル環境をスマホでデバッグ 
+ ngnok
+ USBで繋いでデバッグ

### USBで繋いでデバッグ
1. Macとスマホを同じネットワークに接続
2. MacでCharlesを立ち上げる
3. スマホのプロキシをlocalhost:9000に設定
4. スマホの設定画面から開発者向けオプションを有効化し、USBデバッグも有効化
5. chromeでchrome://inspect/#devicesに接続、Discover USB deviceを有効化
6. スマホでchromeを開き、Macはchrome://inspect/#devicesからLet's debug!
