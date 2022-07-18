
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import uploadImage from './uploadFile';
import {getToken} from "./Storage";


function upload(uri){
  let params = {
    path:uri  //本地文件地址
  }
  getToken().then(token=>{

    uploadImage('5432/upload',params)
        .then( res=>{
          console.log(res.msg);
        }).catch(err => console.log(err))
  })

}

function takePhoto(setUri,setNutrient)
{ 
    const options = { 
      mediaType: 'photo',
      maxWidth: 1000,
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
function choosePhoto(setUri,setNutrient,setFood){
    launchImageLibrary({
      mediaType: 'photo',
      maxWidth: 1000,
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
        setFood("Detecting ~~")
        setTimeout(()=>{
          setNutrient({
            energy: 222.8,
            protein:0,
            fat:0,
            carbs:6.7
          })
          setFood("Blackberry Apple Cocktail")
        },3000)
        upload(source.uri)
      }
  })
}



export {choosePhoto,takePhoto};