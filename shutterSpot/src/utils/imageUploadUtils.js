export const uploadSingleImage = async (image, cloudName, uploadPreset) => {
    try {
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', uploadPreset);
  
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );
  
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to upload image');
      }
  
      return data.secure_url;
    } catch (error) {
      console.error('Error uploading single image:', error);
      throw error;
    }
  };
  
  export const uploadMultipleImages = async (images, cloudName, uploadPreset) => {
    try {
      const uploadPromises = images.map(image => {
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', uploadPreset);
  
        return fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: 'POST',
            body: formData,
          }
        ).then(response => response.json());
      });
  
      const results = await Promise.all(uploadPromises);
      const urls = results.map(result => result.secure_url);
      
      return urls;
    } catch (error) {
      console.error('Error uploading multiple images:', error);
      throw error;
    }
  };