#from crypt import methods
from flask import Flask, request, jsonify
from PIL import Image
from io import BytesIO
import base64
from flask_cors import CORS
import requests
import time
import json


app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

def simulate_report():
    time.sleep(5)
    print("Simulating report...sleeping for 2 secs")
    with open('../web/report.txt','r') as f:
        data = f.read()
    data = json.loads(data)
    print("report generated..")
    return data


@app.route('/', methods=['POST', 'GET'])
def index():
    if request.method == 'GET':
        print("Got GET request at /")
        return jsonify({'message': 'Welcome! Check API at /api'}), 200
    elif request.method == 'POST':
        return jsonify({'error': 'POST method not allowed on this endpoint'}), 405


@app.route('/api', methods=['POST'])
def process_image():
    
    if 'image' not in request.files:  # file changed to image
        print("File error at /api POST: No file")
        return jsonify({'error': 'No file part'}), 400

    file = request.files['image']  # file changed to image
    if file.filename == '':
        print("File error at /api POST: No selected file")
        return jsonify({'error': 'No selected file'}), 400

    try:
        # Save the image
        file.save(file.filename)
        print("Image received and saved successfully")

        report = simulate_report()
        
        # Open images
        img1 = Image.open("../web/activation_123.png")
        img2 = Image.open("../web/postprocessed_map.png")
        img3 = Image.open("../web/sam_output.png")

        # Create BytesIO objects and save images to them
        time.sleep(5)
        img_bytes1 = BytesIO()
        img1.save(img_bytes1, format='PNG')
        img_bytes1.seek(0)

        img_bytes2 = BytesIO()
        img2.save(img_bytes2, format='PNG')
        img_bytes2.seek(0)
        time.sleep(2)
        img_bytes3 = BytesIO()
        img3.save(img_bytes3, format='PNG')
        img_bytes3.seek(0)

        # Encode the images in base64
        img1_base64 = base64.b64encode(img_bytes1.getvalue()).decode('utf-8')
        img2_base64 = base64.b64encode(img_bytes2.getvalue()).decode('utf-8')
        img3_base64 = base64.b64encode(img_bytes3.getvalue()).decode('utf-8')
        # Prepare response data
        response_data = {
            'data': report,
            'image1': img1_base64,
            'image2': img2_base64,
            'image3': img3_base64,
        }

        return jsonify(response_data)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == "__main__":
    print("Server started")
    app.run(host='0.0.0.0', port=8000)



