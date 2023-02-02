export const useMarkerEvents = () => {
  const newMarker = (newMarker$, socket) => {
    newMarker$.subscribe((marker) => socket.emit('new-marker', marker));
  };

  const markerMovement = (socket, markerMovement$) =>
    markerMovement$.subscribe((marker) => {
      socket.emit('update-marker', marker);
    });

  const listenActiveMarkers = (socket, createMarker) => {
    socket.on('active-markers', (markers) => {
      for (const key of Object.keys(markers)) {
        createMarker(markers[key], key);
      }
    });
  };

  const listenNewmarkers = (socket, createMarker) => {
    socket.on('new-marker', (marker) => {
      createMarker(marker, marker.id);
    });
  };

  const updateMarker = (socket, updateMarkerPosition) => {
    socket.on('update-marker', (marker) => {
      updateMarkerPosition(marker, marker.id);
    });
  };

  return {
    newMarker,
    markerMovement,
    listenActiveMarkers,
    listenNewmarkers,
    updateMarker,
  };
};
