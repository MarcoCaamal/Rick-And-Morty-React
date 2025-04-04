import { useEffect, useState } from 'react';
import { Box, TextField, Grid, Card, CardContent, Typography, CircularProgress, Container, Paper } from '@mui/material';

function Home() {
  const [episodes, setEpisodes] = useState([]);
  const [filteredEpisodes, setFilteredEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/episode')
      .then((response) => response.json())
      .then((data) => {
        setEpisodes(data.results);
        setFilteredEpisodes(data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching episodes:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const filtered = episodes.filter((episode) =>
      episode.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredEpisodes(filtered);
  }, [search, episodes]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', p: 3 }}>
      <Container maxWidth="md">
        <Paper elevation={10} sx={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', color: 'white', p: 4, borderRadius: 3, textAlign: 'center' }}>
          <Typography variant="h2" gutterBottom>
            ¡Bienvenido a la Rick and Morty App!
          </Typography>
          <Typography variant="h5" paragraph>
            Explora los episodios de la serie, descubre sus nombres y fechas de emisión.
          </Typography>
        </Paper>
      </Container>

      <Box mt={4}>
        <TextField
          fullWidth
          label="Buscar episodio..."
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ mb: 3 }}
        />
        <Grid container spacing={3}>
          {filteredEpisodes.length > 0 ? (
            filteredEpisodes.map((episode) => (
              <Grid item xs={12} sm={6} md={4} key={episode.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{episode.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {episode.episode} - {episode.air_date}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="h6" textAlign="center" width="100%">
              No se encontraron episodios con ese nombre.
            </Typography>
          )}
        </Grid>
      </Box>
    </Box>
  );
}

export default Home;
