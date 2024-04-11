import { Carousel } from 'bootstrap';
import Footer from './Footer';
import Navbar from './Navbar';
import image from "./images/hostel1.jpg"



function Home() {
    return(
    <>
    
    <Navbar/>
    <div className='' style={{ backgroundImage:`url(${image})` }}>
        <div className=" p-40 flex container items-center h-screen  justify-evenly my-auto">

        <div className="h-65 w-64 bg-white shadow-lg rounded-lg p-4 flex flex-col items-center ">
                <img className="h-48 w-48 rounded-full object-cover" src={image} alt="User Image" />
                    <h3 className="text-lg font-bold mt-5">name name</h3>
                    <p className="text-gray-500">position</p>
                    <p className="text-gray-500">phone number</p>
                    
                </div>

                <div className="h-65 w-64 bg-white shadow-lg rounded-lg p-4 flex flex-col items-center ">
                <img className="h-48 w-48 rounded-full object-cover" src={image} alt="User Image" />
                    <h3 className="text-lg font-bold mt-5">name name</h3>
                    <p className="text-gray-500">position</p>
                    <p className="text-gray-500">phone number</p>
                    
                </div>

                <div className="h-65 w-64 bg-white shadow-lg rounded-lg p-4 flex flex-col items-center ">
                <img className="h-48 w-48 rounded-full object-cover" src={image} alt="User Image" />
                    <h3 className="text-lg font-bold mt-5">name name</h3>
                    <p className="text-gray-500">position</p>
                    <p className="text-gray-500">phone number</p>
                    
                </div>
                </div>


                <div className="gaurds p-40 flex container items-center h-screen  justify-evenly my-auto">

                <div className="h-65 w-64 bg-white shadow-lg rounded-lg p-4 flex flex-col items-center ">
                <img className="h-48 w-48 rounded-full object-cover" src={image} alt="User Image" />
                    <h3 className="text-lg font-bold mt-5">name name</h3>
                    <p className="text-gray-500">position</p>
                    <p className="text-gray-500">phone number</p>
                    
                </div>

                <div className="h-65 w-64 bg-white shadow-lg rounded-lg p-4 flex flex-col items-center ">
                <img className="h-48 w-48 rounded-full object-cover" src={image} alt="User Image" />
                    <h3 className="text-lg font-bold mt-5">name name</h3>
                    <p className="text-gray-500">position</p>
                    <p className="text-gray-500">phone number</p>
                    
                </div>
                </div>

                

                
        
      
    </div>

    </>
    )
}

export default Home