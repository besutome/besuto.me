---
comments: true
date: 2015-12-01T17:05:36+09:00
draft: false
eyecatch: meteorKitchen.png
tags: ['meteor', 'MeteorKitchen', 'Node.js', 'advent calendar2015']
title: MeteorKitchenで簡単アプリ構築
---

これは[Meteor Advent Calendar 2015](http://qiita.com/advent-calendar/2015/meteorjs)の初日(12/1)の投稿です。

今回はjsonファイルを記述するだけで、Node.jsのフレームワークであるMeteorのアプリケーションを構築できる[MeteorKitchen](http://www.meteorkitchen.com/)の紹介をしていきます。

### Meteorとは？

![Meteor](/images/meteor.png 'meteor')

Node.jsのフルスタックフレームワークです。  
https://www.meteor.com/

コマンド一発で開発環境構築やデプロイ、アプリ生成までできちゃうやつです。  
現状のフロントエンド周りのツール類はカオスなので、コマンド叩くだけで環境構築できるのは便利。  
もちろんその環境で、ES2015がデフォルトで使えます。  
ビルド周りも勝手にやってくれます。

ちなみに、Meoterのドキュメントを日本語に翻訳中です。  
http://meteor-fan.github.io/meteor-docs-ja/  
Basicのほうは完了しているので、参考にしてみてください。

### Meteor Kitchenとは？

jsonを記述するだけで、Meteorのアプリが構築できるツールです。  
jsonだけと聞くと簡単なものしか作れないように聞こえますが、複雑なアプリもつくることができます。

そのぶんjsonも複雑になるのであんまり変わらないかもしれませんが...

### インストールと実行

```sh
$ curl http://www.meteorkitchen.com/install | /bin/sh$ vim myapp.json$ meteor-kitchen myapp.json myapp$ cd myapp && meteor```

簡単ですね。  
適当なjsonファイルを編集して、`meteor-kitchen`コマンドで実行すると生成されます。  
下の`meteor`コマンドはMeteorの機能で、開発環境構築のためのコマンドです。

### Meteor Kitchenの利点

公式サイトに記載されているメリットは4つです。

1. Save time & money
2. Perfect for prototyping
3. High quality code
4. Write once - use many times

素早く構築できるので、お金と時間が節約できます。  
そのため、プロトタイピングに最適です。  
高品質なMeoterにコードが生成されます。  
書いたjsonファイルは使い回しができます。

みたいなことが書いてあります。  
基本的に一般的な自動生成ツールのメリットと同じですね。  
ただ後述しますが、時間とお金の節約になるかどうかは個人的には疑問です。

### json サンプル

jsonファイルのサンプルです。  
公式サイトにものってます。
http://www.meteorkitchen.com/getting_started

ちなみに、直でjsonを書くのではなく、yamlからjsonを生成する方法が推奨されています。  
さすがにこの規模を書くのは厳しいですしね。

```json
{
    "application": {
        "free_zone": {
            "pages": [
                { "name": "home", "title": "Home page" },
                { "name": "about", "title": "About" }
            ],

            "components": [
                {
                    "name": "main_menu",
                    "type": "menu",
                    "items": [
                        { "title": "Home page", "route": "home" },
                        { "title": "About", "route": "about" }
                    ]
                }
            ]
        }
    }
}
```

`pages`の中身が各ページごとの生成になっています。  
ここでは`components`以下に`main_menu`の記述がされています。  
`components`にはいろいろな要素（メニューやフォームなど）の要素を記載します。  


### 生成されるファイル

上記の`home`の要素から生成されるファイルは以下の3つです。

+ home.html
+ home.js
+ home_controller.js

ページ一つにつき、3ファイル生成されるのでわりと煩雑になります。  
ちなみに生成されるファイルの命名規則は、テンプレートがキャメルケース、それ以外がスネークケースとなっています。  
自分で追加実装する際は、その命名規則を守ったほうが良さそうです。

### フロントエンドフレームワーク

フロントエンドフレームワークは3種類から選べます。

+ [bootstrap3](http://getbootstrap.com/)
+ [semantic-ui](http://semantic-ui.com/)
+ [materialize](http://materializecss.com/)

デフォルトは`bootstrap3`です。

### jsonのいろいろな書き方

Meteor Kitchenは簡単なアプリだけではなく、複雑なアプリも構築できます。  
そのために必要な記述を紹介します。

#### collections

```json
{
    "collections": [
      {
        "name": "notes",
        "before_insert_code": "doc.name = Meteor.user() ? Meteor.user().profile.name : 'Anonymous'; return doc;",
        "owner_field": "createdBy",
        "roles_allowed_to_read": [],
        "roles_allowed_to_insert": [],
        "roles_allowed_to_update": [
          "owner"
        ],
        "roles_allowed_to_delete": [
          "owner"
        ]
      }
    ]
}
```

#### queries

```json
{
    "queries": [
      {
        "name": "current_user_data",
        "collection": "users",
        "filter": {
          "_id": "Meteor.userId()"
        },
        "find_one": true,
        "options": {}
        }
      }
}
```

#### components

```json
{
          "components": [
            {
              "name": "side_menu",
              "type": "menu",
              "class": "nav nav-stacked nav-pills",
              "items": [
                {
                  "title": "Profile",
                  "route": "user_settings.profile"
                },
                {
                  "title": "Change password",
                  "route": "user_settings.change_pass"
                }
              ]
            }
          ]
}
```

上記を見ての通りmongodbへのクエリなど、jsonファイルだけとはいえ、カスタマイズできる部分は多いです。  

ですが、ここまで複雑にjsonファイルを書くのであれば、普通にコードを書いても変わらないような気がしています。  
Metoer Kitchen独自の機能も覚えなくてはいけませんし、1ページに対して3ファイル生成されるのも大げさな感じです。

ここでは記載していませんでしたが、Oauthやユーザーロールによるアクセス制限まで実装できるので、作れるアプリの幅は相当広いです。

### まとめ

+ jsonだけでMeteorのアプリ構築
+ 表現の幅が結構大きい
+ 学習コストはそこそこ高い
+ 実運用するには、わりと手直しが必要

上記のように、実際に導入するには非常に微妙なラインのツールであるという印象を持っています。  
ですが、ポテンシャルは感じられ、アップデートによって改善されていくと非常に使えるのではないかと思います。  

Meteor Kitchenのコードが非公開なのが気になりますが、今後公開する予定みたいです。  
(Meteorがオープンソースなので、Metoer Kitchenもさっさと公開して欲しい)

また、公式で示されているメリットの通り、コードそのものよりもjsonで記述されている方が汎用性はあるので、適材適所で利用していくのがいいかもしれません。

公式の[Example](http://www.meteorkitchen.com/examples)にのっているサンプルアプリに似たプロトタイプを構築したい場合は積極的に使っていいと思います。  
サンプル数も意外と多いので、プロトタイピングに使えるものも多いです。

---

初日は[@besutome](https://twitter.com/besutome)でした。  
明日は、[n-oshiroさん](http://qiita.com/n-oshiro)で、「meteorのdeployコマンドについて(仮)」です。
