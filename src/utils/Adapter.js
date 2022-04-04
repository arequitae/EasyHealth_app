
 import { Dimensions, PixelRatio } from 'react-native';
 const BASE_WIN_HEIGHT = 769;// Nexus S
 const BASE_WIN_WIDTH = 363;
 const BASE_WIN_PIXEL= 3.375
 const currentPixel = PixelRatio.get()
 const {height, width} = Dimensions.get('window');


 export function currentSize(){
    const {height, width} = Dimensions.get('window');
     console.log(PixelRatio.get(),height, width)
 }

 // 根据实际屏幕尺寸转换对应的像素高度

export function getHeight(h) {//*BASE_WIN_PIXEL/ currentPixel
      return h  * (height / BASE_WIN_HEIGHT);
}

// 根据实际屏幕尺寸转换对应的像素宽度
export function getWidth(w) {//*BASE_WIN_PIXEL/ currentPixel
      return w  * (width / BASE_WIN_WIDTH);
}

// const pixelRatio6 = 2;      // 返回iPhone6的像素密度
// const fontScale = PixelRatio.getFontScale();  // 字体大小缩放比例
// const scale = Math.min(currentHeight / BASE_WIN_HEIGHT, currentWidth / BASE_WIN_WIDTH);

// export function setText (val) {
//     val = (val * scale) * pixelRatio / fontScale;
//     return val / pixelRatio6;
// }