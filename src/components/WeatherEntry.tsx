import React from "react";
import { Weather } from "../model/Weather";
import { getIconUrl } from "../services/ApiRequests";
import { convertUnixTimeToDate } from "../services/TimeCoverter";
import { Card, CardContent, Stack, Typography } from "@mui/material";


interface WeatherEntryProps {
  weather: Weather;
}

export default function WeatherEntry(props: WeatherEntryProps): JSX.Element {
  return (
    <Card variant="outlined" sx={{ maxWidth: 275, minWidth: 275 }}>
      <CardContent>
        <Typography>{convertUnixTimeToDate(props.weather.dt).toLocaleTimeString()}</Typography>
        <Stack>
          <Typography>{props.weather.main.temp}°C</Typography>
          <Typography>({props.weather.main.temp_min}°C / {props.weather.main.temp_max}°C)</Typography>
        </Stack>
        <Typography>Humidity: {props.weather.main.humidity}%</Typography>
        {props.weather.weather.map(condition =>
          <div key={condition.id}>
            <img src={getIconUrl(condition.icon)} alt={condition.main} /> {condition.main} {condition.description}
          </div>)
        }
      </CardContent>
    </Card>
  );
};

