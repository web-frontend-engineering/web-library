let href=window.location.href;

export default {
    /**
     * 解析url,待实现！！！！
     * @return
     * */
    parse:function(){
        //http://180.ai?a=1&b=2#tech
        return {
            protocol: 'http:',
            slashes: true,
            auth: null,
            host: '180.ai',
            port: null,
            hostname: '180.ai',
            hash: '#tech',
            search: '?a=1&b=2',
            query: 'a=1&b=2',
            pathname: '/',
            path: '/?a=1&b=2',
            href: 'http://180.ai/?a=1&b=2#tech'
        }
    },
    /**
     * 获取URL参数
     * @example
     * window.urlUtil.queryString();
     *
     * @retrun {}
     * */
    queryString:function(){
        //返回的参数对象
        var ags={};
        if(href.length>1){
            var query=href.substring(1);
            var items=query.split('&');
            var item=null;
            for(var i=0,len=items.length;i<len;i++){
                item=items[i].split("=");
                var key=decodeURIComponent(item[0]);
                var val=decodeURIComponent(item[1]);
                ags[key]=val;
            }
        }
        return ags;
    }
};