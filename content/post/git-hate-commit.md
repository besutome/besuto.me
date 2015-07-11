---
date: "2015-07-09T16:12:23+09:00"
title: "git-hate-commit"
eyecatch: "/2015/07/Git-Icon-1788C1-300x3001.png"
tags: ["git", "programming"]
---


gitで速攻＆雑にコミットそれとかっこいいgit log
===============================================

### git-now

[git-now](https://github.com/iwata/git-now 'git-now')はコミットメッセージを勝手に現在時刻にして、コミットしてくれるコマンド。  
一時コミットするやつですね。  

とりあえずコミットするのは賛否両論ありますが、コミットしないリスクを考えると雑にでもコミットしたほうが良さげ。 

```
$ brew install git-now
```

Macならこれで入ります。設定は`~/.gitconfig`にこんな感じで。 

```
n  = now --all --stat
```

aliasの文字はご自由に。 これでaddからコミットまで自動でやってくれます。 



### tig 

[tigから git rebase -i したらいろいろ捗った](http://sue445.hatenablog.com/entry/2014/08/07/015811 'tigから git rebase -i したらいろいろ捗った')を参考に`tig`からrebaseをできるように。  
`tig`はターミナル上でコミットツリーをいいかんじにしてくれる。 

```
$ brew install tig
```

`tig`もこれでOK。 そして`~/.tigrc`に以下を記述します。   

```
bind main C !git rebase -i %(commit)
bind diff C !git rebase -i %(commit)
```

こちらも文字はご自由に。 自分はcommitのCにしてます。  
これでtig上のわかりやすいコミットツリーでrebaseできます。  
ちなみに選択したコミットより最新のものは全部編集できます。 


### git logs 

gitのデフォルトのlogって見にくいので、いろいろ試した結果これが一番かっこよくなります。   
これも`〜/.gitconfig`に記述。  
aliasもなんでもいいですが、logとかだと競合するので別のものがオススメ。   

```
logs = log --all --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --date=relative
```

こうすると 
```git
* 2fe4f9b - (HEAD -> master) [from now] 2015/07/09 07:58:32 (14 minutes ago) <名前>
* 85530f8 - (origin/master) [from now] 2015/07/09 03:17:49 (5 hours ago) <名前>
```
みたいな感じに出力されます。 tree表示されるので、ブランチごとの分岐もわかりやすいです。






