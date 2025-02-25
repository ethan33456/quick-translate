from flask import Flask, request, jsonify
from googletrans import Translator

app = Flask(__name__)
translator = Translator()

@app.route('/translate', methods=['POST'])
def translate():
    data = request.json
    text = data.get('text', '')
    if not text:
        return jsonify({'error': 'No text provided'}), 400

    translated = translator.translate(text, src='en', dest='fr')
    return jsonify({'translatedText': translated.text})

if __name__ == '__main__':
    app.run(port=5000)