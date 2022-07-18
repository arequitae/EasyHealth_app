let common_url = `http://${global.serverUrl}:8887/`; //服务器地址
let token = '';  //用户登陆后返回的token
/** 
 * 使用fetch实现图片上传
 * @param {string} url 接口地址
 * @param {JSON} params body的请求参数
 * @return 返回Promise 
 */
function uploadImage(url,params,token){
  return new Promise(function (resolve, reject) {
    let formData = new FormData();
    for (var key in params){
      formData.append(key, params[key]);
    }
    let file = {uri: params.path, type: 'application/octet-stream', name: 'image.jpg'};
    formData.append("file", file);
    fetch(common_url + url, {
      method: 'GET',
      headers: {
        'Content-Type': 'multipart/form-data;charset=utf-8',
        'Authorization':token,
      },
      body: formData,
    }).then((response) => response.json())
      .then((responseData)=> {
        console.log('uploadImage', responseData);
        resolve(responseData);
      })
      .catch((err)=> {
        console.log('err', err);
        reject(err);
      });
    });
}

export default uploadImage;