import React, { useState, useRef, useEffect } from "react";
import MapGL, { Marker, FullscreenControl } from "react-map-gl";

const DisplayMap = ({ entry }) => {
  const [viewport, setViewport] = useState({
    // latitude: entry.latitude,
    // longitude: entry.longitude,
    latitude: 10.030145,
    longitude: 105.770519,
    zoom: 1,
    width: "100vw",
    height: "100vh",
  });
  const mapRef = useRef();

  useEffect(() => {
    handleViewportChange(entry);
  }, [entry]);

  const handleViewportChange = (newViewport) => {
    setViewport(newViewport);
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <MapGL
        ref={mapRef}
        {...viewport}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/haitran99/ckfdyhnap5r9219rwu2xr70qs"
        mapboxApiAccessToken="pk.eyJ1IjoiaGFpdHJhbjk5IiwiYSI6ImNrMmtlNnhlbjB6Y2kzY29oc2Q2YnRlOXoifQ.ZwtkHfNjr_Ltp39bQj8hSg"
        onViewportChange={handleViewportChange}
        doubleClickZoom={false}
      >
        <FullscreenControl />

        {entry && (
          <>
            <Marker
              latitude={entry.latitude}
              longitude={entry.longitude}
              offsetLeft={-40}
              offsetTop={-60}
            >
              <div className="marker-wrapper">
                <img
                  className="marker"
                  src="https://img.icons8.com/officel/x/marker.png"
                  alt="marker"
                />
              </div>
            </Marker>
          </>
        )}
      </MapGL>
    </div>
  );
};

export default DisplayMap;
