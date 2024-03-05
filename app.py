from flask import Flask, request, render_template, jsonify
from flask_cors import CORS, cross_origin
from ollama import Ollama_model
import os

UPLOAD_FOLDER = './uploads'
ALLOWED_EXTENSIONS = {'txt', 'json'}

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

ollama = Ollama_model()

@app.route('/')
@cross_origin()
def index():
    return "Hello, from Flask!"


@app.route('/get_response', methods=['GET', 'POST'])
@cross_origin()
def get_response():
    input = request.args.get('input')
    print('getting response')
    response = ollama.get_answer(input)
    return response.response

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload', methods=['POST'])
@cross_origin()
def upload():
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            return "Upload Failed: No file"
        file = request.files['file']
        # If the user does not select a file, the browser submits an
        # empty file without a filename.
        if file.filename == '':
            return "Upload Failed: No file"
        if file and allowed_file(file.filename):
            filename = file.filename
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            return "Upload Successful" + filename
    return "Upload Failed"


@app.route('/changeRAG', methods=['GET', 'POST'])
@cross_origin()
def changeRAG():
    filename = request.args.get('filename')
    ollama.change_dataset(filename, filename)
    return "Dataset Changed"