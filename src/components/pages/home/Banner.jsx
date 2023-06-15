import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Fade, Slide } from "react-awesome-reveal";
import Typewriter from "react-ts-typewriter";
import { TextLoop } from "react-text-loop-next";

const Banner = () => {
  var settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    dots: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    fade: true,
  };
  return (
    <div className="w-[90%] mx-auto my-16">
      <Slider {...settings}>
        <div className=" bg-base-100 shadow-xl">
          <div className=" flex lg:flex-row flex-col-reverse p-8">
            <div className="h-96  lg:w-1/2">
              <img
                src="https://i.ibb.co/HqwvvWS/OIP-ep-Tti2-IJM5-Yrb-XZk-Y4h7-AHa-EB-w-288-h-180-c-7-r-0-o-5-dpr-1-5-pid-1.jpg"
                alt="banner"
                className="h-full w-full"
              />
            </div>
            <div className="lg:w-1/2 flex flex-col justify-center gap-5 ">
              <Fade cascade>
                <h1 className="text-6xl font-bold text-center">
                  Global <span className="text-primary">Tongues</span>
                </h1>
                <Slide>
                  <p className="text-center text-lg">
                    <Typewriter
                      text="Do you want to learn"
                      cursor={false}
                      typeSpeed={100}
                      delaySpeed={1000}
                    />
                  </p>
                </Slide>
                <Fade>
                  <p className="text-center text-primary text-xl font-semibold font-serif">
                    <Typewriter
                      speed={200}
                      text={["English", "Spanish", "Korean", "Hindi", "Bangla", "Japanese"]}
                      loop={true}
                    />
                  </p>
                </Fade>
                <div className="flex justify-center">
                  <button className="text-2xl md:w-1/2 font-bold btn-primary btn">learn now</button>
                </div>
              </Fade>
            </div>
          </div>
        </div>
        <div className=" bg-base-100 shadow-xl">
          <div className="md:h-full flex lg:flex-row flex-col-reverse p-8">
            <div className="lg:w-1/2 flex flex-col justify-center gap-8 ">
              <h1 className="text-5xl font-bold text-center">
                <span className="text-primary"> Looking for Spanish Instructor</span>
              </h1>
              <p className="text-2xl text-justify">¿Te gustaría aplicar ahora?</p>
              <button className="text-2xl md:w-1/2 font-bold btn-primary btn">Sí</button>
            </div>
            <div className=" h-96  lg:w-1/2">
              <img
                src="https://i.ibb.co/Lr2kf1R/OIP-zowp-ZYBk-Zx-Lf-XU1577-CRkw-Ha-F0-w-250-h-196-c-7-r-0-o-5-dpr-1-5-pid-1.jpg"
                alt="banner"
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default Banner;
