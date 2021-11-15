import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './styles.scss';

const cards = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }];

const MainLayout = () => {
  return (
    <Box className="container">
      {cards.map((card, i) => {
        return (
          <Card variant="outlined" className="card-item" key={i}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                App {card.id}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Description {card.id}
              </Typography>
              <Typography variant="body2">...</Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Click</Button>
            </CardActions>
          </Card>
        );
      })}
    </Box>
  );
};

export default MainLayout;
