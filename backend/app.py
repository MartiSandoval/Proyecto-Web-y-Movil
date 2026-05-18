"""from flask import Flask

app = Flask(__name__)

@app.route('/api/tramites', methods=['GET'])

def home() :
    return "Server running with Flask" 
    tramites = [
        {
            "id" : "1",
            "nombre" : "Subsidio de agua potable",
            "descripcion" : "Trámite para solicitar el subsidio de agua potable para hogares de bajos ingresos.",
        }
    ]

if __name__ == '__main__':
    app.run(debug=True, port=5000) """