import { useEffect, useRef, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import { v4 } from 'uuid';
import { Subject } from 'rxjs';

mapboxgl.accessToken = import.meta.env.VITE_TOKEN_MAPBOX;

export const useMapbox = (initialPoints) => {
  const mapDiv = useRef(null);

  //important
  const setRef = useCallback((node) => {
    mapDiv.current = node;
  }, []);

  // marker ref
  const markers = useRef({});

  // Observables rxjs
  const markerMovement = useRef(new Subject());
  const newMarker = useRef(new Subject());

  //Map && coords
  const mapView = useRef();
  const [coords, setCoords] = useState(initialPoints);

  // Agregate markers function
  const createMarker = useCallback((ev, id) => {
    const { lng, lat } = ev.lngLat || ev;
    const marker = new mapboxgl.Marker();
    marker.id = id || v4();

    marker.setLngLat([lng, lat]).addTo(mapView.current).setDraggable(true);
    markers.current[marker.id] = marker;

    if (!id) {
      newMarker.current.next({
        id: marker.id,
        lng,
        lat,
      });
    }

    // Listen marker movement
    marker.on('drag', (ev) => {
      const { id } = ev.target;

      const { lng, lat } = ev.target.getLngLat();

      // TODO: emit marker changes
      markerMovement.current.next({
        id,
        lng,
        lat,
      });
    });
  }, []);

  const updatePosition = useCallback(({ id, lng, lat }) => {
    markers.current[id].setLngLat([lng, lat]);
  }, []);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapDiv.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [initialPoints.lng, initialPoints.lat],
      zoom: initialPoints.zoom,
    });
    mapView.current = map;
  }, []);

  useEffect(() => {
    mapView.current?.on('move', () => {
      const { lat, lng } = mapView.current.getCenter();

      setCoords({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: mapView.current.getZoom().toFixed(2),
      });
    });
  }, [coords]);

  //Create Pints when click

  useEffect(() => {
    mapView.current.on('click', createMarker);
  }, [createMarker]);

  return {
    coords,
    markers,
    newMarker$: newMarker.current,
    markerMovement$: markerMovement.current,
    setRef,
    createMarker,
    updatePosition,
  };
};
