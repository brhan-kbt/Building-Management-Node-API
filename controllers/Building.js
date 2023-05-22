import multer from 'multer';
import path from 'path';
import Building from '../models/Building.js';
import Floor from '../models/Floor.js';

// Set up multer storage for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images'); // Specify the destination folder for storing images
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + path.extname(file.originalname); // Generate a unique filename
    cb(null, fileName);
  },
});

// Create a multer instance
const upload = multer({ storage });

// Create a new building
export const createBuilding = async (req, res) => {
    try {
      upload.single('photo')(req, res, async (err) => {
        if (err) {
          // Handle multer errors
          return res.status(400).json({ message: err.message });
        }
  
        console.log(req.body);
        const { code, type, description } = req.body;
  
        // Get the path of the uploaded file
        const photoPath = req.file ? req.file.path.replace(/\\/g, '/') : '';

        // Get the full URL path with port
        const fullPhotoUrl = `${req.protocol}://${req.get('host')}/${photoPath}`;
  
  
        const building = await Building.create({ code, type, description, photo: fullPhotoUrl });
        res.status(201).json(building);
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
};
  


// Get all buildings
export const getBuildings = async (req, res) => {
  try {
    const buildings = await Building.find().populate('floors');
    res.json(buildings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Update a building
export const updateBuilding = async (req, res) => {
  try {
    const { code, type, description } = req.body;

    // Get the absolute path of the uploaded file
    const photo = req.file ? path.join(__dirname, '..', 'images', req.file.filename) : '';

    const building = await Building.findByIdAndUpdate(
      req.params.id,
      { code, type, description, photo },
      { new: true }
    );
    if (!building) {
      return res.status(404).json({ message: 'Building not found' });
    }
    res.json(building);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ... continue with the remaining CRUD operations



// Get a single building by ID
export const getBuildingById = async (req, res) => {
    try {
      const building = await Building.findById(req.params.id).populate('floors');
      if (!building) {
        return res.status(404).json({ message: 'Building not found' });
      }
      res.json(building);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Delete a building
export const deleteBuilding = async (req, res) => {
  try {
    const building = await Building.findByIdAndDelete(req.params.id);
    if (!building) {
      return res.status(404).json({ message: 'Building not found' });
    }
    
    // When deleting a building, also delete the associated floors
    await Floor.deleteMany({ building: req.params.id });
    
    res.json({ message: 'Building deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
