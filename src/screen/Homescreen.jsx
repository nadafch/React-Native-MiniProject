import {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import axios from 'axios';
import {Picker} from '@react-native-picker/picker';

export default function Homescreen({navigation}) {
  const [fetchData, setFetchData] = useState([]);
  const [storeData, setStoreData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [sortPrice, setSortPrice] = useState('');

  const filter = [
    {label: 'none', value: ''},
    {label: 'smartphones', value: 'smartphones'},
    {label: 'laptops', value: 'laptops'},
    {label: 'groceries', value: 'groceries'},
    {label: 'skincare', value: 'skincare'},
    {label: 'fragrances', value: 'fragrances'},
    {label: 'home-decoration', value: 'home-decoration'},
  ];

  const getData = async () => {
    try {
      const res = await axios.get('https://dummyjson.com/products');
      setFetchData(res.data.products);
    } catch (e) {
      alert(e.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (fetchData) {
      setStoreData(fetchData);
    }
  }, [fetchData]);

  const filteringData = () => {
    const filtered = fetchData.filter(item => item.category == selectedFilter);
    setStoreData(filtered);
  };

  useEffect(() => {
    if (selectedFilter) {
      filteringData();
    } else {
      setStoreData(fetchData);
      setSortPrice('');
    }
  }, [selectedFilter]);

  const sortDesc = () => {
    return storeData.sort((a, b) => b.price - a.price);
  };

  const sortAsc = () => {
    return storeData.sort((a, b) => a.price - b.price);
  };

  const handleSort = sortPrice => {
    console.log(sortPrice);
    if (sortPrice == 'termurah') {
      sortAsc();
    } else if (sortPrice == 'termahal') {
      sortDesc();
    } else {
      getData();
      setSelectedFilter('');
    }
  };

  return (
    <ScrollView>
      <View
        style={{flexDirection: 'row', justifyContent: 'space-around', gap: 5}}>
        <View style={{width: '50%', padding: 10, gap: 9}}>
          <Text>Filter Category</Text>
          <Picker
            selectedValue={selectedFilter}
            onValueChange={(item, i) => {
              setSelectedFilter(item);
            }}
            style={{color: 'white', backgroundColor: 'grey'}}>
            {filter.map((item, i) => (
              <Picker.Item
                key={i}
                label={item.label}
                value={item.value}
                style={{color: 'white'}}
              />
            ))}
          </Picker>
        </View>
        <View style={{width: '50%', padding: 10, gap: 9}}>
          <Text>Sort By Price</Text>
          <Picker
            selectedValue={sortPrice}
            onValueChange={(item, i) => {
              setSortPrice(item), handleSort(item);
            }}
            style={{color: 'white', backgroundColor: 'grey'}}>
            <Picker.Item label="none" value="" style={{color: 'white'}} />
            <Picker.Item
              label="A-Z"
              value="termurah"
              style={{color: 'white'}}
            />
            <Picker.Item
              label="Z-A"
              value="termahal"
              style={{color: 'white'}}
            />
          </Picker>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          gap: 10,
          padding: 2,
          marginTop: 10,
          marginBottom: 10,
        }}>
        {storeData &&
          storeData.map((item, i) => {
            return (
              <View
                key={i}
                style={{
                  width: 170,
                  borderRadius: 10,
                  backgroundColor: 'white',
                  shadowColor: 'black',
                  shadowOpacity: 0.26,
                  shadowOffset: {width: 0, height: 2},
                  shadowRadius: 10,
                  elevation: 3,
                  padding: 2,
                }}>
                <TouchableOpacity
                  key={i}
                  style={{flexDirection: 'column', alignItems: 'center'}}
                  onPress={() =>
                    navigation.navigate('ProductInfo', {data: item})
                  }>
                  <View
                    key={i}
                    style={{
                      width: '100%',
                      height: 100,
                      borderRadius: 10,
                      position: 'relative',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginBottom: 8,
                    }}>
                    <Image
                      key={i}
                      source={{uri: `${item.thumbnail}`}}
                      style={{
                        width: '90%',
                        height: '80%',
                        resizeMode: 'contain',
                      }}
                    />
                  </View>
                  <View style={{padding: 2, marginBottom: 10}}>
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'black',
                        fontWeight: '600',
                        marginBottom: 2,
                      }}>
                      {item.title}
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        color: 'green',
                        marginBottom: 3,
                        textAlign: 'left',
                      }}>
                      ${item.price}
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        color: 'grey',
                        marginBottom: 3,
                        textAlign: 'left',
                      }}>
                      stock :{item.stock}
                    </Text>
                    <Text style={{color: 'grey', textAlign: 'justify'}}>
                      {item.description.substr(0, 20)}...
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
      </View>
    </ScrollView>
  );
}
