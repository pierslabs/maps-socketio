import { useContext } from 'react';
import { useEffect } from 'react';
import { SocketContext } from '../context/SocketContext';
import { useMapbox } from '../hooks/useMapbox';
import { useMarkerEvents } from '../hooks/useMarkersEvents';

const initialPoints = {
  lng: -5,
  lat: 40,
  zoom: 10,
};

const MapPage = () => {
  const {
    coords,
    setRef,
    newMarker$,
    markerMovement$,
    createMarker,
    updatePosition,
  } = useMapbox(initialPoints);

  const {
    newMarker,
    markerMovement,
    listenActiveMarkers,
    listenNewmarkers,
    updateMarker,
  } = useMarkerEvents();
  const { socket } = useContext(SocketContext);

  //newMarker
  useEffect(() => {
    newMarker(newMarker$, socket);
  }, [newMarker$, socket]);

  //movement marker
  useEffect(() => {
    markerMovement(socket, markerMovement$);
  }, [socket, markerMovement$]);

  //listen Active Markers
  useEffect(() => {
    listenActiveMarkers(socket, createMarker);
  }, [socket, createMarker]);

  //listen new markers
  useEffect(() => {
    listenNewmarkers(socket, createMarker);
  }, [socket, createMarker]);

  //update marker position
  useEffect(() => {
    updateMarker(socket, updatePosition);
  }, [socket, updatePosition]);
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
