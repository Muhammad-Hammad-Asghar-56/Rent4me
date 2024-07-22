import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProperty,deleteProperty,getSearchedData } from '../Context/PropertyApi';

const PropertyPage = () => {
    const navigate = useNavigate();
    const headers = ["propertyName", "address", "Edit", "Delete"];
    const displayHeaders = {"propertyName":"Property", "address":"Address","Edit":"Edit","Delete":"Delete"};
    const [tableData, setTableData] = React.useState([]);
    const [search,setSearch]=React.useState("");

    const handleAddNewClick = () => {
        navigate('/create/property');
    };

    const handleEditClick = (id) => {
        navigate(`/edit/property/${id}`);
    };
    const handleSearch = async (e) => {
        setSearch(e.target.value);
        if (e.target.value.trim() === "") {
            const data = await getProperty();
            console.log(data);
            setTableData(data);
        } else {
            const data = await getSearchedData(e.target.value);
            console.log(data);
            setTableData(data);
        }
    };
    const handleDeleteClick = async (id) => {
        // Implement delete functionality here
        console.log(`Delete property with ID: ${id}`);
        try {
            deleteProperty(id);
            setTableData((prevData) => prevData.filter((property) => property._id !== id));
        } catch (error) {
            alert('Failed to Delete property. Please try again.'); // Show error message to user
        }

        // Optionally: Call your delete API here
    };

    useEffect(() => {
        const getData = async () => {
            const data = await getProperty();
            setTableData(data);
        };
        getData();
    }, []);

    return (
        <div className='bg-white text-gray-900 h-full flex flex-col'>
            <div className='h-auto'>
                <h1 className='text-3xl text-navy'>Property Listing</h1>
            </div>
            <div className='flex flex-row h-auto mt-5 justify-center'>
                <div className='w-full pr-10'>
                    <input
                        type="text"
                        id="search"
                        value={search}
                        className="bg-gray-50 mb-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Search by Name"
                        required
                        onChange={handleSearch}     
                    />
                </div>
                <div className=''>
                    <button
                        type="button"
                        onClick={handleAddNewClick}
                        className="w-full py-2.5 px-5 text-nowrap text-sm font-medium text-white focus:outline-none bg-orange rounded-lg border border-gray-200 focus:z-10 focus:ring-4 focus:ring-amber-600"
                    >
                        New Property
                    </button>
                </div>
            </div>
            <div className='flex-grow'>
                <div className="relative h-80 overflow-x-auto overflow-y-scroll">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead className="text-xs text-gray-700 bg-gray-50">
                            <tr>
                                {headers.map((header, index) => (
                                    <th key={index} scope="col" className="px-6 py-3">
                                        {displayHeaders[header]}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((row) => (
                                <tr key={row._id} className="bg-white border-b">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {row.propertyName}
                                    </th>
                                    <td className="px-6 py-4">
                                        {row.address}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleEditClick(row._id)}
                                            className="text-blue-500 hover:text-blue-700"
                                        >
                                            Edit
                                        </button>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleDeleteClick(row._id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PropertyPage;
