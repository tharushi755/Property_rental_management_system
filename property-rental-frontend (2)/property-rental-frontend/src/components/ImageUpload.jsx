import { useState } from "react";
import axios from "axios";

function ImageUpload({ onUploadSuccess }) {
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      handleUpload(file);
    }
  };

  const handleUpload = async (file) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/upload/image",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      onUploadSuccess(response.data.imageUrl);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {uploading && <p>Uploading...</p>}
      {preview && <img src={preview} alt="Preview" width="200" />}
    </div>
  );
}

export default ImageUpload;