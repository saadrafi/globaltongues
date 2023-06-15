import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination, Navigation } from "swiper";
import AxiosInstance from "../../../customhooks/AxiosInstance";
import { useQuery } from "@tanstack/react-query";
import { Fade } from "react-awesome-reveal";

const PopolarClasses = () => {
  const getAxios = AxiosInstance();

  // fetch instructors data
  const { data: topclasses = [], isLoading } = useQuery({
    queryKey: ["topclasses"],
    queryFn: async () => {
      const res = await getAxios.get("/topclasses");
      return res.data;
    },
  });
  return (
    <div className="my-10">
      <h1 className="font-bold text-center text-4xl text-primary">Top Classes</h1>
      <p className="font-bold text-center my-3">Here are some top enrolled classes</p>
      <Swiper
        slidesPerView={1}
        spaceBetween={5}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {topclasses.map((topclass) => (
          <SwiperSlide key={topclass._id}>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden my-5 mx-5">
              <Fade cascade duration={1000}>
                <img src={topclass.classImage} alt="" className="mx-auto h-52 p-4" />
                <div className="py-5 px-6 space-y-3">
                  <h1 className="text-2xl text-center uppercase font-bold text-gray-800">
                    {topclass.className}
                  </h1>
                  <div className="py-2 text-lg text-gray-700">
                    <p className="text-center">
                      <span className="text-sm font-semibold font-mono">Instructor:</span>{" "}
                      {topclass.instructor}
                      <br />
                      <span className="text-sm font-semibold font-mono">Enrolled:</span>{" "}
                      {topclass.enrolledStudent}
                      <br />
                      <span className="text-sm font-semibold font-mono">Price:</span>{" "}
                      {topclass.price}
                    </p>
                  </div>
                </div>
              </Fade>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PopolarClasses;
