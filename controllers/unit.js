import Unit from '../models/Unit.js';

// Create a new unit
export const createUnit = async (req, res) => {
  try {
    const unit = await Unit.create(req.body);
    res.status(201).json(unit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a unit
export const updateUnit = async (req, res) => {
  try {
    const unit = await Unit.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!unit) {
      return res.status(404).json({ message: 'Unit not found' });
    }
    res.json(unit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a unit
export const deleteUnit = async (req, res) => {
  try {
    const unit = await Unit.findByIdAndDelete(req.params.id);
    if (!unit) {
      return res.status(404).json({ message: 'Unit not found' });
    }
    res.json({ message: 'Unit deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/// Get all units
export const getUnits = async (req, res) => {
    try {
      const units = await Unit.find();
      res.json(units);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Get a single unit by ID
  export const getUnitById = async (req, res) => {
    try {
      const unit = await Unit.findById(req.params.id);
      if (!unit) {
        return res.status(404).json({ message: 'Unit not found' });
      }
      res.json(unit);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };