import React from 'react';
import { useForm } from 'react-hook-form';
import Datepicker from "react-tailwindcss-datepicker";

const FilterOptionDropDown = ({ updateTable }) => {
    const { handleSubmit } = useForm();
    const [isOpen, setIsOpen] = React.useState(false);
    const [value, setValue] = React.useState({
        startDate: null,
        endDate: null
    });

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleValueChange = (newValue) => {
        setValue(newValue);
    };

    const send = () => {
        setIsOpen(!isOpen);
        const formattedFrom = value.startDate ? value.startDate.format('YYYY-MM-DD') : '';
        const formattedTo = value.endDate ? value.endDate.format('YYYY-MM-DD') : '';
        console.log({ from: formattedFrom, to: formattedTo });
        updateTable(formattedFrom, formattedTo);
    };

    return (
        <div className="relative">
            <button 
                onClick={toggleDropdown} 
                id="dropdownDefaultButton" 
                data-dropdown-toggle="dropdown" 
                className="text-white bg-orange hover:bg-orange focus:ring-amber-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center" 
                type="button"
            >
                Dropdown button 
                <svg 
                    className="w-2.5 h-2.5 ms-3" 
                    aria-hidden="true" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 10 6"
                >
                    <path 
                        stroke="currentColor" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="m1 1 4 4 4-4"
                    />
                </svg>
            </button>
            
            {/* Drop Menu */}
            <div 
                id="dropdown" 
                className={`z-50 pt-3 pb-3 pl-2 pr-2 mt-1 items-center ${isOpen ? 'block' : 'hidden'} absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 right-0`}
            >
                <form onSubmit={handleSubmit(send)}>
                    <Datepicker 
                        value={value} 
                        onChange={handleValueChange}
                        showShortcuts={true}
                        primaryColor={"orange"}
                        asSingle={false}
                        classNames={{
                            container: "bg-gray-50 mb-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        }}
                        popoverDirection="left" // Ensures the popup opens to the left side
                    />
                    <button 
                        type="submit" 
                        className="w-full mt-5 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-white focus:outline-none bg-navy rounded-lg border border-gray-200 focus:z-10 focus:ring-4 focus:ring-blue-500"
                    >
                        Filter
                    </button>
                </form>
            </div>
        </div>
    );
}

export default FilterOptionDropDown;
