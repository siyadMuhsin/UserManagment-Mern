import multer from "multer";
import path from 'path'
const storage=multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');  // Save the uploaded image in the 'uploads' folder
      },
      filename: (req, file, cb) => {
        const userId = req.params.userId;  // Get the user ID from the route parameter
        cb(null, `${userId}-${Date.now()}${path.extname(file.originalname)}`);  // Save with user ID and timestamp
      }
})
const upload= multer({storage:storage})
export default upload.single('image')