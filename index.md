---
layout: page
title: chengxinwei BLOG
---


##最近文章#
{% for category in site.categories %} 
  <h1 id="{{ category[0] }}-ref">{{ category[0] | join: "/" }}</h1>
  <ul>
    {% assign pages_list = category[1] %}  
    {% include JB/pages_list %}
  </ul>
{% endfor %}


