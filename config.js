const basePath = "http://www.weaving-comm.com:8081/";
const urlList = {
  newList:`${basePath}/news/front/newsList.do`,
  newdetail: `${basePath}/news/front/getNewsInfo.do`,
  goods: `${basePath}/productCenter/front/queryProductList.do`,
  goodsdetail: `${basePath}/productCenter/front/productInfo.do`,
  recruitList: `${basePath}/recruit/front/getRecruitInfoList.do`,
  saveUApply: `${basePath}/immediatelyHandle/front/getProvCityAreaByUserType.do`,
  applyBuilding: `${basePath}/immediatelyHandle/front/getAreolaByParam.do`
}

module.exports=urlList