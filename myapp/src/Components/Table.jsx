import React from 'react';

const Table = ({ headers = [], data = [] }) => {
    return (
        <div className="relative h-80 overflow-x-auto overflow-y-scroll">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index} scope="col" className="px-6 py-3">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex} className="bg-white border-b">
                            {headers.map((header, colIndex) => (
                                colIndex === 0 ? 
                                <th key={colIndex} scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {row[header]}
                                </th> :
                                <td key={colIndex} className="px-6 py-4">
                                    {row[header]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;
