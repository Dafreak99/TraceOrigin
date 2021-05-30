import "mapbox-gl/dist/mapbox-gl.css";
import React, { useState, useRef, useCallback } from "react";
import MapGL, {
  FullscreenControl,
  Layer,
  Marker,
  Popup,
  Source,
} from "react-map-gl";
import { Box, Heading, Text } from "@chakra-ui/react";

const fullscreenControlStyle = {
  right: 10,
  top: 10,
};

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiaGFpdHJhbjk5IiwiYSI6ImNrMmtlNnhlbjB6Y2kzY29oc2Q2YnRlOXoifQ.ZwtkHfNjr_Ltp39bQj8hSg";

const Map = ({ data }) => {
  const mapRef = useRef();
  const [viewport, setViewport] = useState({
    latitude: data[0].coordinate.latitude,
    longitude: data[0].coordinate.longitude,
    zoom: 11,
    width: "100vw",
    height: "100%",
  });

  const [showPopup, setShowPopup] = useState({});

  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );

  const geojson = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: data.map(({ coordinate: { longitude, latitude } }) => [
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

      {data?.map((marker) => (
        <>
          <Marker
            latitude={marker.coordinate.latitude}
            longitude={marker.coordinate.longitude}
            offsetLeft={-40}
            offsetTop={-60}
          >
            <Box
              cursor="pointer"
              className="marker-wrapper"
              onClick={() => setShowPopup({ [marker._id]: true })}
            >
              {marker.type === "hatchery" ? (
                <img className="marker" src="/pond.png" alt="marker" />
              ) : marker.type === "consumption" ? (
                <img className="marker" src="/store.png" alt="marker" />
              ) : (
                <img className="marker" src="/house.png" alt="marker" />
              )}
            </Box>
          </Marker>
          {showPopup[marker._id] && (
            <Popup
              className="popup"
              latitude={marker.coordinate.latitude}
              longitude={marker.coordinate.longitude}
              closeButton={true}
              closeOnClick={false}
              dynamicPosition={true}
              onClose={() => setShowPopup({})}
              anchor="top"
            >
              <Box p="1rem">
                <Text textTransform="uppercase" mb="0.5rem">
                  {marker.type}
                </Text>
                <Heading fontSize="md">{marker.name}</Heading>
                <Text>{marker.address}</Text>
              </Box>
            </Popup>
          )}
        </>
      ))}
    </MapGL>
  );
};

export default Map;
