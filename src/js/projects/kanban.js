import $ from "jquery";
import 'slick-carousel';

export function make_kanban_slick() {
  $('#kanban').slick({
    centerMode: false,
    centerPadding: '5px',
    slidesToShow: 4,
    variableWidth: false,
    infinite: false,
    arrows: false,
    dots: true,
    cssEase: 'ease-out',
    responsive: [
      {
        breakpoint: 800,
        settings: {
          centerMode: false,
          centerPadding: '10px',
          slidesToShow: 3,
          swipeToSlide: true
        }
      }, {
        breakpoint: 700,
        settings: {
          centerMode: false,
          centerPadding: '20px',
          slidesToShow: 2
        }
      }, {
        breakpoint: 500,
        settings: {
          centerMode: true,
          centerPadding: '30px',
          slidesToShow: 1,
          edgeFriction: .3
        }
      }
    ]
  });
}
