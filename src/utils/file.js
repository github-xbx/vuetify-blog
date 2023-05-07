
import { asyncLoad } from "./loadScriptComponent";

const options = {

  maxWidthOrHeight: 1000,

  fileType: 'png'
};

export const imageFleCompression = async (file) => {
  // 应该吧价值的位置放在这里
  const imageCompression = await asyncLoad.browserImageCompression();
  const _file = await imageCompression(file, options);
  // const _file = file;
  console.log('-原图：', file);
  console.log('处理后：', _file);
  return _file
}

export const fileSize = (file) => {
  return file.size / 1024 / 1024;
}
