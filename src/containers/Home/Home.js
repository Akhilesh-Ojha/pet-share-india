import React, { Component } from 'react';
import classes from './Home.module.scss';
import BackgroundImage from '../../assets/background.jpg';
import { NavLink }  from 'react-router-dom';
import Aux from '../../hoc/Auxx';
import Pet1 from '../../assets/pic1.jpg';
import Pet2 from '../../assets/pic2.jpg';
import Pet3 from '../../assets/pic3.jpg';
import Pet4 from '../../assets/pic4.jpg';


class Home extends Component {
    componentDidMount() {
        window.scrollTo(0,0);
    }
    render() {
        return(
            <Aux>
                <section className={classes.Banner}>
                    <img src={BackgroundImage} alt="bg" className={classes.FitBg}></img>
                    <div className={classes.Content} >
                        <div className={classes.Box} data-0-top="opacity:0;left:100px;" data-200-top="opacity:1;left:0px;">
                            Adoption
                        </div>
                        <div className={classes.Box}>
                            Put up for adoption
                        </div>
                        <NavLink style={{textDecoration: 'none'}} to={{pathname: '/blogs'}}>
                            <div className={classes.Box}>
                                Blogs
                            </div>
                        </NavLink>
                    </div>
                </section>

                <section className={classes.Card}>
                    <h1>𝒪𝓊𝓇 𝒻𝓇𝒾𝑒𝓃𝒹𝓈 𝓁𝑜𝑜𝓀𝒾𝓃𝑔 𝒻𝑜𝓇 𝒶 𝒽𝑜𝓂𝑒</h1>
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

                <section className={classes.Works}>
                    <div className={classes.Col1}>
                        <h4>Adopters</h4>
                        <p>(Looking for pets)</p>

                        <h4>Browse Pet Profile</h4>
                        <div>Search from various filters</div>
                        
  
                        <div className = {classes.ArrowFirst}>
                            <span>&#10553;</span>
                        </div>

                        <div>Pick your new friend and go through it's profile</div>

                     
                        <div className = {classes.Arrow}>
                            <span>&#10553;</span>
                        </div>

                        
                        <div>Create a direct conection with the pet owner through our private chat feature</div>

                        <div className = {classes.ArrowLast}>
                            <span>&#10553;</span>
                        </div>



                    </div>

                    <div className={classes.Col2}>
                        <h4>How it works</h4>
                        <div className={classes.Img1}> 
                            <img alt="" src={Pet1}></img>
                        </div>
                        <div className={classes.Img2} > 
                            <img alt="" src={Pet2}></img>
                        </div>
                        <div className={classes.Img3} > 
                            <img alt="" src={Pet3}></img>
                        </div>
                        <div className={classes.Img4} > 
                            <img alt="" src={Pet4}></img>
                        </div>
                        
                        <h3>Meet up and make a legal adoption</h3>
                        <p>Adopt a pet legally through <span style={{fontWeight: 'bold'}}>petshare.com</span></p>
                        
                    
                    </div>


                    <div className={classes.Col3}>
                        <div className={classes.FirstStatement}>

                        <h4>Gurdians</h4>
                        <p>(Pet Owners)</p>


                            
                        <h4>Create Pet Profile</h4>
                        <div>Make a prfile of your pet with simple steps</div>
                        <div className= {classes.ArrowFirstLastCol}>
                            <span>&#10552;</span>
                        </div>

                        <div>Get updates from the pet adopters</div>
                        </div>
                     
                        <div className = {classes.Arrow}>
                            <span>&#10552;</span>
                        </div>

                        
                        <div>Direct notification and personal chat with adopter of your pet</div>

                        <div className = {classes.ArrowLastCol3}>
                            <span>&#10552;</span>
                        </div>
                    </div>


                    
                </section>

                <section className={classes.Footer}>
                    <h2>Connect with us</h2>
                    <ul className={classes.Social}>
                        <li ><button><i className="fa fa-instagram" aria-hidden="true"></i></button></li>
                        <li><button><i className="fa fa-facebook" aria-hidden="true"></i></button></li>
                    </ul>
                </section>
            </Aux>
        )
    }
}

export default Home