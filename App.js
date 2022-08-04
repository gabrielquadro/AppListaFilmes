import React, { useEffect , useState} from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';

import api from './src/services/api';
import Filmes from './src/Filmes';

export default function App() {

  const [filmes, setFilmes] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    async function loadFilmes(){
      const response = await api.get('r-api/?api=filmes');
      //console.log(response.data);
      setFilmes(response.data);
      setLoad(false);
    }
    loadFilmes();
  })

  if(load){
    return(
    <View style={{alignItems:'center', justifyContent:'center', flex:1}}>
      <ActivityIndicator color='#121212' size={45}/>
    </View>
    );
  }else{
    return (
      <View style={styles.container}>
        <FlatList
          data={filmes}
          renderItem={({item}) => <Filmes data={item}/>}
          keyExtractor={item => String(item.id)}
        />
      </View>
    );
  }
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 35,
    },
  });