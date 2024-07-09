import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import loadable from '@loadable/component';
import ResponsiveContainer from '@eeacms/volto-listing-block/components/ResponsiveContainer';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import UniversalCard from '@eeacms/volto-listing-block/components/UniversalCard/UniversalCard';

const Slider = loadable(() => import('react-slick'));

const tabletBreakpoint = 768;
const mobileLargeBreakpoint = 767;
const mobileBreakpoint = 480;

const getSlidesToShow = (items, _slidesToShow) => {
  if (_slidesToShow <= 0) return 1;
  if (items.length >= _slidesToShow) return parseInt(_slidesToShow);
  return items.length;
};

const getSlidesToScroll = (items, _slidesToShow, _slidesToScroll) => {
  if (_slidesToScroll <= 0) return 1;
  const slidesToShow = getSlidesToShow(items, _slidesToShow);
  if (slidesToShow >= _slidesToScroll) return parseInt(_slidesToScroll);
  return slidesToShow;
};

const PrevArrow = (props) => {
  const { onClick } = props;

  return (
    <Button
      aria-label="Previous slide"
      className="slider-arrow prev-arrow tablet or lower hidden"
      icon
      onClick={onClick}
    >
      <Icon className="ri-arrow-left-s-line" />
    </Button>
  );
};

const NextArrow = (props) => {
  const { className, onClick } = props;

  return (
    <Button
      aria-label="Next slide"
      className={
        (className.indexOf('slick-disabled') !== -1 ? 'slick-disabled' : '') +
        ' slider-arrow next-arrow tablet or lower hidden'
      }
      icon
      onClick={onClick}
    >
      <Icon className="ri-arrow-right-s-line" />
    </Button>
  );
};

const CardsCarousel = ({ block, items, ...rest }) => {
  const slider = React.useRef(null);
  const dots_parent = React.useRef(null);
  const slidesToShow = getSlidesToShow(items, rest.slidesToShow || 4);
  const itemsLength = items.length;
  const settings = {
    dots: itemsLength > 1,
    infinite: true,
    arrows: itemsLength > slidesToShow,
    initialSlide: 0,
    lazyLoad: null,
    slidesToShow: slidesToShow,
    slidesToScroll: getSlidesToScroll(
      items,
      rest.slidesToShow || 4,
      rest.slidesToScroll || 1,
    ),
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    customPaging: (i) => (
      <button className={'slider-dots-button'} aria-current={i === 0}>
        <span className="slick-dot-icon" aria-hidden="true" />
        <span className="slick-sr-only">Go to slide {i + 1}</span>
      </button>
    ),
    appendDots: (dots) => (
      <ul ref={dots_parent} className={'slick-dots'}>
        {window.innerWidth <= mobileLargeBreakpoint ? dots.slice(0, 5) : dots}
      </ul>
    ),
    afterChange: () => {
      const dots = dots_parent.current;
      if (dots) {
        dots.querySelectorAll('.slider-dots-button').forEach(function (el) {
          el.setAttribute(
            'aria-current',
            el.parentElement.className === 'slick-active',
          );
        });
      }
    },
    responsive: [
      {
        breakpoint: tabletBreakpoint,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: mobileLargeBreakpoint,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: mobileBreakpoint,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return itemsLength > 0 ? (
    <ResponsiveContainer>
      {({ parentWidth }) => (
        <div
          className="cards-carousel"
          role={'region'}
          aria-label={'carousel'}
          style={{ '--carousel-max-width': `${parentWidth}px` }}
        >
          <Slider {...settings} ref={slider}>
            {items.map((item, index) => (
              <UniversalCard
                key={`card-${block}-${index}`}
                {...rest}
                block={block}
                item={item}
              />
            ))}
          </Slider>
        </div>
      )}
    </ResponsiveContainer>
  ) : null;
};

CardsCarousel.schemaEnhancer = (args) => {
  const { schema } = args;

  schema.fieldsets.splice(1, 0, {
    id: 'carousel',
    title: 'Carousel',
    fields: ['slidesToShow', 'slidesToScroll'],
  });

  return {
    ...schema,
    properties: {
      ...schema.properties,
      slidesToShow: {
        title: 'Slides to show',
        type: 'number',
        default: 4,
        minimum: 1,
      },
      slidesToScroll: {
        title: 'Slides to scroll',
        type: 'number',
        default: 1,
        minimum: 1,
      },
    },
  };
};

export default CardsCarousel;
