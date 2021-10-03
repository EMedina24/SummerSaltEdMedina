import React, { useEffect, useState } from 'react';

const SSRPage = ({ serverData,props}) => {

    let [currentPage, setCurrentPage] = useState(1);
    let [gridProd,setGridProd]= useState([])
    let prods;
   


    function handlePageChange ( currentPage){
      fetch(`https://summersalt.com/collections/swimwear/products.json?page=${currentPage}&limit=10`)
       .then((response) => response.json())
       .then((data) => {
         prods = data;
        setGridProd(prods.products)
       })
    }



    useEffect(() => {
      fetch(`https://summersalt.com/collections/swimwear/products.json?page=1&limit=10`)
       .then((response) => response.json())
       .then((data) => {
         prods = data;
        setGridProd(prods.products)
       })
     }, [ setGridProd]);


   


    function nextPage(){
      let actualCount = currentPage;
      actualCount = actualCount + 1;
      actualCount = actualCount + 1;
    setCurrentPage(actualCount);
    handlePageChange(actualCount)
  

    }

    function prevPage(){
      let actualCount = currentPage;
      actualCount = actualCount - 1;
      actualCount = actualCount - 1;
    setCurrentPage(actualCount);
    handlePageChange(actualCount)

      }


    return( 
        
      <>
<section class="text-gray-600 body-font">
  <div class="container px-5 py-24 mx-auto">
    <div class="flex flex-wrap -m-4">

    {gridProd.map((products) => (
      <div class="lg:w-1/4 md:w-1/2 p-4 w-full">
      <a 
      href={`/product/${products.title}`}
      class="block relative h-80 rounded overflow-hidden">
        <img alt="ecommerce" class="object-cover object-center w-full h-full block" src={products.images[0].src}/>
      </a>
      <div class="mt-4">
       
        <h2 class="text-gray-900 title-font text-lg font-medium">{products.title}</h2>
        <p class="mt-1">${products.variants[0].price}</p>
      </div>
    </div>


))}

  
     
    </div>
  </div>
</section>

<div className="flex m-auto justify-center">
  <button onClick={()=> prevPage()} className="p-10">Prev</button>
  <button  onClick={()=> nextPage()}className="p-10">Next</button>
</div>


      </>

)
}
export default SSRPage




