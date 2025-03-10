import { watches } from '../data/data.js';

// Helper functions for validation
const isString = (value) => typeof value === 'string' && value.trim().length > 0;
const isInteger = (value) => Number.isInteger(value);
const isNumber = (value) => typeof value === 'number' && value > 0;
const isArrayOfStrings = (value) => Array.isArray(value) && value.every(isString);

// Get all watches with optional filters
export const getAllWatches = (req, res) => {
    let filteredWatches = watches;

    console.log(req.query); // Log the query parameters to ensure they're being passed correctly

    // Helper function to check if a value is an integer
    const isInteger = (value) => Number.isInteger(value);

    // Filter by brand
    if (req.query.brand) {
        filteredWatches = filteredWatches.filter(w => w.brand?.toLowerCase() === req.query.brand.toLowerCase());
    }

    // Filter by model
    if (req.query.model) {
        filteredWatches = filteredWatches.filter(w => w.model?.toLowerCase() === req.query.model.toLowerCase());
    }

    // Filter by year of release
    if (req.query.yearOfRelease) {
        filteredWatches = filteredWatches.filter(w => w.yearOfRelease === parseInt(req.query.yearOfRelease));
    }

    // Filter by price range
    if (req.query.minPrice || req.query.maxPrice) {
        const minPrice = req.query.minPrice !== undefined ? parseInt(req.query.minPrice, 10) : 0;  // Default to 0 if minPrice is not provided
        const maxPrice = req.query.maxPrice !== undefined ? parseInt(req.query.maxPrice, 10) : Infinity;  // Default to Infinity if maxPrice is not provided

        console.log(`Filtering by price range: minPrice = ${minPrice}, maxPrice = ${maxPrice}`);

        // Validate that both minPrice and maxPrice are integers
        if (!isInteger(minPrice) || !isInteger(maxPrice)) {
            return res.status(400).json({ message: 'Price filters must be valid integers' });
        }

        // Apply price range filter
        filteredWatches = filteredWatches.filter(w => w.price >= minPrice && w.price <= maxPrice);
    }

    // Check if any watches match the filters
    if (filteredWatches.length === 0) {
        return res.status(404).json({ message: 'No watches found matching the search criteria' });
    }

    res.json(filteredWatches);
};

// Get a single watch by ID
export const getWatchById = (req, res) => {
    const watch = watches.find(w => w.watchID === parseInt(req.params.watchID));
    if (!watch) return res.status(404).json({ error: 'Watch not found' });
    res.json(watch);
};

// Controller to get a watch by brand name
export const getWatchByBrand = (req, res) => {
    const brandName = req.params.brand.toLowerCase();

    // Find watch by brand (case-insensitive search)
    const watch = watches.find(w => w.brand.toLowerCase() === brandName);

    if (!watch) {
        return res.status(404).json({ error: 'Watch not found' });
    }

    res.json(watch);
};

// Create a new watch
export const createWatch = (req, res) => {
    const { brand, model, yearOfRelease, price, endDate, imageUrl, imageThumbnails } = req.body;

    // Validate inputs
    if (!isString(brand) || !isString(model) || !isString(endDate) || !isString(imageUrl)) {
        return res.status(400).json({ message: 'Brand, model, endDate, and imageUrl must be valid strings' });
    }

    if (!isInteger(yearOfRelease)) {
        return res.status(400).json({ message: 'Year of release must be an integer' });
    }

    if (!isNumber(price)) {
        return res.status(400).json({ message: 'Price must be a valid number greater than zero' });
    }

    // Validate imageThumbnails
    if (!imageThumbnails || !isArrayOfStrings(imageThumbnails)) {
        return res.status(400).json({ message: 'Image thumbnails must be an array of valid URLs' });
    }

    const newWatch = {
        watchID: watches.length + 1,
        brand,
        model,
        yearOfRelease,
        price,
        endDate,
        imageUrl,
        imageThumbnails // Add thumbnails to the new watch
    };

    watches.push(newWatch);
    res.status(201).json(newWatch);
};

// Update a watch
export const updateWatch = (req, res) => {
    const watch = watches.find(w => w.watchID === parseInt(req.params.watchID));
    if (!watch) return res.status(404).json({ error: 'Watch not found' });

    const { brand, model, yearOfRelease, price, endDate, imageUrl, imageThumbnails } = req.body;

    // Validate inputs if they are provided
    if (brand && !isString(brand)) return res.status(400).json({ message: 'Brand must be a valid string' });
    if (model && !isString(model)) return res.status(400).json({ message: 'Model must be a valid string' });
    if (endDate && !isString(endDate)) return res.status(400).json({ message: 'End date must be a valid string' });
    if (imageUrl && !isString(imageUrl)) return res.status(400).json({ message: 'Image URL must be a valid string' });
    if (yearOfRelease !== undefined && !isInteger(yearOfRelease)) return res.status(400).json({ message: 'Year of release must be an integer' });
    if (price !== undefined && (!isNumber(price))) return res.status(400).json({ message: 'Price must be a valid number greater than zero' });

    // Validate imageThumbnails if provided
    if (imageThumbnails && !isArrayOfStrings(imageThumbnails)) {
        return res.status(400).json({ message: 'Image thumbnails must be an array of valid URLs' });
    }

    // Update the watch with the provided values
    if (brand) watch.brand = brand;
    if (model) watch.model = model;
    if (yearOfRelease !== undefined) watch.yearOfRelease = yearOfRelease;
    if (price !== undefined) watch.price = price;
    if (endDate) watch.endDate = endDate;
    if (imageUrl) watch.imageUrl = imageUrl;
    if (imageThumbnails) watch.imageThumbnails = imageThumbnails; // Update image thumbnails if provided

    res.json(watch);
};

// Delete a watch
export const deleteWatch = (req, res) => {
    const watchIndex = watches.findIndex(w => w.watchID === parseInt(req.params.watchID));
    if (watchIndex === -1) return res.status(404).json({ error: 'Watch not found' });

    watches.splice(watchIndex, 1);
    res.status(204).send();
};