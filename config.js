const basePath = "http://192.168.0.45:9090/";
const urlList = {
    newList:`${basePath}/news/front/newsList.do`,
  newdetail: `${basePath}/news/front/getNewsInfo.do`,
  goods: `${basePath}/productCenter/front/queryProductList.do`
}

module.exports=urlList