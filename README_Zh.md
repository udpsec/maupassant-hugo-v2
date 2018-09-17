# Maupassant
Maupassant theme, ported to Hugo.

1. 预览效果:[码中春秋's Blog](https://inofd.com/)
2. [English Docs](README.md)

一款非常简洁、性能高的Hugo主题，适配不同的设备（PC，Mobile等）。 主要是基于 Typecho [Cho](https://github.com/pagecho/maupassant/), 从 [飞雪无情的博客](https://github.com/rujews/maupassant-hugoo) forked，修改和添加了很多功能而成，如GA统计、最近的文章、标签云、自定义菜单、按日期归档等 .

## Preview

![Maupassant 主题预览](./preview.png "Maupassant 主题预览")



## 功能特性

1. 最近发表的文章支持，显示最近的10篇 
2. 分类支持，并且可以显示分类内的文章数量
3. 标签云支持
4. 一键回到页面顶部
5. RSS支持，并且可以自动发现RSS
6. 自定义菜单支持，不限个数，自定义排序
7. 自定义友情链接支持
8. 支持文章按年份日期进行归档
9. 支持GA分析统计
10. sitemap站点地图
11. 代码高亮
12. 404错误页
13. 支持关键字SEO优化
14. Google或者duckduckgo站内搜索-默认duckduckgo
15. See Also 支持
16. Disqus评论支持
17. 不蒜子页面计数器支持
18. TOC支持
19. gitalk评论支持
20. 默认表格美化
21. 进一步SEO支持
22. 首页添加日历
23. font awesome icon支持

## 下载安装

```bash
cd <YOUR Bolg Root Dir>
git clone https://github.com/udpsec/maupassant-hugo-v2.git themes/maupassant
```

## 配置

#### 应用主题

```toml
theme = "maupassant"
```

#### 基本配置

```toml
baseURL = "https://inofd.com"
languageCode = "zh-CN"
title = "码中春秋's Blog"
theme = "maupassant"

[author]
  name = "码中春秋"

[params]
  author = "码中春秋"
  subtitle = "专注于数字安全、网络安全、隐私保护、网络运维、Java"
  keywords = "码中春秋,博客,,inofd,java,python,项目管理,软件架构,网络安全,数字安全,隐私保护"
  description = "专注于IT互联网和数字安全，包括但不限于Java、Python、数字安全隐私保护等"
```

基本配置大家都比较熟悉，这是我的博客的配置，仅供参考。

#### 自定义菜单

```toml
[menu]
  [[menu.main]]
    identifier = "archives"
    name = "存档"
    url = "/archives/"
    weight = 2
  [[menu.main]]
    identifier = "about"
    name = "关于"
    url = "/about/"
    weight = 3
```

`identifier`标志符必须是唯一的，不能重复；`weight`用于排序，值越小越靠前。

#### 友情链接

```toml
# 友情链接
[[params.links]]
  title = "码中春秋"
  name = "码中春秋"
  url = "https://inofd.com/"
```

`params.links`是一个数组，所以我们可以自定义很多友情链接。`name`表示显示的链接文本，`title`表示鼠标悬停在友情链接时，显示的文本。

#### 添加GA分析统计

该主题已经支持了GA分析统计，只需要在`config.toml`配置里加入如下配置即可。
```toml
googleAnalytics = "GA ID"
```

#### 文章归档支持

Hugo默认是不支持生成归档文件的，需要自己实现。该主题已经实现了文章归档，只需要在新建`content/archives/index.md`文件，文件内容为：

```md
title: "归档"
description: 
type: archives
```

`title`和`description`都可以换成你自己的，但是`type`必须是`archives`。

`content/archives/index.md`表示在`content/archives/`目录下的`index.md`文件

#### Disqus

该主题支持Disqus评论，如果要启用Disqus，可以在`config.toml`里添加如下配置即可.

```toml
disqusShortname = "yourdiscussshortname"
```

**Gitalk**

在新建文章的formatter里面加入

```
gitalk: true
```

**config.toml配置**

```
[params]
clientID=''
clientSecret=''
owner=''
repo=''
admin=''
```

**TOC支持同上文在文章添加**

```
#默认不开启TOC 自己选择添加下面参数开启
TableOfContents: true
```

**文章链接 静态化**

```
#同样是在新建文章里添加日we期写新生成文章的日期后面的url就写自己文章的英文即可
url: /2018/06/16/manjaro-installer-beautify-config.html
```

#### 不蒜子页面计数器支持

该主题支持不蒜子这个极简的页面计数器支持，如果要启用不蒜子，可以在`config.toml`里添加如下配置即可.

```toml
[params]
  busuanzi = true
```

替换成你自己的Disqus名字即可。

#### 禁止分类的名称转为小写

我们在写文章的时候，会给文章进行分类，比如Golang，但是默认情况下，Hugo会把这个Golang转为小写，
这就我们一直用原始字符的造成困扰，为了解决这个问题，Hugo提供了`preserveTaxonomyNames`配置，把它设置为`true`就可以了保持原来分类的名字了。

```toml
## 保持分类的原始名字（false会做转小写处理）
preserveTaxonomyNames = true
```

#### 禁止URL路径小写

默认情况下，URL字符串里的字母都是小写的，这对于分类名、标签名是大写的来说，博客迁移后（比如从Hexo到Hugo），原来的链接就失效了，
为了解决这个问题，Hugo提供了`disablePathToLower`配置。

```toml
## 是否禁止URL Path转小写
disablePathToLower = true
```



## 贡献

欢迎大家贡献，不限于代码、Issue，功能特性，想法等等，期待看到你的PR或者ISSUE。

## 其他平台上的 Maupassant 主题

+ Typecho：https://github.com/pagecho/maupassant/
+ Octopress：https://github.com/pagecho/mewpassant/
+ Farbox：https://github.com/pagecho/Maupassant-farbox/
+ Wordpress：https://github.com/iMuFeng/maupassant/
+ Ghost: https://github.com/LjxPrime/maupassant/
+ Hexo: https://github.com/tufu9441/maupassant-hexo
+ Hugo: https://github.com/rujews/maupassant-hugo
