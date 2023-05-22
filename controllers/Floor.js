import Floor from '../models/Floor.js';
import Unit from '../models/Unit.js';

// Create a new floor
export const createFloor = async (req, res) => {
  try {
    const floor = await Floor.create(req.body);
    res.status(201).json(floor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a floor
export const updateFloor = async (req, res) => {
  try {
    const floor = await Floor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!floor) {
      return res.status(404).json({ message: 'Floor not found' });
    }
    res.json(floor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a floor
export const deleteFloor = async (req, res) => {
  try {
    const floor = await Floor.findByIdAndDelete(req.params.id);
    if (!floor) {
      return res.status(404).json({ message: 'Floor not found' });
    }
    
    // When deleting a floor, also delete the associated units
    await Unit.deleteMany({ floor: req.params.id });
    
    res.json({ message: 'Floor deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all floors with populated units
export const getFloors = async (req, res) => {
    try {
      const floors = await Floor.find().populate('units');
      res.json(floors);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Get a single floor by ID with populated units
  export const getFloorById = async (req, res) => {
    try {
      const floor = await Floor.findById(req.params.id).populate('units');
      if (!floor) {
        return res.status(404).json({ message: 'Floor not found' });
      }
      res.json(floor);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };