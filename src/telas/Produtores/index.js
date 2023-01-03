import React, {useEffect, useState} from 'react';
import {FlatList, Text, StyleSheet} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

import Produtor from './componentes/Produtor';
import Topo from './componentes/Topo';
import useProdutores from '../../hooks/useProdutores';
import useTextos from '../../hooks/useTextos';

export default function Produtores({melhoresProdutores}) {
  const lista = useProdutores(melhoresProdutores);
  const navigation = useNavigation();
  const {tituloProdutores, agradecimento} = useTextos();

  const [showMessage, setShowMessage] = useState(false);

  const route = useRoute();
  const nomeCompra = route.params?.compra?.nome;
  const mensagemCompleta = agradecimento?.replace('$Nome', nomeCompra);

  useEffect(() => {
    if (nomeCompra) {
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    }
  }, [nomeCompra]);

  const TopoLista = () => {
    return (
      <>
        <Topo melhoresProdutores={melhoresProdutores} />
        {showMessage && <Text style={estilos.compra}>{mensagemCompleta}</Text>}
        <Text style={estilos.titulo}>{tituloProdutores}</Text>
      </>
    );
  };

  return (
    <FlatList
      data={lista}
      renderItem={({item}) => (
        <Produtor
          {...item}
          aoPressionar={() => navigation.navigate('Produtor', item)}
        />
      )}
      keyExtractor={({nome}) => nome}
      ListHeaderComponent={TopoLista}
      style={estilos.lista}
    />
  );
}

const estilos = StyleSheet.create({
  lista: {
    backgroundColor: '#ffffff',
  },
  titulo: {
    fontSize: 20,
    lineHeight: 32,
    marginHorizontal: 16,
    marginTop: 16,
    fontWeight: 'bold',
    color: '#464646',
  },

  compra: {
    backgroundColor: '#EAF5F3',
    fontSize: 16,
    lineHeight: 26,
    padding: 16,
    color: '#464646',
  },
});
