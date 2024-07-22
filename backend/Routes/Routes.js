const express = require('express');
const router = express.Router();
const PropertyController = require('../Controller/Property.js');

// Route 1: Get All Properties
router.get('/get/property', PropertyController.getProperty);
// Route 1: Get Property by Id
router.get('/get/property/:id', PropertyController.getPropertyById);

// Route 2: Get Property by Search Term
router.get('/get/propertyByName/:search', PropertyController.getSearchedProperty);

// Route 3: Create Property
router.post('/property/create', PropertyController.createProperty);

// Route 4: Delete Property
router.delete('/property/delete/:id', PropertyController.deleteProperty);

// Route 5: Update Service Dates
router.put('/property/update/:id', PropertyController.updateServiceDates);

// Route 5: Update Service Dates
router.get('/properties/filter', PropertyController.getFilteredProperty);

module.exports = router;
