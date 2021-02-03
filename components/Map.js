import React, { useState, useRef, useCallback } from "react";
import MapGL, { Marker, FullscreenControl, Source, Layer } from "react-map-gl";

import dynamic from "next/dynamic";

const Map = ({ entry, setEntry }) => {
  const [viewport, setViewport] = useState({
    latitude: 10.116909867369422,
    longitude: 105.69673645530685,
    zoom: 12,
    width: "100vw",
    height: "100vh",
  });
  const mapRef = useRef();

  const marker = {
    latitude: 10.116909867369422,
    longitude: 105.69673645530685,
  };

  const handleViewportChange = (newViewport) => {
    setViewport(newViewport);
  };

  // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
  const handleGeocoderViewportChange = useCallback((newViewport) => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };

    return handleViewportChange({
      ...newViewport,
      ...geocoderDefaultOverrides,
    });
  }, []);

  const Geocoder = dynamic(import("react-map-gl-geocoder"), { ssr: false });

  const onClick = (e) => {
    const {
      lngLat: [longitude, latitude],
    } = e;

    setEntry({ latitude, longitude });
  };

  const geojson = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [
            [10.035283028197332, 105.78883526060861],
            [10.030197814377123, 105.77062602647128],
          ],
        },
      },
    ],
  };

  const layerStyle = {
    id: "point",
    type: "circle",
    paint: {
      "circle-radius": 10,
      "circle-color": "#007cbf",
    },
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
        onDblClick={onClick}
      >
        <FullscreenControl />
        <Source id="my-data" type="geojson" data={geojson}>
          <Layer {...layerStyle} />
        </Source>
        {/* <Geocoder
          mapRef={mapRef}
          onViewportChange={handleGeocoderViewportChange}
          mapboxApiAccessToken="pk.eyJ1IjoiaGFpdHJhbjk5IiwiYSI6ImNrMmtlNnhlbjB6Y2kzY29oc2Q2YnRlOXoifQ.ZwtkHfNjr_Ltp39bQj8hSg"
          position="top-left"
        />
       
        <Marker
          latitude={marker.latitude}
          longitude={marker.longitude}
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
        </Marker> */}
      </MapGL>
    </div>
  );
};

export default Map;
