function showpageCount(a){for(var e,s=home_page_url,n=new Array,t=1,r=1,l=0,p=0,o=0,i="",h="",g="",u=0;e=a.feed.entry[u];u++){var m=e.published.$t.substring(0,19)+e.published.$t.substring(23,29);timestamp=encodeURIComponent(m);var d=e.title.$t;""!=d&&(0==l||l%pageCount==pageCount-1)&&(-1!=s.indexOf(timestamp)&&(t=r),""!=d&&r++,n[n.length]="/search?updated-max="+timestamp+"&max-results="+pageCount),l++}for(var c=0;c<n.length;c++)c>=t-displayPageNum-1&&c<t+displayPageNum&&(0==p&&c==t-2&&(h=2==t?'<span class="showpage"><a href="/">'+upPageWord+"</a></span>":'<span class="showpage"><a href="'+n[c]+'">'+upPageWord+"</a></span>",p++),i+=c==t-1?'<span class="showpagePoint">'+t+"</span>":0==c?'<span class="showpageNum"><a href="/">1</a></span>':'<span class="showpageNum"><a href="'+n[c]+'">'+(c+1)+"</a></span>",0==o&&c==t&&(g='<span class="showpage"> <a href="'+n[c]+'">'+downPageWord+"</a></span>",o++));t>1&&(i=""+h+" "+i+" "),i='<div class="showpageArea"><span style="COLOR: #000;" class="showpageOf"> Pages ('+(r-1)+")</span>"+i,r-1>t&&(i+=g),1==r&&r++,i+="</div>";var f=document.getElementsByName("pageArea"),b=document.getElementById("blog-pager");2>=r&&(i="");for(var c=0;c<f.length;c++)f[c].innerHTML=i;f&&f.length>0&&(i=""),b&&(b.innerHTML=i)}function showpageCount2(a){var e=home_page_url,s=new Array,n=-1!=e.indexOf("/search/label/"),t=n?e.substr(e.indexOf("/search/label/")+14,e.length):"";t=-1!=t.indexOf("?")?t.substr(0,t.indexOf("?")):t;for(var r,l=1,p=1,o=0,i=0,h=0,g="",u="",m="",d='<span class="showpageNum"><a href="/search/label/'+t+"?&max-results="+pageCount+'">',e=home_page_url,c=0;r=a.feed.entry[c];c++){var f=r.published.$t.substring(0,19)+r.published.$t.substring(23,29);timestamp=encodeURIComponent(f);var b=r.title.$t;""!=b&&(0==o||o%pageCount==pageCount-1)&&(-1!=e.indexOf(timestamp)&&(l=p),""!=b&&p++,s[s.length]="/search/label/"+t+"?updated-max="+timestamp+"&max-results="+pageCount),o++}for(var w=0;w<s.length;w++)w>=l-displayPageNum-1&&w<l+displayPageNum&&(0==i&&w==l-2&&(u=2==l?d+upPageWord+"</a></span>":'<span class="showpage"><a href="'+s[w]+'">'+upPageWord+"</a></span>",i++),w==l-1?g+='<span class="showpagePoint">'+l+"</span>":0==w?g=d+"1</a></span>":g+='<span class="showpageNum"><a href="'+s[w]+'">'+(w+1)+"</a></span>",0==h&&w==l&&(m='<span class="showpage"> <a href="'+s[w]+'">'+downPageWord+"</a></span>",h++));l>1&&(g=n?""+u+" "+g+" ":""+u+" "+g+" "),g='<div class="showpageArea"><span style="COLOR: #000;" class="showpageOf"> Pages ('+(p-1)+")</span>"+g,p-1>l&&(g+=m),1==p&&p++,g+="</div>";var x=document.getElementsByName("pageArea"),v=document.getElementById("blog-pager");2>=p&&(g="");for(var w=0;w<x.length;w++)x[w].innerHTML=g;x&&x.length>0&&(g=""),v&&(v.innerHTML=g)}var home_page_url=location.href,thisUrl=home_page_url;if(-1!=thisUrl.indexOf("/search/label/"))if(-1!=thisUrl.indexOf("?updated-max"))var lblname1=thisUrl.substring(thisUrl.indexOf("/search/label/")+14,thisUrl.indexOf("?updated-max"));else var lblname1=thisUrl.substring(thisUrl.indexOf("/search/label/")+14,thisUrl.indexOf("?&max"));var home_page="/";-1==thisUrl.indexOf("?q=")&&-1==thisUrl.indexOf(".html")&&(-1==thisUrl.indexOf("/search/label/")?document.write('<script src="'+home_page+'feeds/posts/summary?alt=json-in-script&callback=showpageCount&max-results=99999" ></script>'):document.write('<script src="'+home_page+"feeds/posts/full/-/"+lblname1+'?alt=json-in-script&callback=showpageCount2&max-results=99999" ></script>'));