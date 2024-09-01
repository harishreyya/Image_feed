import { useState } from 'react';
import axios from 'axios';

function ImageUpload({ onUpload }) {
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!image) return;
        setUploading(true);

        const formData = new FormData();
        formData.append('image', image);

        try {
            const response = await axios.post(
                'http://localhost:5002/upload'
                , formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            });
            onUpload(response.data.url);
            setImageUrl(response.data.url);
            setImage(null);
            
         setTimeout(() => {
                window.location.reload();
            }, 3000);
        } catch (error) {
            console.log("Error uploading image:", error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="image-upload">
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <button onClick={handleUpload} disabled={uploading}>
                {uploading ? "Uploading..." : "Upload Image"}
            </button>
            {uploading && <div className="skeleton-loader"></div>}
            {imageUrl && !uploading && <img src={imageUrl} alt="Uploaded" />}
        </div>
    );
}

export default ImageUpload;
