import React, { useEffect } from 'react';
import { getProperty,getFilteredProperty } from "../Context/PropertyApi.js";
import Datepicker from "react-tailwindcss-datepicker";
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';



const HomeFilterPage = () => {
  const navigate=useNavigate();
  const [tableData, setTableData] = React.useState([]);
  const headers = ["propertyName", "propertyAddress", "serviceName", "buyDate", "lastServiceDate", "upcomingServiceDate"];
  const displayHeaders = {"propertyName":"Property", "propertyAddress":"Address", "serviceName":"Object", "buyDate":"Buy Date", "lastServiceDate":"Last Service Date", "upcomingServiceDate":"Upcoming Service Date"};
  const [value, setValue] = React.useState({
    startDate: null,
    endDate: null
  });

  const handleValueChange = (newValue) => {
    setValue(newValue);
    handleFilter(newValue);
  };

  const updateTable = async (from, to) => {
    // Format dates using dayjs
    const formattedFrom = dayjs(from).format('YYYY-MM-DD');
    const formattedTo = dayjs(to).format('YYYY-MM-DD');
    
    try {
      if (!from && !to) {
        // If both dates are null, fetch all properties
        const data = await getProperty();
        const flattenedData = data.flatMap(property =>
            property.objects.map(obj => ({
                propertyName: property.propertyName,
                address: property.address,
                serviceName: obj.name,
                buyDate: obj.buyDate,
                lastServiceDate: obj.lastServiceDate,
                upcomingServiceDate: obj.upcomingServiceDate
            }))
        );
        setTableData(flattenedData);
        return;
    }
      const data = await getFilteredProperty(formattedTo, formattedFrom);

      const filteredData = data.map(property => {
        const filteredObjects = property.objects.filter(obj => {
          const upcomingDate = dayjs(obj.upcomingServiceDate); // Use dayjs for date comparison
          return upcomingDate.isBetween(dayjs(from), dayjs(to), null, '[]'); // Include both from and to dates
        });
      
        // Only return properties that have filteredObjects
        if (filteredObjects.length > 0) {
          return {
            ...property,
            objects: filteredObjects
          };
        }
      
        return null; // Filter out properties where no objects match the date range
      }).filter(Boolean); 

      const flattenedData = filteredData.flatMap(property =>
        property.objects.map(obj => ({
          propertyName: property.propertyName,
          address: property.address,
          serviceName: obj.name,
          buyDate: obj.buyDate,
          lastServiceDate: obj.lastServiceDate,
          upcomingServiceDate: obj.upcomingServiceDate
        }))
      );
      // Sort the data by upcomingServiceDate
      const sortedData = flattenedData.sort((a, b) => dayjs(a.upcomingServiceDate).diff(dayjs(b.upcomingServiceDate)));
      setTableData(sortedData);
    } catch (error) {
      console.error("Error fetching filtered property:", error);
    }
  };

  const handleFilter = (newValue) => {
    const formattedFrom = newValue.startDate ? dayjs(newValue.startDate).format('YYYY-MM-DD') : '';
    const formattedTo = newValue.endDate ? dayjs(newValue.endDate).format('YYYY-MM-DD') : '';
    
    updateTable(formattedFrom, formattedTo);
  };

  const formatDate = (date) => {
    return date ? new Date(date).toLocaleDateString() : 'N/A';
  };



  useEffect(()=>{
    const fillData=async()=>{
      try {
        const data = await getProperty();

        const flattenedData = data.flatMap(property =>
          property.objects.map(obj => ({
            propertyName: property.propertyName,
            address: property.address,
            serviceName: obj.name,
            buyDate: obj.buyDate,
            lastServiceDate: obj.lastServiceDate,
            upcomingServiceDate: obj.upcomingServiceDate
          }))
        );
        const sortedData = flattenedData.sort((a, b) => dayjs(a.upcomingServiceDate).diff(dayjs(b.upcomingServiceDate)));
        setTableData(sortedData);
      } catch (error) {
        console.error("Error fetching filtered property:", error);
      }
    }
    fillData();

  },[])

  return (
    <div className='bg-white text-gray-900 h-full mt-7 pt-0'>
      <h1 className='text-3xl text-navy'>Dashboard</h1>
      <div className='flex flex-row-reverse'>
        <div className='relative w-1/3 border border-gray-200 rounded-lg '>
          <Datepicker 
            value={value} 
            onChange={handleValueChange}
            showShortcuts={true}
            asSingle={false}
            popoverDirection="left" // Ensures the popup opens to the left side
          />
        </div>
      </div>
      <div className='mt-5'>
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
              {tableData.map((row, index) => (
                row.upcomingServiceDate != null && (
                  <tr key={index} className="bg-white border-b">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {row.propertyName}
                    </th>
                    <td className="px-6 py-4">
                      {row.address}
                    </td>
                    <td className="px-6 py-4">
                      {row.serviceName}
                    </td>
                    <td className="px-6 py-4">
                      {formatDate(row.buyDate)}
                    </td>
                    <td className="px-6 py-4">
                      {formatDate(row.lastServiceDate)}
                    </td>
                    <td className="px-6 py-4">
                      {formatDate(row.upcomingServiceDate)}
                    </td>
                  </tr>
                )
              ))}

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeFilterPage;
