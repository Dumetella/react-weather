import React, { FC, useState } from 'react';
import LocationSearch from "./LocationSearch";
import LocationTable from "./LocationTable";
import { WeatherLocation } from "../model/Weather";
import Alert from "./Alerts";
import WeatherSummary from "./WeatherSummary";
import { debounceLocation } from '../services/ApiRequests';
import { Container, CssBaseline, Typography } from '@mui/material';
import { Box } from '@mui/system';

const App: FC = () => {
  const [locations, setLocations] = useState<WeatherLocation[]>([]);
  const [error, setError] = useState('');
  const [warning, setWarning] = useState('');
  const [currentLocation, setCurrentLocation] = useState<WeatherLocation | null>(null);

  const resetAlerts = () => {
    setError('');
    setWarning('');
  }

  let addLocation = async (term: string) => {
    resetAlerts();
    const location = await debounceLocation(term);

    if (!location) {
      setError(`No location found called '${term}'`);
    } else if (locations.find(item => item.id === location.id)) {
      setWarning(`Location '${term}' is already in the list.`);
    } else {
      setLocations([location, ...locations]);
    }
  };

  return (
    <React.Fragment>
      <CssBaseline>
        <Box>
          <Container>
            <Typography variant="h2" align="center" color="text.primary" paragraph>React Weather</Typography>
            <LocationSearch onSearch={addLocation} />
            <Alert style={'error.main'} message={error} />
            <Alert style={'warning.main'} message={warning} />
            <LocationTable locations={locations}
              current={currentLocation}
              onSelect={location => setCurrentLocation(location)} />
            <WeatherSummary location={currentLocation} />
          </Container>
        </Box>
      </CssBaseline>
    </React.Fragment>
  );
};

export default App;
