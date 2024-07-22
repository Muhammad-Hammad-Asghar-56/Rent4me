// import React, { useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import Cancellogo from "../assets/cross.png";
// import {registerNewProperty} from "../Context/PropertyApi";
// import DatePicker from 'react-datepicker';
// import "react-datepicker/dist/react-datepicker.css"; // Import the styles
// import { useNavigate } from 'react-router-dom';

// const CreateNewProperty = () => {
//     const navigate = useNavigate();
//     const { register, handleSubmit } = useForm();
//     const [services, setServices] = React.useState([]);
    
    
//     const [serviceName, setServiceName] = React.useState('');
//     const [model, setModel] = React.useState(null);
//     const [buyDate, setBuyDate] = React.useState(null); // State for buyDate


//     const addService = (e) => {
//         setServices([...services, {"name":serviceName,"model":model,"buyDate":buyDate}]);
//     };

//     const onSubmit = async (data) => {
//         try {
            
//             const response = await registerNewProperty(data["propertyName"], data["address"],services);
//             console.log('Property registered successfully:', response.data); // Log success message    
            
//             navigate("/property"); // Redirect to the property page
        
            
//         } catch (error) {
//             console.error('Error registering property:', error); // Log error message
//             alert('Failed to register property. Please try again.'); // Show error message to user
//         }
//     };
    

//     const removeService = (service) => {
//         setServices(services.filter(s => s["name"] !== service));
//     };

//     useEffect(()=>{

//     },[])

//     return (
//         <div className='bg-white text-gray-900 h-full'>
//             <h1 className='text-3xl text-navy'>Register New Property</h1>
//             <div className='w-full mt-2 flex flex-row justify-center items-center bg-slate-100 rounded-lg pt-2 pb-2'>
//                 <div className='flex flex-col mt-10 w-1/2 justify-center'>
//                     <input
//                         type="text"
//                         id="name"
//                         className="bg-gray-50 mb-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//                         placeholder="Property Name"
//                         required
//                         {...register("propertyName")}
//                     />
//                     <input
//                         type="text"
//                         id="address"
//                         className="bg-gray-50 mb-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//                         placeholder="House Address"
//                         required
//                         {...register("address")}
//                     />
                 
//                     <div className='flex flex-row gap-2'>
//                         <input
//                             type="text"
//                             id="service"
//                             value={serviceName}
//                             onChange={(e) => setServiceName(e.target.value)}
//                             className="bg-gray-50 mb-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2.5"
//                             placeholder="Object"
//                             required
//                             />

//                         <input
//                             type="text"
//                             id="model"
//                             value={model}
//                             onChange={(e) => setModel(e.target.value)}
//                             className="bg-gray-50 mb-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/6 p-2.5"
//                             placeholder="Model"
//                             required
//                             />
                        
//                         <DatePicker
//                             selected={buyDate}
//                             onChange={(date) => setBuyDate(date)}
//                             placeholderText="Date"
//                             dateFormat="yyyy-MM-dd"
//                             className="bg-gray-50 mb-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" // Add padding for the icon
//                             />
//                         <div>

//                         <button
//                             type="button"
//                             onClick={()=>addService()}
//                             className="w-full py-2.5 px-5 me-2 mb-2  text-sm font-medium text-white focus:outline-none bg-navy rounded-lg border border-gray-200 focus:z-10 focus:ring-4 focus:ring-blue-500"
//                             >
//                             Add
//                         </button>
//                             </div>
//                     </div>


//                     <div className='bg-gray-200 flex flex-row flex-wrap pt-10 pb-10 pl-5 pr-5 rounded-lg'>
//                         {services.map((service, index) => (
//                             <div key={index} className='flex items-center m-1 p-2 bg-orange rounded'>
//                                 <span className='mr-2'>{service["name"]}</span>
//                                 <button onClick={() => removeService(service["name"])}>
//                                     <img src={Cancellogo} alt="" width={10} height={10} />
//                                 </button>
//                             </div>
//                         ))}
//                     </div>
//                     <button
//                         type="button"
//                         onClick={handleSubmit(onSubmit)}
//                         className="w-full mt-5 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-white focus:outline-none bg-navy rounded-lg border border-gray-200 focus:z-10 focus:ring-4 focus:ring-blue-500"
//                     >
//                         Register
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CreateNewProperty;


import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Cancellogo from "../assets/cross.png";
import { registerNewProperty } from "../Context/PropertyApi";
import Datepicker from "react-tailwindcss-datepicker";
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

const CreateNewProperty = () => {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const [services, setServices] = React.useState([]);
    const [serviceName, setServiceName] = React.useState('');
    const [model, setModel] = React.useState('');
    const [buyDate, setBuyDate] = React.useState(null); // State for buyDate

    const addService = () => {
        setServices([...services, { "name": serviceName, "model": model, "buyDate": buyDate }]);
        setServiceName('');
        setModel('');
        setBuyDate(null);
    };

    const onSubmit = async (data) => {
        try {
            const response = await registerNewProperty(data["propertyName"], data["address"], services);
            console.log('Property registered successfully:', response.data);
            navigate("/property");
        } catch (error) {
            console.error('Error registering property:', error);
            alert('Failed to register property. Please try again.');
        }
    };

    const removeService = (serviceName) => {
        setServices(services.filter(s => s["name"] !== serviceName));
    };

    useEffect(() => {}, []);

    return (
        <div className='bg-white text-gray-900 h-full'>
            <h1 className='text-3xl text-navy'>Register New Property</h1>
            <div className='w-full mt-2 flex flex-row justify-center items-center bg-slate-100 rounded-lg pt-2 pb-2'>
                <div className='flex flex-col mt-10 w-1/2 justify-center'>
                    <input
                        type="text"
                        id="name"
                        className="bg-gray-50 mb-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Property Name"
                        required
                        {...register("propertyName")}
                    />
                    <input
                        type="text"
                        id="address"
                        className="bg-gray-50 mb-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="House Address"
                        required
                        {...register("address")}
                    />
                    <div className='flex flex-row gap-2'>
                        <input
                            type="text"
                            id="service"
                            value={serviceName}
                            onChange={(e) => setServiceName(e.target.value)}
                            className="bg-gray-50 mb-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2.5"
                            placeholder="Object"
                            required
                        />
                        <input
                            type="text"
                            id="model"
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                            className="bg-gray-50 mb-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/6 p-2.5"
                            placeholder="Model"
                            required
                        />
                        <div className='h-full border border-gray-200 rounded-lg mx-0 my-0 p-0'>

                            <Datepicker
                                value={buyDate}
                                onChange={(newValue) => setBuyDate(newValue)}
                                primaryColor={"blue"} 
                                useRange={false}
                                asSingle={true}
                                displayFormat="YYYY-MM-DD"
                                popoverDirection="down"
                                />
                        </div>
                        <button
                            type="button"
                            onClick={addService}
                            className="w-1/3  h-full py-2.5 px-5 me-2 mb-2  text-sm font-medium text-white focus:outline-none bg-navy rounded-lg border border-gray-200 focus:z-10 focus:ring-4 focus:ring-blue-500"
                        >
                            Add
                        </button>
                    </div>
                    <div className='bg-gray-200 flex flex-row flex-wrap pt-10 pb-10 pl-5 pr-5 rounded-lg'>
                        {services.map((service, index) => (
                            <div key={index} className='flex items-center m-1 p-2 bg-orange rounded'>
                                <span className='mr-2'>{service["name"]}</span>
                                <button onClick={() => removeService(service["name"])}>
                                    <img src={Cancellogo} alt="" width={10} height={10} />
                                </button>
                            </div>
                        ))}
                    </div>
                    <button
                        type="button"
                        onClick={handleSubmit(onSubmit)}
                        className="w-full mt-5 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-white focus:outline-none bg-navy rounded-lg border border-gray-200 focus:z-10 focus:ring-4 focus:ring-blue-500"
                    >
                        Register
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateNewProperty;

