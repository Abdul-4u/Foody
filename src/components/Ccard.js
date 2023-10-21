 import React,{useEffect, useRef, useState} from 'react'
import { useDispatchCart, useCart } from './ContexReducer'

export default function Ccard(props) {

    let dispatch = useDispatchCart();
    let data = useCart();
    const priceRef = useRef();
    let options= props.options;
    let priceOptions = Object.keys(options);
 const [qty,setQty]=useState(1);
 const[size, setSize]=useState("");



    const handleAddToCart = async() => { 
await dispatch({type:"ADD_TO_CART",id:props.foodItem._id,name:props.foodItem.name,price:finalPrice,qty:qty,size:size,img:props.foodItem.img})   
   await console.log(data);
    }
let finalPrice=qty*parseInt(options[size]);
useEffect(() => {   
setSize(priceRef.current.value); 
},[]  )

    return (
        <div>
            <div><div className="card mt-3" style={{ width: "16rem", "maxHeight": "360" }}>
                <img className="card-img-top" src= {props.foodItem.img}    alt="Card "  style={{ height :"120px", objectFit:"fill"}}/>
                <div className="card-body">
                    <h5 className="card-title">{props.foodItem.name}</h5>
                  
                    <div className='container w-100'> </div>
                    <select className='m-2 h-100 bg-success' onChange={(e)=>setQty(e.target.value)}>
                        {Array.from(Array(6), (e, i) => {
                            return (
                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                            )
                        })}
                    </select>

                    <select className='m-2 h-100  bg-success rounded' ref={priceRef}  onChange={(e)=>setSize(e.target.value)}>
                       {priceOptions.map((data)=>
                       {
                           return(
                            <option key={data} value={data}>{data}</option>
                               )
                       })
                       }
                       
                    </select>

                    <div className='d-inline h-100 fs-5 '>
                        Rs.{finalPrice}/-
                    </div>

                </div>

                <hr> 
                </hr>
                <button className={'btn btn-success justify-center m-2 '} onClick={handleAddToCart}>Add to cart</button>
            </div></div>
        </div>
    )
}
