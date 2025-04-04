import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Grid, Card, CardMedia, CardContent, Typography, CardActionArea, CircularProgress, Box, TextField, MenuItem } from '@mui/material';

function Characters() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetchCharacters();
  }, [search, status]);

  const fetchCharacters = () => {
    setLoading(true);
    let url = `https://rickandmortyapi.com/api/character/?name=${search}&status=${status}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCharacters(data.results || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching characters:', error);
        setCharacters([]);
        setLoading(false);
      });
  };

  return (
    <Box mt={2}>
      <Box display="flex" gap={2} mb={3}>
        <TextField
          fullWidth
          label="Buscar personaje..."
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TextField
          select
          label="Estado"
          variant="outlined"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="">Todos</MenuItem>
          <MenuItem value="alive">Vivo</MenuItem>
          <MenuItem value="dead">Muerto</MenuItem>
          <MenuItem value="unknown">Desconocido</MenuItem>
        </TextField>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {characters.length > 0 ? (
            characters.map((character) => (
              <Grid item xs={12} sm={6} md={4} key={character.id}>
                <Card>
                  <CardActionArea component={Link} to={`/characters/${character.id}`}>
                    <CardMedia component="img" height="300" image={character.image} alt={character.name} />
                    <CardContent>
                      <Typography variant="h6">{character.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {character.species} - {character.status}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="h6" textAlign="center" width="100%">
              No se encontraron personajes.
            </Typography>
          )}
        </Grid>
      )}
    </Box>
  );
}

export default Characters;