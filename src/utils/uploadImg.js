
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import uploadImage from './uploadFile';


function upload(uri){
  let params = {
    userId:'abc12345',  //用户id
    path:uri  //本地文件地址
  }
  uploadImage('recipe/upload',params)
  .then( res=>{
    console.log(res.msg);
  })
}

function takePhoto(setUri)
{ 
    const options = { 
      mediaType: 'photo',
      maxWidth: 1000,// 设置选择照片的大小，设置小的话会相应的进行压缩
      maxHeight: 1000,
      quality: 0.8,
      };
      launchCamera(options, (response) => { 
        if (response.didCancel) { 
          console.log('User cancelled image picker');
        } else if (response.error) { 
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) { 
          console.log('User tapped custom button: ', response.customButton);
        } else { 
          const source = {  uri: response.assets[0].uri };
          setUri(source.uri);
          upload(source.uri);
        }
      });
}
function choosePhoto(setUri){
  launchImageLibrary({
    mediaType: 'photo',
    maxWidth: 1000,// 设置选择照片的大小，设置小的话会相应的进行压缩
    maxHeight: 1000,
    quality: 0.8,
    // videoQuality: 'low',
    // includeBase64: true
}, response=>{
    if(response.didCancel){
      console.log('User cancelled image picker');
    }else if (response.error) { 
      console.log('ImagePicker Error: ', response.error);
    }else { 
      const source = {  uri: response.assets[0].uri };
      setUri(source.uri);
      upload(source.uri)
    }
})
}



export {choosePhoto,takePhoto};