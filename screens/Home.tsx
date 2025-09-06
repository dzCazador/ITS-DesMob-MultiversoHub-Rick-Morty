import { FlatList, Text, View, Image, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { useFavorites } from '../hooks/useFavorites';
import { useFocusEffect } from '@react-navigation/native'; // <-- Importa este hook
import React from 'react'; // <-- Importa React si aún no lo has hecho

export default function Home({ navigation, route }) {
  const { isFav, toggle } = useFavorites();
  const { favorites } = route.params || {};

  // Estado para los personajes y la lista filtrada
  const [characters, setCharacters] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);

  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character')
      .then(res => res.json())
      .then(data => {
        // Adaptar los datos para que coincidan con la estructura esperada
        const mapped = data.results.map(char => ({
          id: char.id,
          titulo: char.name,
          descripcion: char.status + ' - ' + char.species,
          categoria: char.gender,
          imagen: char.image
        }));
        setCharacters(mapped);
        setFilteredNews(favorites ? mapped.filter(item => isFav(item.id)) : mapped);
      });
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const newList = favorites ? characters.filter(item => isFav(item.id)) : characters;
      setFilteredNews(newList);
      return () => {};
    }, [favorites, isFav, characters])
  );

  const renderItem = ({ item }) => {
    const isFavorite = isFav(item.id);

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Detalle', { id: item.id })}
        accessibilityLabel={`Abrir detalle de ${item.titulo}`}
        style={{ margin: 12, padding: 12, backgroundColor: '#f0f0f0' }}
      >
        <Image
          source={{ uri: item.imagen }}
          style={{
            width: '50%',
            aspectRatio: 1,
            borderRadius: 16,
            resizeMode: 'cover',
            marginBottom: 10,
            backgroundColor: '#e0e0e0',
          }}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 4, flex: 1, marginRight: 10 }}>{item.titulo}</Text>
          <TouchableOpacity
            onPress={() => toggle(item.id)}
            accessibilityLabel={isFavorite ? `Quitar de favoritos` : `Agregar a favoritos`}
          >
            <AntDesign
              name={isFavorite ? 'star' : 'staro'}
              size={24}
              color={isFavorite ? 'gold' : 'black'}
            />
          </TouchableOpacity>
        </View>

        <Text numberOfLines={2} ellipsizeMode="tail" style={{ color: '#444' }}>
          {item.descripcion}
        </Text>
        <Text style={{ marginTop: 6, fontSize: 12, color: '#666' }}>
          Categoría: {item.categoria}
        </Text>
        <Text style={{ marginTop: 2, fontSize: 12, color: '#1e88e5' }}>
          Ver más →
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={filteredNews}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={{ paddingBottom: 24 }}
    />
  );
}