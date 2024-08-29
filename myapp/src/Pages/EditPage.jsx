import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getPropertyById, editProperty } from "../Context/PropertyApi";
import { useNavigate, useParams } from 'react-router-dom';
import Datepicker from 'react-tailwindcss-datepicker';
import Modal from '../Components/Model';
import dayjs from 'dayjs';;

const EditPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const [services, setServices] = useState([]);
    const serviceTableHeader = ["name", "model", "buyDate", "lastServiceDate", "upcomingServiceDate", "Delete"];
    const displayTableHeader = {"name":"Object", "model":"Model", "buyDate":"Buy Date", "lastServiceDate":"Last Service Date", "upcomingServiceDate":"Upcoming Service Date", "Delete":"Delete"};
    const [propertyName, setPropertyName] = useState("");
    const [address, setAddress] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [currentDateIndex, setCurrentDateIndex] = useState(null);
    const [currentDateField, setCurrentDateField] = useState("");
    const [newServiceName,setNewServiceName]=useState("");
    const [serviceModel,setServiceModel]=useState("");
    const [newServiceBuyDate, setNewServiceBuyDate]=useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getPropertyById(id);
                setServices(data.objects || []);
                setPropertyName(data["propertyName"]);
                setAddress(data["address"]);
            } catch (error) {
                console.error('Error fetching property data:', error);
            }
        };

        fetchData();
    }, [id]);

    const onSubmit = async (data) => {
        try {
            await editProperty(id,propertyName, address, services);
            navigate("/property");
        } catch (error) {
            console.error('Error registering property:', error);
            alert('Failed to register property. Please try again.');
        }
    };

    const handleInputChange = (index, field, value) => {
        const updatedServices = [...services];
        updatedServices[index][field] = value;
        setServices(updatedServices);
    };

    const removeService = (index) => {
        setServices(services.filter((_, i) => i !== index));
    };

    const openDateModal = (index, field) => {
        setCurrentDateIndex(index);
        setCurrentDateField(field);
        setShowModal(true);
    };

    const handleDateChange = (date) => {
        if (currentDateIndex !== null && currentDateField) {
            const updatedServices = [...services];
            updatedServices[currentDateIndex][currentDateField] = date;
            setServices(updatedServices);
        }
        setShowModal(false);
    };

    const addService = () =>{
        if(newServiceName==="" || serviceModel===""){
            alert("Object name and model should not be empty");
            return;
        }
        // Convert newServiceBuyDate to a valid date format if it's not null
        const formattedBuyDate = newServiceBuyDate?.startDate ? new Date(newServiceBuyDate.startDate).toISOString() : null;
        
        const body={
            buyDate: formattedBuyDate,
            lastServiceDate: null,
            upcomingServiceDate: null,
            name:newServiceName,
            model:serviceModel
        }
        setServices(prevServices => [...prevServices, body]);


        setNewServiceName("");
        setServiceModel("");
    }

    const formatDisplayDate=(date)=>{
        
        if(date==null){
            return ""
        }
        return new Date(date).toISOString().split('T')[0];
        // return date;

    }
    return (
        <div className='bg-white text-gray-900 h-full z-0'>
            <h1 className='text-3xl text-navy'>Edit Property</h1>
            <div className='w-full mt-2 px-2 flex flex-row justify-center items-center bg-slate-100 rounded-lg pt-2 pb-2'>
                <div className='flex flex-col mt-10 w-full justify-center'>
                    <input
                        type="text"
                        id="name"
                        value={propertyName}
                        onChange={(e) => setPropertyName(e.target.value)}
                        className="bg-gray-50 mb-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Property Name"
                        required
                        {...register("propertyName")}
                    />
                    <input
                        type="text"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="bg-gray-50 mb-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="House Address"
                        required
                        {...register("address")}
                    />
                    
                    <div className='flex flex-row gap-2'>
                        <input
                            type="text"
                            id="service"
                            value={newServiceName}
                            onChange={(e) => setNewServiceName(e.target.value)}
                            className="bg-gray-50 mb-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2.5"
                            placeholder="Object"
                            required
                        />
                        <input
                            type="text"
                            id="model"
                            value={serviceModel}
                            onChange={(e) => setServiceModel(e.target.value)}
                            className="bg-gray-50 mb-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/6 p-2.5"
                            placeholder="Model"
                            required
                        />
                        <div className='h-full border border-gray-200 rounded-lg mx-0 my-0 p-0'>

                            <Datepicker
                                value={newServiceBuyDate}
                                onChange={(newValue) => setNewServiceBuyDate(newValue)}
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
                    <div className="relative h-full overflow-x-auto overflow-y-scroll">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead className="text-xs text-gray-700 bg-gray-50">
                            <tr>
                                {serviceTableHeader.map((header, index) => (
                                    <th key={index} scope="col" className="px-6 py-3">
                                        {displayTableHeader[header]}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                            <tbody>
                                {services.map((service, index) => (
                                    <tr key={index} className="bg-white border-b">
                                        {serviceTableHeader.map((header, colIndex) => {
                                            if (colIndex < 5) {
                                                return (
                                                    <td key={colIndex} className="px-2 py-4">
                                                        {header.includes('Date') ? (
                                                            <div className="relative">
                                                                <input
                                                                    type="text"
                                                                    value={service[header] ? formatDisplayDate(new Date(service[header])) : ""}
                                                                    onClick={() => openDateModal(index, header)}
                                                                    readOnly
                                                                    className="bg-gray-50 border border-gray-300 rounded-lg p-1 z-10"
                                                                />
                                                            </div>
                                                        ) : (
                                                            <input
                                                                type="text"
                                                                value={service[header]}
                                                                onChange={(e) => handleInputChange(index, header, e.target.value)}
                                                                className="border border-gray-300 rounded-lg p-1"
                                                            />
                                                        )}
                                                    </td>
                                                );
                                            } else if (colIndex === 5) {
                                                return (
                                                    <td key={colIndex} className="px-6 py-4">
                                                        <button onClick={() => removeService(index)} className="text-red-500 hover:text-red-700">
                                                            Delete
                                                        </button>
                                                    </td>
                                                );
                                            }
                                            return null;
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <button
                        type="button"
                        onClick={handleSubmit(onSubmit)}
                        className="w-full mt-5 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-white focus:outline-none bg-navy rounded-lg border border-gray-200 focus:z-10 focus:ring-4 focus:ring-blue-500"
                    >
                        Save
                    </button>
                </div>
            </div>

            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <Datepicker
                    value={services[currentDateIndex] && services[currentDateIndex][currentDateField] ? new Date(services[currentDateIndex][currentDateField]).toISOString().split('T')[0] : ""}
                    onChange={(date) => handleDateChange(date ? date.startDate : null)}
                    useRange={false}
                    asSingle={true}
                    displayFormat="YYYY-MM-DD"
                    inputClassName="bg-gray-50 border border-gray-300 rounded-lg p-1 z-10"
                />
            </Modal>
        </div>
    );
};

export default EditPage;
