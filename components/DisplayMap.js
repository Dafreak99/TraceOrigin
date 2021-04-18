import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, { useState, useRef, useCallback } from "react";
import MapGL, {
  FullscreenControl,
  Layer,
  Marker,
  Popup,
  Source,
} from "react-map-gl";
import dynamic from "next/dynamic";
import { Box, Text } from "@chakra-ui/react";
import { markAssetError } from "next/dist/client/route-loader";

const fullscreenControlStyle = {
  right: 10,
  top: 10,
};

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiaGFpdHJhbjk5IiwiYSI6ImNrMmtlNnhlbjB6Y2kzY29oc2Q2YnRlOXoifQ.ZwtkHfNjr_Ltp39bQj8hSg";

const Map = ({ data }) => {
  const mapRef = useRef();
  const [viewport, setViewport] = useState({
    latitude: data[0].latitude,
    longitude: data[0].longitude,
    zoom: 12,
    width: "100vw",
    height: "100%",
  });

  const [entry, setEntry] = useState(null);

  const [showPopup, setShowPopup] = useState({});

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

  const geojson = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: data.map(({ longitude, latitude }) => [
            longitude,
            latitude,
          ]),
        },
      },
    ],
  };

  const layerStyle = {
    id: "point",
    type: "line",
    source: "my-data",
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },

    paint: {
      "line-color": "#fcba03",
      "line-width": 5,
    },
  };

  return (
    <MapGL
      ref={mapRef}
      {...viewport}
      width="100%"
      height="100%"
      onViewportChange={handleViewportChange}
      mapStyle="mapbox://styles/haitran99/ckfdyhnap5r9219rwu2xr70qs"
      mapboxApiAccessToken={MAPBOX_TOKEN}
      doubleClickZoom={false}
    >
      <FullscreenControl style={fullscreenControlStyle} />

      <Source id="my-data" type="geojson" data={geojson}>
        <Layer {...layerStyle} />
        <Layer />
      </Source>

      {data &&
        data.map((marker) => (
          <>
            <Marker
              latitude={marker.latitude}
              longitude={marker.longitude}
              offsetLeft={-40}
              offsetTop={-60}
            >
              <Box
                cursor="pointer"
                className="marker-wrapper"
                onClick={() => setShowPopup({ [marker._id]: true })}
              >
                {marker.type === "hatchery" ? (
                  <img className="marker" src="/one.png" alt="marker" />
                ) : (
                  <img className="marker" src="/two.png" alt="marker" />
                )}
              </Box>
            </Marker>
            {showPopup[marker._id] && (
              <Popup
                className="popup"
                latitude={marker.latitude}
                longitude={marker.longitude}
                closeButton={true}
                closeOnClick={false}
                dynamicPosition={true}
                onClose={() => setShowPopup({})}
                anchor="top"
              >
                <div>
                  <h3>{marker.name}</h3>
                  <p>{marker.address}</p>
                </div>
              </Popup>
            )}
          </>
        ))}
    </MapGL>
  );
};

export default Map;
