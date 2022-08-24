import { useEffect, useState } from "react";

export default function OrderCard (props){
    let order = props.order;

    const showlistProduct = order.list_product.map((item)=>
        <div key={item.id}>
            <p>{item.id}</p>
        </div>
    
    )
    return(
        <div>
            <p>{order.id}</p>
            <p>{order.address.id}</p>
            {showlistProduct}
        </div>
    )
}