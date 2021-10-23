import React, { useEffect, useState } from "react";
import WeatherEntry from "./WeatherEntry";
import { Weather, WeatherLocation } from "../model/Weather";
import { debounceForecast, debounceWeather } from "../services/ApiRequests";
import { Box } from "@mui/system";
import { Grid, Typography } from "@mui/material";

interface WeatherSummaryProps {
  location: WeatherLocation | null;
}

export default function WeatherSummary(props: WeatherSummaryProps): JSX.Element | null {

  const [weather, setWeather] = useState<Weather | null>(null);
  const [forecast, setForecast] = useState<Weather[] | null>(null);

  useEffect(() => {
    (async function () {
      if (props.location) {
        const [weather, forecast] = await Promise.all([
          debounceWeather(props.location.id),
          debounceForecast(props.location.id)
        ]);
        setWeather(weather);
        setForecast(forecast);
      }
    })()
  }, [props.location]);

  if (!location || !weather || !forecast) return null;

  return (
    <Box sx={{ pb: 20 }}>
      <hr />
      <Typography variant="h4">{props.location?.name} weather now </Typography>
      <WeatherEntry weather={weather} />
      <Typography variant="h4">{props.location?.name} forecast</Typography>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          {forecast.map(timePoint =>
            <Grid item key={timePoint.dt}>
              <WeatherEntry weather={timePoint} />
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  )
}