import {View, Text} from 'react-native';
import React from 'react';
import {SliderBox} from 'react-native-image-slider-box';
import {Rating} from 'react-native-elements';
import {Badge} from 'react-native-elements/dist/badge/Badge';
import {ScrollView} from 'react-native';
export default function ProductInfo({navigation, route}) {
  const {data} = route.params;
  console.log(data);
  return (
    <ScrollView>
      <View style={{backgroundColor: 'white', height: '100%'}}>
        <View
          style={{padding: 10, alignItems: 'center', marginTop: 10, gap: 10}}>
          <Text style={{fontSize: 24, color: 'black', fontWeight: 500}}>
            {data.title}
          </Text>
          <View
            style={{
              width: '50%',
              padding: 3,
              borderWidth: 2,
              borderRadius: 100,
              borderColor: 'grey',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 20,
            }}>
            <Text style={{color: 'grey', fontSize: 16}}>{data.category}</Text>
          </View>
        </View>
        <SliderBox
          images={data.images}
          sliderBoxHeight={300}
          autoplay={true}
          autoplayInterval={8000}
          resizeMode="contain"
          circleLoop={true}
        />
        <View style={{padding: 10, marginTop: 5, gap: 15}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{color: 'green', fontSize: 24, fontWeight: 800}}>
              ${data.price}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: 10,
              }}>
              <Rating imageSize={20} readonly startingValue={data.rating} />
              <Text style={{color: 'grey'}}>{data.rating}</Text>
            </View>
          </View>
          <Text>Stock: {data.stock}</Text>
          <Text style={{color: 'black', fontSize: 18}}>{data.description}</Text>
        </View>
      </View>
    </ScrollView>
  );
}
