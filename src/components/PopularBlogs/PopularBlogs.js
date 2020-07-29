import React from 'react';
import classes from './PopularBlogs.module.scss';


const popularBlogCard = (props) => {
    return(
        
            <div className={classes.Post}>
                <div className={`${classes.Face} ${classes.Face1}`}>

                    <div className={classes.Content}>
                        <div className={classes.PopularPostImg}>
                            <img src={props.image} alt="blog-img"></img>

                        </div>
                        <h3>{props.title}</h3>
                    </div>
                </div>
                
                <div className={`${classes.Face} ${classes.Face2}`}>
                    <div className={classes.Content}>
                    <p>{props.description}</p>
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