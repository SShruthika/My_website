import React, { useEffect, useRef, useState } from 'react'
import HomeCard from '../HomeCard'
import { useSelector } from 'react-redux'
import CardFeature from '../CardFeature'
import {GrPrevious,GrNext} from 'react-icons/gr'
import {CiForkAndKnife} from "react-icons/ci"
import FilterProduct from '../FilterProduct'
import AllProduct from '../AllProduct'


const Home = () => {
  const productData = useSelector((state)=>state.product.productList)
  // console.log(productData)
  const homeProductCartList = productData.slice(1,5);
  const homeProductCartListVegetables = productData.filter(e1 => e1.category === "vegetable",[])
  // console.log(homeProductCartListVegetables);

  const loadingArray = new Array(4).fill(null)
  
  const loadingArrayFeature = new Array(10).fill(null)

  const slideProductRef = useRef()
  const nextProduct =()=>{
    slideProductRef.current.scrollLeft += 200
  }
  const preveProduct = ()=>{
    slideProductRef.current.scrollLeft -= 200
  }

  


  return (
    <div className="p-2 md:p-4">
     <div className='md:flex gap-4 py-2'>

       <div className='md:w-1/2'>
         <div className='flex gap-3 bg-slate-300 w-36 px-2 items-center rounded-full'>
          <p className="text-sm font-medium text-slate-900">Bike Delivery</p>
          <img src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png" className='h-7'/>
         </div>
        <h2 className="text-4xl md:text-7xl font-bold py-3">The Fasted Delivery in <span className='text-red-600 text-'>Your Home</span></h2>
        <p className="py-3 text-base ">
        with our app. 
        Whether you're looking for quick and reliable service, we've got you covered.
        Explore a world of seamless delivery and enjoy the benefits of speedy and efficient service
          </p>
          <button className="font-bold bg-red-500 text-slate-200 px-4 py-2 rounded-md">Order Now</button>
       </div>
    

       <div className='"md:w-1/2 flex flex-wrap gap-5 p-4 justify-center'>
        {
         homeProductCartList[0] ? homeProductCartList.map(e1 =>{
            return(
              <HomeCard
              key={e1._id}
              id={e1._id}
              image={e1.image}
              name={e1.name}
              price={e1.price}
              category={e1.category}
              /> 
            );          
          })
          :
          loadingArray.map((e1,index)=>{
            return(
              <HomeCard
              key={index+"loading"}
              loading={"Loading..."}
              />
              
            )
          })
        }  
       </div>
     </div>
     <div className=''>
     <div className='flex w-full items-center'>
     <h2 className="font-bold text-2xl text-slate-800 mb-4">Fresh Vegetables</h2>
      <div className='ml-auto flex gap-4'>
        <button onClick={preveProduct} className='bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded'><GrPrevious/></button>
        <button onClick={nextProduct} className='bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded'><GrNext/></button>
      </div>
     </div>
        <div className='flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all' ref={slideProductRef}>
          {
           homeProductCartListVegetables[0] ? homeProductCartListVegetables.map(e1 =>{
              return(
                <CardFeature
                  key = {e1._id+"vegetable"}
                  id={e1._id}
                  name={e1.name}
                  category={e1.category}
                  price={e1.price}
                  image={e1.image}
                />  
            )
            })
            :
            loadingArrayFeature.map((e1,index) => (
            <CardFeature  loading="Loading..." key={index+"cartLoading"}/>)
          )}  
            </div>
     </div>
     <AllProduct heading={"Your Product"}/>

    </div>
  )
}

export default Home
