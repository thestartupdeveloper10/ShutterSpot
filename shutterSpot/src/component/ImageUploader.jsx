import { useState } from 'react';

const ImageUploader = () => {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrls, setUploadedUrls] = useState([]);

  // Replace these with your actual Cloudinary credentials
  const CLOUD_NAME = import.meta.env.VITE_API_CLOUD_NAME;
  const UPLOAD_PRESET = import.meta.env.VITE_APP_UPLOAD_PRESET;

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setImages(selectedFiles);
  };

  const uploadImages = async () => {
    setUploading(true);
    const urls = [];

    try {
      for (const image of images) {
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', UPLOAD_PRESET);

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          {
            method: 'POST',
            body: formData,
          }
        );

        const data = await response.json();
        urls.push(data.secure_url);
      }

      setUploadedUrls(urls);
      setUploading(false);
      setImages([]);

      // You can handle the uploaded URLs here (e.g., save to database)
      console.log('Uploaded URLs:', urls);
    } catch (error) {
      console.error('Error uploading images:', error);
      setUploading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="mb-4">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
      </div>

      <div className="mb-4">
        {images.length > 0 && (
          <button
            onClick={uploadImages}
            disabled={uploading}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg
              hover:bg-blue-600 disabled:bg-gray-400"
          >
            {uploading ? 'Uploading...' : `Upload ${images.length} Images`}
          </button>
        )}
      </div>

      {/* Preview selected images */}
      <div className="grid grid-cols-2 gap-2">
        {images.map((image, index) => (
          <div key={index} className="relative">
            <img
              src={URL.createObjectURL(image)}
              alt={`Preview ${index}`}
              className="w-full h-32 object-cover rounded-lg"
            />
          </div>
        ))}
      </div>

      {/* Display uploaded URLs */}
      {uploadedUrls.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Uploaded Images:</h3>
          <ul className="space-y-2">
            {uploadedUrls.map((url, index) => (
              <li key={index} className="text-sm text-blue-600 break-all">
                <a href={url} target="_blank" rel="noopener noreferrer">
                  {url}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;