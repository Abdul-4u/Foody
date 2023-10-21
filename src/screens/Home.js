import React, { useEffect, useState } from 'react'
import Ccard from '../components/Ccard'

import Footer from '../components/Footer'
import Navbar from '../components/Navbar'





export default function Home() {

    const [search,setSearch]=useState([]);

    const [foodCat, setFoodCat] = useState([]);
    const [foodItem, setFoodItem] = useState([]);


    const loadData = async () => {
        let response = await fetch("http://localhost:5000/api/foodData", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"

            }
        });
        response = await response.json();

        setFoodItem(response[0]);
        setFoodCat(response[1]);
        // console.log(response[0],response[1]);

    }

    useEffect(() => {

        loadData()
    }, [])




    return (
        <div>
            <div><Navbar /></div>
            <div>  <div
                id="carouselExampleFade"
                className="carousel slide carousel-fade"
                data-bs-ride="carousel"
                style={{objectFit:"contain !important"}}
            >
                <div className="carousel-inner" id="carousal">
                <div className="carousel-caption" style={{zIndex:"10"}}>


                <div className="d-flex justify-content-center">
      <input className="form-control me-2" type="search" placeholder="Search your food here" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
      { /* search button lagana ho to comment hata dena <button className="btn btn-outline-success text-white" type="submit">Search</button>*/ }
</div>


                </div>

                    <div className="carousel-item active">
                        <img
                            src="https://source.unsplash.com/random/300×300/?burder"
                            className="d-block w-100"
                            alt="..."
                            style={{filter:"brightness(30%)"}}
                        />
                    </div>
                    <div className="carousel-item">
                        <img
                            src="https://source.unsplash.com/random/300×300/?Noodle"
                            className="d-block w-100"
                            style={{filter:"brightness(30%)"}}
                            alt="..."
                        />
                    </div>
                    <div className="carousel-item">
                        <img
                            src="https://source.unsplash.com/random/300×300/?tea"
                            className="d-block w-100"
                            style={{filter:"brightness(30%)"}}
                            alt="..."
                        />
                    </div>
                </div>
                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleFade"
                    data-bs-slide="prev"
                >
                    <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleFade"    
                    data-bs-slide="next"
                >
                    <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div></div>
 

            <div className='container'>{
                foodCat.length > 0
                    ? foodCat.map((data) => {
                        return (

                            <div className='row mb-3'>

                                <div key={data._id} className='fs-3 m-3'>
                                    {data.CategoryName}
                                </div>
                                <hr />

                                {foodItem.length > 0
                                    ?
                                    foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toString().toLowerCase().includes(search.toString().toLowerCase())))
                                        .map(filterItems => {
                                            return (
                                                <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                                                    <Ccard  foodItem={filterItems}
                                                    //foodName={filterItems.name}
                                                    options={filterItems.options[0]}

                                              // imgSrc={filterItems.img}

                                                     />
                                                </div>
                                            )
                                        })
                                    : <div>
                                        no such data</div>}

                            </div>

                        )
                    })
                    : ""

            }



            </div>
            <div><Footer /></div>
        </div>
    )
}
