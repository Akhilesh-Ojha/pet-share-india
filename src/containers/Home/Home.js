import React, { useEffect } from 'react';
import classes from './Home1.module.scss';
import Bg1 from '../../assets/bg.jpg';
import { NavLink } from 'react-router-dom';
// import Aux from '../../hoc/Auxx';
import image1 from '../../assets/ImageGallary/image1.jpg';
import image2 from '../../assets/ImageGallary/image2.jpg';
import image3 from '../../assets/ImageGallary/image3.jpg';
import image4 from '../../assets/ImageGallary/image4.jpg';
import image5 from '../../assets/ImageGallary/image5.jpg';
import image6 from '../../assets/ImageGallary/image6.jpg';
import image7 from '../../assets/ImageGallary/image7.jpg';
import image8 from '../../assets/ImageGallary/image8.jpg';
import image9 from '../../assets/ImageGallary/image9.jpg';
import image10 from '../../assets/ImageGallary/image10.jpg';
import image11 from '../../assets/ImageGallary/image11.jpg';
import image12 from '../../assets/ImageGallary/image12.jpg';
import image13 from '../../assets/ImageGallary/image13.jpg';
import image14 from '../../assets/ImageGallary/image14.jpg';


import Aos from 'aos';
import "aos/dist/aos.css";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Pet1 from '../../assets/pic1.jpg';
import Pet2 from '../../assets/pic2.jpg';
import Pet3 from '../../assets/pic3.jpg';
import Pet4 from '../../assets/pic4.jpg';

var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    adaptiveHeight: true,
    initialSlide: 0,
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
            breakpoint: 900,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
            }
        },
        {
            breakpoint: 650,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
};

const Home = React.forwardRef((props, ref) => {

    const { homeRefClient, homeRefMainSection } = ref;
    let homeRef = [];
    let slideIndex = 1;
    // let interval = '';


    useEffect(() => {
        window.scrollTo(0, 0);
        Aos.init({ duration: 1000 });

        console.log('homeRefMainSection', homeRefMainSection.current.children);

        homeRef.push(homeRefMainSection.current.children[0]);
        homeRef.push(homeRefMainSection.current.children[1]);
        homeRef.push(homeRefMainSection.current.children[2]);

        showSlides(slideIndex);

        // interval = setInterval(() => {
        //     plusSlides(+1)
        //   }, 5000);
        // return () => clearInterval(interval);
    });

    function showSlides(n) {
        let i;

        let slides = homeRef;

        if (n > slides.length) {
            slideIndex = 1
        }

        if (n < 1) {
            slideIndex = slides.length;
        }

        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }

        slides[slideIndex - 1].style.display = "flex";

    }

    function plusSlides(n) {
        showSlides(slideIndex += n);
        // return () => clearInterval(interval);
    }



    return (
        <div className={classes.Main}>

            <div ref={homeRefMainSection} className={classes.SlideShowContainer}>
                <section className={classes.Banner}>
                    <div className={classes.ImageMain}>
                        <img src={Bg1} alt="bg" className={classes.FitBgMain}></img>
                    </div>
                    <div className={classes.BannerContent}>
                        <h1>Adopt. Don't Shop <i className="fa fa-paw" aria-hidden="true"></i></h1>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been</p>
                        <div className={classes.ButtonArea}>
                            <NavLink to={{ pathname: '/adopt' }}>
                                <button>Adopt Now</button>
                            </NavLink>


                        </div>
                    </div>
                </section>

                <section ref={homeRefMainSection} className={classes.Banner}>
                    <div className={classes.ImageMain}>
                        <img src={image2} alt="bg" className={classes.FitBgMain}></img>
                    </div>
                    <div className={classes.BannerContent}>
                        <h1>Adopt. Don't Shop <i className="fa fa-paw" aria-hidden="true"></i></h1>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been</p>
                        <div className={classes.ButtonArea}>
                            <NavLink className={classes.BtnHide} to={{ pathname: '/put-up-for-adoption' }}>
                                <button>Put Up For Adoption</button>
                            </NavLink>
                        </div>
                    </div>
                </section>

                <section ref={homeRefMainSection} className={classes.Banner}>
                    <div className={classes.ImageMain}>
                        <img src={image3} alt="bg" className={classes.FitBgMain}></img>
                    </div>
                    <div className={classes.BannerContent}>
                        <h1>Adopt. Don't Shop <i className="fa fa-paw" aria-hidden="true"></i></h1>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been</p>
                        <div className={classes.ButtonArea}>
                            <NavLink to={{ pathname: '/blogs' }}>
                                <button>Blogs</button>
                            </NavLink>
                        </div>
                    </div>
                </section>

                <a className={classes.Prev} onClick={() => plusSlides(-1)}>&#10094;</a>
                <a className={classes.Next} onClick={() => plusSlides(+1)}>&#10095;</a>
            </div>


            <section className={classes.Card}>
                <h1 data-aos="zoom-in">Our friends looking for a home</h1>
                <div className={classes.PetList}>
                    <div className={classes.PetBox}>
                        <div className={classes.ImgBox}>
                            <img src={Pet4} alt="" className={classes.FitBg}></img>
                        </div>

                        <div className={classes.ContentBox}>
                            <h2> Honey </h2>
                            <p>Beagle | <span>7 months |</span> <span>Male</span></p>
                        </div>
                    </div>

                    <div className={classes.PetBox}>
                        <div className={classes.ImgBox}>
                            <img alt="" src={Pet2} className={classes.FitBg}></img>
                        </div>

                        <div className={classes.ContentBox}>
                            <h2> Caesar </h2>
                            <p>Golden Ret | <span>10 months |</span> <span>Male</span></p>
                        </div>
                    </div>

                    <div className={classes.PetBox}>
                        <div className={classes.ImgBox}>
                            <img alt="" src={Pet1} className={classes.FitBg}></img>
                        </div>

                        <div className={classes.ContentBox}>
                            <h2> Casper </h2>
                            <p>G Shephard | <span>2 year |</span> <span>Male</span></p>
                        </div>
                    </div>

                    <div className={classes.PetBox}>
                        <div className={classes.ImgBox}>
                            <img alt="" src={Pet3} className={classes.FitBg}></img>
                        </div>

                        <div className={classes.ContentBox}>
                            <h2> Leo </h2>
                            <p>G Shephard | <span>2 year | </span> <span>Male</span></p>
                        </div>
                    </div>
                </div>
                <div>
                    <button className={classes.Button}>Browse All</button>
                </div>

            </section>



            {/* <section ref={homeRefService} id="Services" className={classes.Services} >
                <h1 data-aos="zoom-in">Services That we provide</h1>
                <div className={classes.OurServices}>
                    <div className={classes.Container}>
                        <div data-aos="fade-right" className={classes.ServiceBox}>
                            <i className="fa fa-home" aria-hidden="true"></i>
                            <h3>Service One</h3>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting</p>

                        </div>

                        <div data-aos="fade-up" className={classes.ServiceBox}>
                            <i className="fa fa-paw" aria-hidden="true"></i>
                            <h3>Service Two</h3>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting </p>

                        </div>

                        <div data-aos="fade-left" className={classes.ServiceBox}>
                            <i className="fa fa-heart-o" aria-hidden="true"></i>
                            <h3>Service Three</h3>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting</p>

                        </div>
                    </div>
                </div>

            </section> */}


            <section ref={homeRefClient} id="Clients" className={classes.Clients}>
                <h1 data-aos="zoom-in">We make people genuinely happy</h1>
                <Slider {...settings}>
                    <div data-aos="fade-right" className={classes.Testimonial}>
                        <span className="icon fa fa-quote-left"> </span>

                        <p className={classes.Desc}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever
                                        </p>

                        <div className={classes.TestimonialContent}>
                            <div className={classes.Pic}>
                                <img alt="" src={Pet3}></img>
                            </div>
                            <h3 className={classes.Title}>Akhilesh Ojha</h3>
                        </div>


                    </div>

                    <div data-aos="fade-up" className={classes.Testimonial}>
                        <span className="icon fa fa-quote-left"> </span>

                        <p className={classes.Desc}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever
                                        </p>

                        <div className={classes.TestimonialContent}>
                            <div className={classes.Pic}>
                                <img alt="" src={Pet4}></img>
                            </div>
                            <h3 className={classes.Title}>Shubham Singh</h3>
                        </div>


                    </div>

                    <div data-aos="fade-left" className={classes.Testimonial}>
                        <span className="icon fa fa-quote-left"> </span>

                        <p className={classes.Desc}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever
                                        </p>

                        <div className={classes.TestimonialContent}>
                            <div className={classes.Pic}>
                                <img alt="" src={Pet2}></img>
                            </div>
                            <h3 className={classes.Title}>Yatin</h3>
                        </div>


                    </div>

                    <div data-aos="fade-left" className={classes.Testimonial}>
                        <span className="icon fa fa-quote-left"> </span>

                        <p className={classes.Desc}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever
                                        </p>

                        <div className={classes.TestimonialContent}>
                            <div className={classes.Pic}>
                                <img alt="" src={Pet1}></img>
                            </div>
                            <h3 className={classes.Title}>Agam Gupta</h3>
                        </div>


                    </div>
                </Slider>






            </section>

            <section className={classes.Gallary}>
                <figure className={`${classes.Gallary__Item} ${classes.Gallary__Item__1}`}>
                    <img src={image1} alt="" className={classes.Gallary__Img} ></img>
                </figure>

                <figure className={`${classes.Gallary__Item} ${classes.Gallary__Item__2}`}>
                    <img src={image9} alt="" className={classes.Gallary__Img} ></img>
                </figure>

                <figure className={`${classes.Gallary__Item} ${classes.Gallary__Item__3}`}>
                    <img src={image3} alt="" className={classes.Gallary__Img} ></img>
                </figure>

                <figure className={`${classes.Gallary__Item} ${classes.Gallary__Item__4}`}>
                    <img src={image4} alt="" className={classes.Gallary__Img} ></img>
                </figure>

                <figure className={`${classes.Gallary__Item} ${classes.Gallary__Item__5}`}>
                    <img src={image5} alt="" className={classes.Gallary__Img} ></img>
                </figure>

                <figure className={`${classes.Gallary__Item} ${classes.Gallary__Item__6}`}>
                    <img src={image8} alt="" className={classes.Gallary__Img} ></img>
                </figure>

                <figure className={`${classes.Gallary__Item} ${classes.Gallary__Item__7}`}>
                    <img src={image14} alt="" className={classes.Gallary__Img} ></img>
                </figure>

                <figure className={`${classes.Gallary__Item} ${classes.Gallary__Item__8}`}>
                    <img src={image7} alt="" className={classes.Gallary__Img} ></img>
                </figure>

                <figure className={`${classes.Gallary__Item} ${classes.Gallary__Item__9}`}>
                    <img src={image2} alt="" className={classes.Gallary__Img} ></img>
                </figure>

                <figure className={`${classes.Gallary__Item} ${classes.Gallary__Item__10}`}>
                    <img src={image6} alt="" className={classes.Gallary__Img} ></img>
                </figure>

                <figure className={`${classes.Gallary__Item} ${classes.Gallary__Item__11}`}>
                    <img src={image11} alt="" className={classes.Gallary__Img} ></img>
                </figure>

                <figure className={`${classes.Gallary__Item} ${classes.Gallary__Item__12}`}>
                    <img src={image12} alt="" className={classes.Gallary__Img} ></img>
                </figure>
                <figure className={`${classes.Gallary__Item} ${classes.Gallary__Item__13}`}>
                    <img src={image13} alt="" className={classes.Gallary__Img} ></img>
                </figure>
                <figure className={`${classes.Gallary__Item} ${classes.Gallary__Item__14}`}>
                    <img src={image10} alt="" className={classes.Gallary__Img} ></img>
                </figure>

            </section>

            <section className={classes.Footer}>
                <h2>Connect with us</h2>
                <ul className={classes.Social}>
                    {/* <div style={{display: 'inline-block'}}> */}
                    <li ><a style={{ color: '#313030' }} href="https://www.instagram.com/petshare.india/" rel="noopener noreferrer" target="_blank"><i className="fa fa-instagram" aria-hidden="true"></i>.</a></li>
                    <li  ><a style={{ color: '#313030' }} href="https://www.facebook.com/PetShare-102464238147788/?ref=br_rs" rel="noopener noreferrer" target="_blank"><i className="fa fa-facebook" aria-hidden="true"></i>.</a></li>

                    {/* </div> */}
                </ul>
            </section>
        </div>
    )
}
)

// }
export default Home;

