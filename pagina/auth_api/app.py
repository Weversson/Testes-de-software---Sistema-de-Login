from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import psycopg2
from psycopg2.extras import RealDictCursor

app = Flask(__name__)
CORS(app, origins=["http://localhost", "http://127.0.0.1"])

DB_HOST = os.getenv('DATABASE_HOST', 'postgres_db')
DB_NAME = os.getenv('DATABASE_NAME', 'authdb')
DB_USER = os.getenv('DATABASE_USER', 'admin')
DB_PASS = os.getenv('DATABASE_PASSWORD', 'admin')


def get_conn():
    return psycopg2.connect(
        host=DB_HOST,
        dbname=DB_NAME,
        user=DB_USER,
        password=DB_PASS
    )


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json(force=True, silent=True) or {}
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Campos obrigatórios: email e senha'}), 400

    try:
        conn = get_conn()
        cur = conn.cursor(cursor_factory=RealDictCursor)

        cur.execute('SELECT password FROM users WHERE email = %s', (email,))
        row = cur.fetchone()

        cur.close()
        conn.close()

        if not row:
            return jsonify({'error': 'Usuário não encontrado'}), 401

        stored = row['password']

        # Obs.: apenas para exemplo — não use plain-text na prática
        if stored != password:
            return jsonify({'error': 'Senha incorreta'}), 401

        return jsonify({'message': 'Login bem-sucedido!'}), 200

    except Exception as e:
        print("Erro:", e)
        return jsonify({'error': 'Erro no servidor'}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
