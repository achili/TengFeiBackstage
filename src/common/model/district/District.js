import BaseEntity from "../_base/BaseEntity";

export default class District extends BaseEntity {

  constructor(args) {
    super(args);
    this.name = null;
    this.level = null;
    this.father = null;
    this.children = [];
  }
  getTAG() {
    return "District"
  }

	static URL_CHILDREN = "/district/children/{id}";

  httpGetChildren(successCallback, failureCallback) {
    let that = this;
    let url = District.URL_CHILDREN.replace("{id}", this.id);
    let childrenArr = [];
    this.httpPost(url, null, function (response) {
      let responseArr = response.data[that.getTAGS()];
      for (let i = 0; i < responseArr.length; i++) {
        let bean = responseArr[i];
        let clazz = new District();
        clazz.render(bean);
        childrenArr.push(clazz);
      }
      successCallback && successCallback(childrenArr);
    }, failureCallback);
  };

  httpGetLevelFirst(successCallback, failureCallback) {
    let that = this;
    let url = District.URL_CHILDREN.replace("{id}", "0");
    let levelFirst = [];
    this.httpPost(url, null, function (response) {
      let responseArr = response.data[that.getTAGS()];
      for (let i = 0; i < responseArr.length; i++) {
        let bean = responseArr[i];
        let clazz = new District();
        clazz.render(bean);
        levelFirst.push(clazz);
      }
      successCallback && successCallback(levelFirst);
    }, failureCallback);
    return levelFirst;
  }

}
