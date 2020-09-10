import { withRouter} from 'next/router';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper.scss';
import ComLayout from '../../components/ComLayout';
import './index.scss';
import { _Request } from '../../utils/request';


const HomePage = (props) => {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div className="home-container">
        <Swiper
          autoplay
          spaceBetween={50}
          slidesPerView={1}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
          className="swiper-container"
        >
          {props.BannerList && props.BannerList.map(item => {
            return <SwiperSlide key={item.id}><img src={item.img} /></SwiperSlide>
          })}
        </Swiper>
        <ComLayout {...props}/>
      </div>
    )
}

HomePage.getInitialProps = async (ctx) => {
  try {
    const res = await _Request('/banner/list', 'GET', {}, {})
    console
    return {
      BannerList: res.result
    }
  } catch (err) {
    return {}
  }
  
}

export default withRouter(HomePage)