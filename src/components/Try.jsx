import React, { useState } from 'react';

function Base64ImageDecoder() {
  const [encodedString, setEncodedString] = useState('');
  const [imageSrc, setImageSrc] = useState('');

  const handleDecode = () => {
    try {
      const src = `data:image/jpeg;base64,${encodedString}`;
      setImageSrc(src);
    } catch (error) {
      setImageSrc('');
      alert('Invalid Base64 string');
    }
  };

  return (
    <div>
      <h2>Base64 Image Decoder</h2>
      <textarea
        rows="4"
        placeholder="Enter Base64 encoded string"
        value={encodedString}
        onChange={(e) => setEncodedString(e.target.value)}
      />
      <br />
      <button onClick={handleDecode}>Decode and Display Image</button>
      <div>
        {imageSrc && (
          <div>
            <h3>Decoded Image:</h3>
            <img src={imageSrc} alt="Decoded" style={{ maxWidth: '100%', height: 'auto' }} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Base64ImageDecoder;
