import React, { Component } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Slide1, Slide2, Slide3, Slide4 } from "./Slides";

export default class IntroSlider extends Component {
  render() {
    const settings = {
      arrows: false,
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
    };
    return (
      <div>
        <Slider {...settings}>
          <Slide1 />
          <Slide2 />
          <Slide3 />
          <Slide4 />
        </Slider>
      </div>
    );
  }
}
