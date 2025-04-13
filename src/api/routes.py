"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route("/register", methods=['POST'])
def register_user():
    data = request.get_json()

    if 'email' not in data or 'password' not in data:
        return jsonify({"msg": "No es posible registrar"}), 400
    
    new_user = User(email=data['email'], password=data['password'], is_active=True)

    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.serialize()), 201

@api.route("/login", methods=['POST'])
def login():
    try:
        data = request.get_json()

        user = User.query.filter_by(email=data['email'], password=data['password']).first()

        if user is None:
            return jsonify({"msg": "El usuario no existe"}), 400
        
        token = create_access_token(identity=str(user.id))
        return jsonify({"token": token}), 200
    except Exception as e:
        print(f"Error interno: {e}") 
        return jsonify({"msg": "Error interno del servidor"}), 500

@api.route("/private_route", methods=['GET'])
@jwt_required()
def private_route():

    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    return jsonify({ "user_id": user.id, "email": user.email })
