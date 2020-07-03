import React from 'react';
import classes from './PopularBlogs.module.scss';


const popularBlogCard = (props) => {
    return(
        
            <div className={classes.Post}>
                <div className={`${classes.Face} ${classes.Face1}`}>

                    <div className={classes.Content}>
                        <div className={classes.PopularPostImg}>
                            <img src={props.image}></img>

                        </div>
                        <h3>{props.title}</h3>
                    </div>
                </div>
                
                <div className={`${classes.Face} ${classes.Face2}`}>
                    <div className={classes.Content}>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever</p>
                    <p className={classes.Author}>By - {props.author}</p>
                    {/* <div className={classes.PopularPostImg}>
                        </div> */}

                     {/* <a href="#">Read More</a> */}
                    </div>

                </div>
            </div>
    );
}

export default popularBlogCard;