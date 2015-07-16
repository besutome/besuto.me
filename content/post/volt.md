---
comments: true
date: 2015-07-15T14:14:01+09:00
draft: false
eyecatch: volt.png
tags: ["programming", "ruby", "volt"]
title: フロントもサーバーもrubyで完結するフレームワークのvoltを触ってみた
---


## voltとは

rubyのフレームワークで、フロントもサーバーもrubyで書いちゃおうってやつです。  
javascriptの実装は[Opal](http://opalrb.org/ 'Opal')を使っているみたいです。  
全体的に小難しくなく、直感的に書けるので、学習コストも余りかからないですね。

あとなぜか、ドキュメントがいい感じに日本語訳されてます。  
自然な日本語で読みやすいです。  

知名度があまりない中で、日本語ドキュメントが充実してるのは非常にありがたいです。

http://voltframework.com/docs

## チュートリアル

せっかくなのでチュートリアルやってみました。  
まずはインストール。

```
gem install volt
```

そのあとはプロジェクト作成。

```
volt new sample_project
```

`cd`で作成したプロジェクトに移動して、サーバー立ち上げ。

```
bundle exec volt server
```

コンソールには以下のコマンドでアクセスできます。

```
bundle exec volt console
```

詳しくはドキュメントのチュートリアルを見て欲しいんですが、コントローラではルーティング処理をしていて、ロジックはほぼhtml上で記述しています。  
この実装でとくに考えずともwebsocketが使えます。

`app/main/views/main/main.html`  
タグにシンボルが使われていることや、{{}}内部がrubyということがわかればそんなに難しくない感じです。

```html
<:Title>
  {{ view main_path, "title", {controller_group: 'main'} }}

<:Body>
  <div class="container">
    <div class="header">
      <ul class="nav nav-pills pull-right">
        <:nav href="/">Home</:nav>
        <:nav href="/todos">Todos</:nav>
        <:nav href="/about">About</:nav>
        <:user_templates:menu />
      </ul>
      <h3 class="text-muted">sample_project</h3>
    </div>

    <:volt:notices />

    {{ view main_path, 'body', {controller_group: 'main'} }}

    <div class="footer">
      <p>&copy; Company {{ Time.now.year }}</p>
    </div>

  </div>

<:Nav>
  <li class="{{ if active_tab? }}active{{ end }}">
    <a href="{{ attrs.href }}">{{ yield }}</a>
  </li>
```

`app/main/views/main/todos.html`  
以下の記述で、websocketが使えます。楽ちん。

```html
<:Title>
  Todos

<:Body>
  <div class="row">
    <div class="col-md-4">

      <h1>{{ _todos.size }} Todo List</h1>

      <button e-click="check_all">Check All ({{ incomplete }})</button>

      <div class="progress">
        <div class="progress-bar" role="progressbar" style="width: {{ percent_complete }}%;" >
          {{ percent_complete }}%
        </div>
      </div>

      <table class="todo-table">
        {{page._todos.each_with_index do |todo, index| }}
        <!-- Use params to store the current index -->
        <tr
          e-click="params._index = index"
          class="{{ if (params._index || 0).to_i == index }}selected{{ end }}"
          >
          <td><input type="checkbox" checked="{{ todo._completed }}" /></td>
          <td class="{{ if todo._completed }}complete{{ end }}">{{ todo._name }}</td>
          <td><button e-click="todo.destroy">X</button></td>
        </tr>
        {{ end }}
      </table>

      <form e-submit="add_todo" role="form">
        <div class="form-group">
          <label>Todo</label>
          <input class="form-control" type="text" value="{{ page._new_todo }}" />
        </div>
      </form>
    </div>

    <!-- Display extra info -->
    <div class="col-md-8">
      {{ if current_todo }}
      <h2>{{ current_todo._name }}</h2>

      <textarea>{{ current_todo._description }}</textarea>
      {{ end }}
    </div>
  </div>
```

`app/main/controllers/main_controller.rb`  
ルーティングの処理とtodoの追加の処理ですね。

```ruby
# By default Volt generates this controller for your Main component
module Main
  class MainController < Volt::ModelController
    def index
      # Add code for when the index view is loaded
    end

    def about
      # Add code for when the about view is loaded
    end

    private

    # The main template contains a #template binding that shows another
    # template.  This is the path to that template.  It may change based
    # on the params._component, params._controller, and params._action values.
    def main_path
      "#{params._component || 'main'}/#{params._controller || 'main'}/#{params._action || 'index'}"
    end

    # Determine if the current nav component is the active one by looking
    # at the first part of the url against the href attribute.
    def active_tab?
      url.path.split('/')[1] == attrs.href.split('/')[1]
    end

    def add_todo
      page._todos << { name: page._new_todo }
      page._new_todo = ''
    end

    def current_todo
      page._todos[(params._index || 0).to_i]
    end
  end
end
```

サクッとした説明ですが、良さは伝わったでしょうか？  
日本語でドキュメントが充実しているので、どんどんいじってみてください！
