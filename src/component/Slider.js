import { Link } from 'react-router-dom';
import { Rating } from 'primereact/rating';
import Slider from 'react-slick';



export default function Sliders(prop) {

    var settings_2 = {
        dots: true,
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 2000,
        cssEase: "linear",
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
    };


    const listBook =

        prop.data.map((value) =>
            <div key={value.id} >
                <div className='properties'>
                    <div className="properties-card">
                        <div className="properties-img">
                            <Link to="/"><img src={value.book.image} alt="book" /></Link>
                        </div>
                        <div className="properties-caption properties-caption2">
                            <h3><Link to="/">{value.book.name}</Link></h3>
                            <p>{value.book.author}</p>
                            <div className="properties-footer d-flex justify-content-between align-items-center">
                                <div className="review">
                                    <div className="rating">
                                        <Rating value={5} readOnly stars={5} cancel={false} />
                                    </div>
                                    <p>(<span>50</span> Review)</p>
                                </div>
                                <div className="price">
                                    <span>{value.book.price}$</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )


return (

        <Slider {...settings_2}> {listBook}</Slider>
               
)



}