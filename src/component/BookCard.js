import "../css/bookcard.css";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Rating } from 'primereact/rating';


export default function BookCard(prop) {
    let data = prop.book;

    const textAuthor = data.author.join(" | ") 
    const linktoDetail = "/product/"+ data.id;


    return (
        <div key={data.id}>
            <div className='properties pb-30'>
                <div className="properties-card">
                    <div className="properties-img">
                        <Link to={linktoDetail}><img src={data.image} alt="book" /></Link>
                    </div>
                    <div className="properties-caption properties-caption2">
                        <h3 title={data.name}><Link to={linktoDetail}>{data.name}</Link></h3>
                        <p>{textAuthor}</p>
                        <div className="properties-footer d-flex justify-content-between align-items-center">
                            <div className="review">    
                                <p>(<span>{data.countCmt}</span> Bình luận)</p>
                            </div>
                            <div className="price">
                                <span>{data.price}đ</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )



}