# -*- coding: utf-8 -*-
import os
from flask import Flask, render_template

UPLOAD_FOLDER = 'static/images/'
app = Flask(__name__)


@app.route("/")
def index():
    return render_template('index.html')

if __name__ == "__main__":
    app.secret_key = 'Ajuda_o_Maluco_Que_Tá_Doente! Birl! Saí_De_Casa_e_Comi_Para_#&!@!#$!!!'
    app.config['SESSION_TYPE'] = 'filesystem'
    app.run()
