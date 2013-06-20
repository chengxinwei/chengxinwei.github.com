---
layout: page
title: chengxinwei BLOG
---

{% include JB/setup %}


##最近文章#
{% for category in site.categories %} 
  <h2 id="{{ category[0] }}-ref">{{ category[0] | join: "/" }}</h2>
  <ul>
    {% assign pages_list = category[1] %}  
    {% include JB/pages_list %}
  </ul>
{% endfor %}

##MarkDown使用手册#

