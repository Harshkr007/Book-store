import React from "react";

import BookCard from "../books/BookCard";

//Import Swiper react Components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


// import required modules
import { Pagination, Navigation } from "swiper/modules";
import { useFetchAllBooksQuery } from "../../store/features/book/bookApiSlice";

function Recommended() {

  const {data: books = []} = useFetchAllBooksQuery();

  return (
    <div className="py-10">
        <h2 className="text-3xl font-semibold mb-6">Recommended for you</h2>
        
        <Swiper
        slidesPerView={1}
        spaceBetween={30}
        navigation={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
          1180: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {books.length > 0 &&
          books.slice(8,16).map((book, index) => (
            <SwiperSlide>
              <BookCard key={index} book={book} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  )
}

export default Recommended