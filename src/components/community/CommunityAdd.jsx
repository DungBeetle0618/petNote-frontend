import React, { useCallback, useState } from 'react'
import { Pressable } from 'react-native';
import { View, Text } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker';
import ImageResizer from 'react-native-image-resizer';
import usePermissions from '../../hooks/usePermissions';

const CommunityAdd = () => {


  usePermissions();

  const [image, setImage] = useState("");
  const onResponse = useCallback(async response => {
    console.log(response.width, response.height, response.exif);
    setPreview({uri: `data:${response.mime};base64,${response.data}`});
    const orientation = response.exif.Orientation;
    console.log('orientation', orientation);
    return ImageResizer.createResizedImage(
      response.path,
      600,
      600,
      response.mime.includes('jpeg') ? 'JPEG' : 'PNG',
      100,
      0,
    ).then(r => {
      console.log(r.uri, r.name);

      setImage({
        uri: r.uri,
        name: r.name,
        type: response.mime,
      });
    });
  }, []);


  const onChangeFile = useCallback(() => {
    return ImagePicker.openPicker({
      includeExif: true,
      includeBase64: true,
      mediaType: 'photo',
    })
      .then(onResponse)
      .catch(console.log);
  }, [onResponse]);

  return (
    <View>
      <Text>CommunityAdd</Text>
       <Pressable onPress={onChangeFile}>
          <Text>이미지 선택</Text>
      </Pressable>
    </View>
  )
}

export default CommunityAdd