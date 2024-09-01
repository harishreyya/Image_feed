import { useEffect, useState } from 'react';
import axios from 'axios';
import ImageItem from './ImageItem';

function ImageFeed() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:5002/images'
                    , { withCredentials: true });
                setImages(response.data);
            } catch (error) {
                console.error("Error fetching images:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(
                `http://localhost:5002/images/${id}`
                , { withCredentials: true });
            setImages(images.filter(image => image._id !== id));
        } catch (error) {
            console.error("Error deleting image:", error);
        }
    };

    return (
        <div className="image-feed">
            {loading ? (
                Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="skeleton-loader"></div>
                ))
            ) : (
                images.map(image => (
                    <ImageItem key={image._id} image={image} onDelete={handleDelete} />
                ))
            )}
        </div>
    );
}

export default ImageFeed;
