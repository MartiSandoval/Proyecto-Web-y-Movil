import os
from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

app = Flask(__name__)

# Configurar CORS para permitir peticiones desde tu frontend (Vite/Ionic usa el puerto 5173)
CORS(app, resources={r"/*": {"origins": ["http://localhost:5173", "http://localhost:4173"]}})

# Ruta de prueba para verificar que el servidor funciona
@app.route('/', methods=['GET'])
def health_check():
    return jsonify({"mensaje": "Servidor Flask funcionando correctamente", "estado": "ok"}), 200

if __name__ == '__main__':
    puerto = int(os.getenv('FLASK_RUN_PORT', 8000))
    app.run(debug=True, port=puerto)