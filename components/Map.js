import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, { useState, useRef, useCallback } from "react";
import MapGL, { FullscreenControl, Marker } from "react-map-gl";
import dynamic from "next/dynamic";

const Geocoder = dynamic(import("react-map-gl-geocoder"), { ssr: false });

const fullscreenControlStyle = {
  right: 10,
  top: 10,
};

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiaGFpdHJhbjk5IiwiYSI6ImNrMmtlNnhlbjB6Y2kzY29oc2Q2YnRlOXoifQ.ZwtkHfNjr_Ltp39bQj8hSg";

const Map = ({ onChange, defaultCoordinate = null }) => {
  const mapRef = useRef();
  const [entry, setEntry] = useState(defaultCoordinate);

  const [viewport, setViewport] = useState({
    latitude: defaultCoordinate?.latitude || 10.116909867369422,
    longitude: defaultCoordinate?.longitude || 105.69673645530685,
    zoom: 12,
    width: "100vw",
    height: "100vh",
  });

  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );

  // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 };

      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides,
      });
    },
    [handleViewportChange]
  );

  const onClick = (e) => {
    const {
      lngLat: [longitude, latitude],
    } = e;

    onChange({ latitude, longitude });

    setEntry({ latitude, longitude });
  };
  return (
    <MapGL
      ref={mapRef}
      {...viewport}
      width="100%"
      height="100%"
      onViewportChange={handleViewportChange}
      mapStyle="mapbox://styles/haitran99/cknn952hv48z217mpzq38ogck"
      mapboxApiAccessToken={MAPBOX_TOKEN}
      onDblClick={onClick}
      doubleClickZoom={false}
      scrollZoom={false}
    >
      <FullscreenControl style={fullscreenControlStyle} />
      <Geocoder
        mapRef={mapRef}
        onViewportChange={handleGeocoderViewportChange}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        position="top-left"
      />

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
  );
};

export default Map;
