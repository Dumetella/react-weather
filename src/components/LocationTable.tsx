import { List, ListItem, Typography } from "@mui/material";
import React from "react";
import { WeatherLocation } from "../model/Weather";

interface LocationTableProps {
  locations: WeatherLocation[];
  current: WeatherLocation | null;
  onSelect: (location: WeatherLocation) => void;
}

export default function LocationTable(props: LocationTableProps): JSX.Element {
  return (
    <List>
      <Typography variant="h3">Locations:</Typography>
      {props.locations.map(location =>
        <ListItem key={location.id}
          selected={props.current?.id === location.id ? true : false}
          onClick={() => props.onSelect(location)}>
          <Typography variant="h4">{location.name}</Typography>
        </ListItem>
      )}
    </List>
  )
}