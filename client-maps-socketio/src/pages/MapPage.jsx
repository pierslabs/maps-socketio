import { useEffect } from 'react';
import { useMapbox } from '../hooks/useMapbox';

const initialPoints = {
  lng: -5,
  lat: 40,
  zoom: 10,
};

const MapPage = () => {
  const { coords, setRef, newMarker$, markerMovement$ } =
    useMapbox(initialPoints);

  //newMarker
  useEffect(() => {
    newMarker$.subscribe((marker) => {
      console.log(marker);
    });
  }, [newMarker$]);

  //movement marker

  useEffect(() => {
    markerMovement$.subscribe((marker) => {
      console.log(marker.id);
    });
  }, [markerMovement$]);

  return (
    <>
      <div className="info">
        lng: {coords.lng} | lat: {coords.lat} | zoom: {coords.zoom}
      </div>
      <div ref={setRef} className="mapContainer" />
    </>
  );
};

export default MapPage;
