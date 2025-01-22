import { toast } from "react-toastify";
const validation = (formData) => {
    for (const [key, value] of Object.entries(formData)) {
        if (!value.trim()) {
          toast.error(`${key.charAt(0).toUpperCase() + key.slice(1)} is required.`);
          
          
          return false;
        }
    
        // Additional field-specific validations
        if (key === "age" && (isNaN(value) || value < 10 || value > 100)) {
          toast.error("Please enter a valid age (10-100).");
          return false;
        }
    
        if (key === "confirmPassword" && formData.password !== formData.confirmPassword) {
          toast.error("Passwords do not match.");
          return false;
        }
      }
      return true;
};
export default validation;
