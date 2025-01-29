import { useState } from "react";
import axios from "axios";

const ImageUploader = () => {
  const [imageUrl, setImageUrl] = useState(null); 
  const [loading, setLoading] = useState(false);


  const handleImageUpload = async (event) => {
    const file = event.target.files[0]; 
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file); 
    setLoading(true); 
    try {
      // Send POST request to the backend
      const response = await axios.post(
        "http://localhost:5000/upload-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

    
      setImageUrl(response.data.imageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div style={styles.container}>
      <h1>Image Uploader</h1>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={styles.input}
        disabled={loading}
      />
      {loading && <p>Uploading...</p>}
      {imageUrl && (
        <div style={styles.imageContainer}>
          <h2>Uploaded Image:</h2>
          <img src={imageUrl} alt="Uploaded" style={styles.image} />
        </div>
      )}
    </div>
  );
};

// Styles for the component
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  input: {
    margin: "20px 0",
  },
  imageContainer: {
    marginTop: "20px",
    textAlign: "center",
  },
  image: {
    maxWidth: "100%",
    height: "auto",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
};

export default ImageUploader;
