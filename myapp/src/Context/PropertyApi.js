let preAPI = "http://localhost:3000/api";

const registerNewProperty = async (name, address, objects) => {
    let api = preAPI + "/property/create";
    const data = {
        propertyName: name,
        address: address,
        objects: objects
    };

    try {
        console.log(objects);
        const response = await fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        // Check if the response is okay (status code in the range 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json(); // Parse the JSON response
        return result; // Return the parsed response
    } catch (error) {
        console.error('Error creating property:', error);
        throw error; // Optionally rethrow the error for further handling
    }
};



const getProperty = async () => {
    const api = preAPI + "/get/property";

    try {
        const response = await fetch(api, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error fetching properties:', error);
        throw error;
    }
};

const getPropertyById = async (id) => {
    const api = `${preAPI}/get/property/${id}`; // Adjust the endpoint as needed

    try {
        const response = await fetch(api, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        return result; // Return the fetched property
    } catch (error) {
        console.error('Error fetching property by ID:', error);
        throw error;
    }
};

const deleteProperty = async (id) => {
    const api = `${preAPI}/property/delete/${id}`; // Adjust the endpoint as needed

    try {
        const response = await fetch(api, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log(`Property with ID ${id} deleted successfully.`);
    } catch (error) {
        console.error('Error deleting property:', error);
    }
};

const editProperty = async (id, propertyName, propertyAddress, objects) => {
    const api = preAPI + "/property/update/" + id;
    const data = {
        propertyName: propertyName,
        address: propertyAddress,
        objects: objects
    };

    try {
        console.log(objects);
        const response = await fetch(api, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Edit result: " + result);
        return result;
    } catch (error) {
        console.error('Error updating property:', error);
        throw error;
    }
}
const getSearchedData = async (searchText) => {
    const api = `${preAPI}/get/propertyByName/${searchText}`;
    
    try {
        const response = await fetch(api, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Check if the response is okay (status code in the range 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json(); // Parse the JSON response
        console.log("Searched Data:", result);
        return result; // Return the parsed response
    } catch (error) {
        console.error('Error fetching searched data:', error);
        throw error; // Optionally rethrow the error for further handling
    }
};
const getFilteredProperty=async (to,from) => {
    const api = `${preAPI}/properties/filter?from=${from}&to=${to}`;
    
    try {
        const response = await fetch(api);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const properties = await response.json();
        return properties;
    } catch (error) {
        console.error('Error fetching filtered properties:', error);
        return [];
    }
}

export {registerNewProperty,getProperty,getPropertyById,deleteProperty,editProperty,getSearchedData,getFilteredProperty}; // Directly export the function
