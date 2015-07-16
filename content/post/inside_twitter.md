---
comments: true
date: 2015-07-17T01:06:11+09:00
draft: false
eyecatch: twitter-logo.png
tags: ['twitter', 'tech', 'tips']
title: Twitterの日本開発拠点立ち上げイベントに行ってきた
---

Twitterの日本開発拠点立ち上げイベントに参加させていただきました！  
講演で話していたことをまとめました。

あと、ごはんおいしかったです。  
コロナ飲み放題はビビリました。

----------
## Twitterのスケーラビリティ speaker:シニアディレクター

#### 日本の開発拠点
+ グローバルに展開しているTwitterというサービスの日本向けのサービスを作るために日本の開発部を新設した  
+ ニュース機能は日本向けに作った  

#### 処理・データの軽量化
+ サーバサイドの仕組みがあり、信頼性の低いネットワークで何度かリトライが走ってもツイートされるのは1つ
+ Google発のSPDYやWebPを使っている
+ SPDYではリクエストの優先順位もつけている
+ オフラインモードを導入しようとしている

## 日本向けの製品 speaker:プロダクトマネージャー

### 日本が重要な理由

#### Twitterでは日本は有用な国
ログインも一秒あたりのツイート数もトップクラス

### チームミッション
  + 日本のユーザーのことだけを考えてリリース
  + 日本初のグローバル機能
  + 例えばニュース機能

### ニュース機能
  + ios版で5つ目のタブ、ニュース機能の追加
  + ツイッター上で話題のニュース一覧
  + フォローしなくても見れる
  + 30代の男女がターゲット
  + ユーザーのツイートを見るための導線
  + 今後ニュース機能はもちろん、さまざまな機能を追加予定（2年分くらいのスケジュール）

### プロダクトの流れ
+ Twitter社は他社と比べても丁寧にユーザーの声を聞く
+ ユーザーの声を元に問題をピックアップし、ブレストしてアイデアをだす
+ その後、仕様策定して、デザインモックをつくり、ユーザーインタビューして、開発に入る
+ その後社内リリース、問題がなければA/Bテストとしてリリース

## エンジニアリング speaker:エンジニア
###  開発環境
+ Mac
+ git
+ JIRA
+ Confluence、Google Docs
+ IntelliJ、Xcode、Android Studio

### チーム
+ プロダクトマネージャー 1人
+ デザイナー 2人
+ エンジニア 5人
+ エンジニアマネージャー 1人
+ テクニカルプログラムマネジメント 1人

#### テクニカルプログラムマネジメント
+ アジャイルのコーチング
+ バグ見つけよう会の開催
+ 社内調整 

### コミュニケーション
+ メール
+ チャット
+ ミーティング
+ コードレビュー
+ テクニカルデザインドキュメント（後述）

### 一日の流れ
+ 9:30 出社、メール確認
+ 10:00 コードレビュー
+ 11:10 チームスタンドアップ エンジニアとデザイナーが一人30秒で昨日やったこと、今日やること、困ってること
+ 11:30 社内クラスのヨガ
+ 12:30 ランチ
+ 13:30 コーディング、レビュー
+ 15:30 マネージャーとの一対一ミーティング 16:30 コードレビューへの返答
+ 17:30 退社

### エンジニア目線のプロダクト
ユーザーリサーチの結果、案出しして、デザイナーのモックをレビューしつつ調整

#### テクニカルデザインドキュメント
テクニカルデザインドキュメントには、以下の項目を記載する

+ どういう問題を解決したいか
+ どうやって実装するか（複数提示し、選んだ理由も明記）
+ テストの方法
+ キャパシティ
+ システムとの依存関係
+ スケジュール

### コードレビュー
+ scalaとスマホではコードレビューの方法が違う  
+ アプリは二段階コードレビュー  
アプリのバグは二人目のレビューする人の責任  
+ 新機能の反応をツイッター上と数値で確認

## Q&A
### 給与体系は日本独自のものか？
+ 日本独自の部分はあるがレベル感としては世界と同じ

### ニュース機能のパーソナライズされてるか？
+ していない、みんな同じもの
+ 今後はパーソナライズしたい
+ ツイートごとの質を判別する機能を使っている

### 使うツールを選ぶ基準は？
+ 社員の声を聞いている メーリングリストや社内ツール上での議論  
   その上でセキュリティ等を判断して導入

### 日本の開発拠点は、本社とどうコラボするのか？
+ ローカライズして優れたプロダクトをリリースするためにはローカルのエンジニアオフィスをつくることが必要
+ いちから立ち上げたのは日本の開発拠点がはじめて

### エンジニアの役割は明確なのか？
+ テストはエンジニアが書く
+ スマホに関しては+αでテストする人がいる
+ 解析もエンジニアが個々にやるが専門チームもいる

### ニュース機能をなぜツイッターのアプリ上でだしたのか？
+ 別アプリだと新たなユーザーを確保するのが大変
+ タイムラインとは別の観点でツイートを見れる機能

###  社内で英語を使っているか？
+ 日本語がわからないメンバーがいれば全部英語
+ そうじゃなければ日本語でもいい
+ メールは英語

### リリースしたコードが全サーバーに行き渡る時間は？
+ 過去はRailsだったが、スケールしなくなったので、サービスが細分化してる
+ まず1台のサーバーにデプロイしてから徐々にデプロイしていく
+ またβユーザーみたいなステータスもある（A/Bテスト）

### 勤務時間を短くするためのシステム
+ 裁量労働制
+ 成果を出せば勤務時間は関係ない
+ ミーティングあるのにこないのはNGだが、エンジニアは基本的に自由