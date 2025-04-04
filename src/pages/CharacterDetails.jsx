import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router'
import { Card, CardMedia, CardContent, Typography, CircularProgress, Box, Button } from '@mui/material';

function CharacterDetails() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setCharacter(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching character:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (!character) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography variant="h5" color="error">
          Personaje no encontrado
        </Typography>
        <Button variant="contained" color="primary" component={Link} to="/characters" sx={{ mt: 2 }}>
          Volver a personajes
        </Button>
      </Box>
    );
  }

  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Card sx={{ maxWidth: 400 }}>
        <CardMedia component="img" height="400" image={character.image} alt={character.name} />
        <CardContent>
          <Typography variant="h5">{character.name}</Typography>
          <Typography variant="body1">Especie: {character.species}</Typography>
          <Typography variant="body1">Estado: {character.status}</Typography>
          <Typography variant="body1">Género: {character.gender}</Typography>
          <Typography variant="body1">Origen: {character.origin.name}</Typography>
          <Button variant="contained" color="primary" fullWidth component={Link} to="/characters" sx={{ mt: 2 }}>
            Volver a personajes
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}

export default CharacterDetails;
