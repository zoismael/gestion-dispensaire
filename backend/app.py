from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:''@localhost/flask'
app.config['SQLALCHEMY_TRACK_MODIFICATION'] = False

db = SQLAlchemy(app)
ma= Marshmallow(app)


class Patients(db.Model):
    id = db.Column(db.Integer, primary_key= True)
    nom_prenoms = db.Column(db.String(100))
    date_naissance = db.Column(db.String(50))
    consultations = db.Column(db.Text())

    def __init__(self, nom_prenoms, date_naissance, consultations):
        self.nom_prenoms = nom_prenoms
        self.date_naissance = date_naissance
        self.consultations = consultations

class PatientSchema(ma.Schema):
    class Meta:
        fields = ('id', 'nom_prenoms', 'date_naissance', 'consultations')


patient_schema = PatientSchema()
patients_schema = PatientSchema(many = True)

@app.route('/get', methods =['GET'])
def get_patients():
    all_patients = Patients.query.all()
    results = patients_schema.dump(all_patients)
    return jsonify(results)


@app.route('/get/<id>/', methods =['GET'])
def post_details(id):
    patient = Patients.query.get(id)    
    return patient_schema.jsonify(patient)


@app.route('/add', methods =['POST'])
def add_patient():
    nom_prenoms = request.json['nom_prenoms']
    date_naissance = request.json['date_naissance']
    consultations = request.json['consultations']

    patients = Patients(nom_prenoms, date_naissance, consultations)
    db.session.add(patients)
    db.session.commit()
    return patient_schema.jsonify(patients)



@app.route('/update/<id>/', methods =['PUT'])
def update_patient(id):
    patient = Patients.query.get(id)

    nom_prenoms = request.json['nom_prenoms']
    date_naissance = request.json['date_naissance']
    consultations = request.json['consultations']


    patient.nom_prenoms = nom_prenoms
    patient.date_naissance = date_naissance
    patient.consultations = consultations

    db.session.commit()
    return patient_schema.jsonify(patient)



@app.route('/delete/<id>/', methods =['DELETE'])
def delete_patient(id):
    patient = Patients.query.get(id)
    db.session.delete(patient)
    db.session.commit()
    return patient_schema.jsonify(patient)


if __name__ == "__main__":
    app.run(debug=True)