import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  SkeletonText,
  Text,
  Select,
} from "@chakra-ui/react";
import { FaLocationArrow, FaTimes } from "react-icons/fa";

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";
import constants from "../Constants/constants";
import axios from "axios";
// import dotenv from "dotenv";
// dotenv.config();

const center = { lat: 6.9271, lng: 79.8612 };

export default function BusRoute() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: constants.google_map_api,
    libraries: ["places"],
  });

  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);

  const [time, setTime] = useState();
  const [date, setDate] = useState("2022-11-03");
  let origin = "";
  let destination = "";
  // /** @type React.MutableRefObject<HTMLInputElement> */
  // const originRef = useRef();
  // /** @type React.MutableRefObject<HTMLInputElement> */
  // const destiantionRef = useRef();

  if (!isLoaded) {
    return <SkeletonText />;
  }

  async function calculateRoute() {
    let startTime = time.split("-")[0];
    let endTime = time.split("-")[1];

    let startDateTime = date + "T" + startTime;
    let endDateTime = date + "T" + endTime;

    console.log("startDateTime>>>>>>> ", startDateTime);
    console.log("endDateTime>>>>>>>>>>>", endDateTime);

    await axios
      .get(
        constants.backend_url +
          `/bus/getBusCordinates/${startDateTime}/${endDateTime}`
      )
      .then((res) => {
        origin = res.data[0].startPoint;
        destination = res.data[0].endPoint;
      })
      .catch((err) => {
        console.log("err: ", err);
        return;
      });

    if (origin === "" || destination === "") {
      setDirectionsResponse(null);
      return;
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: origin,
      destination: destination,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
  }

  function clearRoute() {
    setDirectionsResponse(null);
  }
  console.log("time: ", time);
  console.log("date: ", date);

  return (
    <Flex
      position="relative"
      flexDirection="column"
      alignItems="center"
      h="100vh"
      w="100vw"
    >
      <Box position="absolute" left={0} top={0} h="100%" w="100%">
        {/* Google Map Box */}
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={(map) => setMap(map)}
        >
          <Marker position={center} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </Box>
      <Box
        p={4}
        borderRadius="lg"
        m={4}
        bgColor="white"
        shadow="base"
        minW="container.md"
        zIndex="1"
      >
        <HStack spacing={2} justifyContent="space-between">
          <Box flexGrow={1}>
            {/* <Autocomplete>
            <Input type="text" placeholder="Origin" ref={originRef} />
          </Autocomplete> */}
            <Input
              type="date"
              id="start"
              name="trip-start"
              value="2022-11-05"
              min="2022-11-01"
              max="2022-12-31"
              onChange={(e) => {
                setDate(e.target.value);
              }}
            />
          </Box>
          <Box flexGrow={1}>
            {/* <Autocomplete>
            <Input
              type="text"
              placeholder="destination"
              ref={destiantionRef}
            />
          </Autocomplete> */}
            <Select
              placeholder="Select time"
              onChange={(e) => {
                setTime(e.target.value);
              }}
            >
              <option value="06:00-06:59">06:00-07:00</option>
              <option value="07:00-07:59">07:00-08:00</option>
              <option value="08:00-08:59">08:00-09:00</option>
              <option value="09:00-09:59">09:00-10:00</option>
              <option value="10:00-10:59">10:00-11:00</option>
              <option value="11:00-11:59">11:00-12:00</option>
              <option value="12:00-12:59">12:00-13:00</option>
              <option value="13:00-13:59">13:00-14:00</option>
              <option value="14:00-14:59">14:00-15:00</option>
              <option value="15:00-15:59">15:00-16:00</option>
              <option value="16:00-16:59">16:00-17:00</option>
              <option value="17:00-17:59">17:00-18:00</option>
              <option value="18:00-18:59">18:00-19:00</option>
              <option value="19:00-19:59">19:00-20:00</option>
              <option value="20:00-20:59">20:00-21:00</option>
              <option value="21:00-21:59">21:00-22:00</option>
              <option value="22:00-22:59">22:00-23:00</option>
            </Select>
          </Box>

          <ButtonGroup>
            <Button colorScheme="blue" type="submit" onClick={calculateRoute}>
              See Route
            </Button>
            <IconButton
              aria-label="center back"
              icon={<FaTimes />}
              onClick={clearRoute}
            />
          </ButtonGroup>
        </HStack>
        {/* <HStack spacing={4} mt={4} justifyContent="space-between">
        <Text>Distance: {distance} </Text>
        <Text>Duration: {duration} </Text>
        <IconButton
          aria-label="center back"
          icon={<FaLocationArrow />}
          isRound
          onClick={() => {
            map.panTo(center);
            map.setZoom(15);
          }}
        />
      </HStack> */}
      </Box>
    </Flex>
  );
}
