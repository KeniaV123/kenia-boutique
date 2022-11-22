import { Box, Image } from "native-base";
import { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
// import Carousel from "react-native-carousel-control";
import { Carousel } from "nachos-ui";
import useInterval from "../../hooks/use_interval";

const data = [
  "https://i.pinimg.com/564x/31/33/73/313373888e3cb36dc8620942a2db65e0.jpg",
  "https://i.pinimg.com/564x/b3/b2/5f/b3b25f7badc1ea4bf8f9a84f01dd1a84.jpg",
  "https://i.pinimg.com/564x/73/28/50/73285007fb721b7d27db707ef0b321f8.jpg",
];

const SLIDER_WIDTH = Dimensions.get("window").width + 80;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

const MainCarousel = () => {
  const isCarousel = useRef(null);
  const [activeItem, setActiveItem] = useState(0);

  useInterval(() => {
    activeItem < data.length - 1
      ? setActiveItem(activeItem + 1)
      : setActiveItem(0);
  }, 4000);

  return (
    <Box>
      {/* <Carousel> */}
      {data.map((item, index) => {
        return (
          <Box
            key={index}
            style={{
              width: "100%",
              height: 200,
              backgroundColor: "white",
              overflow: "hidden",
              display: activeItem === index ? "flex" : "none",
            }}
          >
            <Image
              source={{ uri: item }}
              alt="image base"
              resizeMode="cover"
              style={{ width: "100%", height: "100%" }}
            />
          </Box>
        );
      })}

      <Box
        justifyContent="center"
        alignItems="center"
        flexDir="row"
        paddingY={3}
      >
        {data.map((item, index) => {
          return (
            <Box
              key={index}
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: activeItem === index ? "#CC2B5E" : "white",
                margin: 5,
              }}
            />
          );
        })}
      </Box>
      {/* </Carousel> */}
      {/* </Carousel> */}
    </Box>
  );
};

export default MainCarousel;
