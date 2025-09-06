import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

export default function DetailScreen({ route }) {
  // `route.params` contiene los parámetros pasados desde la pantalla anterior
  const { id } = route.params;
  const [character, setCharacter] = React.useState(null);
  const [episodes, setEpisodes] = React.useState([]);

  React.useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then(res => res.json())
      .then(data => {
        setCharacter(data);
        // Obtener los episodios
        if (data.episode && data.episode.length > 0) {
          Promise.all(
            data.episode.map(epUrl => fetch(epUrl).then(res => res.json()))
          ).then(setEpisodes);
        }
      });
  }, [id]);

  if (!character) {
    return <View style={styles.container}><Text>Cargando...</Text></View>;
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: character.image }}
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{character.name}</Text>
        <Text style={styles.category}>{character.gender} | {character.species}</Text>
        <Text style={styles.fullText}>Estado: {character.status}</Text>
        <Text style={styles.fullText}>Origen: {character.origin?.name}</Text>
        <Text style={styles.fullText}>Ubicación: {character.location?.name}</Text>
        <Text style={styles.fullText}>Aparece en {character.episode.length} episodios:</Text>
        {episodes.length > 0 ? (
          <View style={{ marginTop: 10 }}>
            {episodes.map(ep => (
              <Text key={ep.id} style={styles.source}>{ep.episode} - {ep.name}</Text>
            ))}
          </View>
        ) : (
          <Text style={styles.source}>Cargando episodios...</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 250,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  authorDate: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
  category: {
    fontSize: 16,
    color: '#007AFF',
    marginBottom: 15,
  },
  fullText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    color: '#555',
  },
  source: {
    fontSize: 12,
    color: '#aaa',
    fontStyle: 'italic',
  },
});