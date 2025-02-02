from flask import Flask, request, jsonify
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, storage

app = Flask(__name__)
CORS(app)

# Initialize Firebase app with your credentials
cred = credentials.Certificate(
    "web/project-fed09-firebase-adminsdk-949eg-5998f5834e.json")
firebase_admin.initialize_app(cred, {
    'storageBucket': 'project-fed09.appspot.com'
})

# Create a reference to the storage bucket
bucket = storage.bucket()


@app.route('/upload', methods=['POST'])
def upload_file():
    if 'image' not in request.files:
        return jsonify({'status': 'not updated', 'error': 'No file part'}), 400

    file = request.files['image']

    if file.filename == '':
        return jsonify({'status': 'not updated', 'error': 'No selected file'}), 400

    if file:
        try:
            # Specify the desired name for the photo in Firebase Storage
            destination_blob_name = file.filename

            # Create a blob object and upload the image directly
            blob = bucket.blob(destination_blob_name)
            blob.upload_from_file(file)

            # Get the public URL of the uploaded image
            image_url = blob.public_url

            # Print 1 in the console to indicate success
            print(1)
            print(image_url)

            # Return success response with image URL
            return jsonify({'status': 'updated', 'image_url': image_url})
        except Exception as e:
            return jsonify({'status': 'not updated', 'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
