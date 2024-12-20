import React from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import hand_icon from '../Assets/hand_icon.png';
import arrow_icon from "../Assets/arrow.png";
import hero_image from "../Assets/hero_image.png";
import './hero.css';

const Hero = () => {
  return (
    <Box className='hero'>
      <Grid container className="hero-left">
        <Grid item xs={12}>
          <Typography variant="h2">NEW ARRIVALS ONLY</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">Collections</Typography>
          <Typography variant="body1">For Everyone</Typography>
          <Box className="hero-hand-icon">
            <Typography variant="body1">New</Typography>
            <img src={hand_icon} alt="hand icon" />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" className="hero-latest-btn" endIcon={<img src={arrow_icon} alt="arrow icon" />}>
            Latest Collection
          </Button>
        </Grid>
      </Grid>
      <Box className="hero-right">
        <img src={hero_image} alt="hero" />
      </Box>
    </Box>
  );
};

export default Hero;