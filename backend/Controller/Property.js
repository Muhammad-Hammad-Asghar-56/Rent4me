const Property = require('../Model/Property'); // Ensure the path is correct

async function getProperty(req, res) {
    try {
        const properties = await Property.find(); // Fetch all properties from the database
        res.json(properties); // Send response with all properties
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getSearchedProperty(req, res) {
    const searchTerm = req.params.search;
    console.log('Search Term:', searchTerm); // Log the search term
    try {
        const filteredProperties = await Property.find({
            propertyName: { $regex: searchTerm, $options: 'i' } // Case-insensitive search
        }).sort({ 'objects.upcomingServiceDate': 1 });
        res.json(filteredProperties);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function createProperty(req, res) {
    const { propertyName, address, objects } = req.body;
    // Convert objects to the required format
    const formattedObjects = objects.map(obj => ({
        // Assuming your object has a structure that includes a date field
        serviceName: obj.name,
        buyDate: new Date(obj.buyDate), // Convert string to Date
        model: obj.model
    }));
    const newProperty = new Property({
        propertyName,
        address,
        objects
    });

    try {
        const savedProperty = await newProperty.save(); // Save the new property to the database
        res.status(201).json(savedProperty); // Send response with the created property
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ message: error.message });
    }
}
async function getPropertyById(req, res) {
    const { id } = req.params; // Get the ID from the request parameters

    try {
        // Find the property by ID
        const property = await Property.findById(id);

        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }

        // Return the property details
        res.status(200).json(property);
    } catch (error) {
        console.error('Error fetching property:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

async function deleteProperty(req, res) {
    const { id } = req.params;

    try {
        const deletedProperty = await Property.findByIdAndDelete(id); // Delete the entry using _id
        if (!deletedProperty) return res.status(404).json({ message: 'Property not found' });
        res.json({ message: 'Property deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function updateServiceDates(req, res) {
    const { id } = req.params;
    const { objects } = req.body; // Expecting the complete objects array in the request body

    try {
        const updatedProperty = await Property.findByIdAndUpdate(
            id,
            { $set: { objects: objects } }, // Replace the entire objects array
            { new: true } // Return the updated document
        );
        if (!updatedProperty) return res.status(404).json({ message: 'Property not found' });
        res.json(updatedProperty); // Send response with updated property
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const getFilteredProperty = async (req, res) => {
    const { from, to } = req.query;

    if (!from || !to) {
        return res.status(400).json({ message: 'Please provide both from and to dates.' });
    }

    try {
        // Parse dates
        const fromDate = new Date(from);
        const toDate = new Date(to);

        if (isNaN(fromDate) || isNaN(toDate)) {
            return res.status(400).json({ message: 'Invalid date format.' });
        }

        const filteredProperties = await Property.find({
            'objects.upcomingServiceDate': { $gte: fromDate, $lte: toDate }
        }).sort({ 'objects.upcomingServiceDate': 1 });;

        res.json(filteredProperties);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getProperty,getPropertyById, getSearchedProperty,
    getFilteredProperty, createProperty, deleteProperty, updateServiceDates };
