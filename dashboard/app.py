# -*- coding: utf-8 -*-
import os
from flask import Flask, render_template, jsonify
import pandas as pd


UPLOAD_FOLDER = 'static/images/'
app = Flask(__name__)
# data
tweets = pd.read_csv('../data/tweets-dataset-limpo.csv')
casos = pd.read_csv('../data/casos-por-bairro-limpo.csv')
clima = pd.read_csv('../data/dados-climaticos-limpo.csv')
# zika
casos_zika_por_bairro = casos[casos['doenca'] == 'Zika']['bairro'].value_counts()
populacao_por_bairro = casos[['bairro', 'populacao']].drop_duplicates()
populacao_por_bairro = pd.Series(populacao_por_bairro['populacao'].tolist(),index=populacao_por_bairro['bairro'].tolist())
casos_zika_por_bairro_normalizado = casos_zika_por_bairro / populacao_por_bairro
casos_zika_por_bairro_normalizado = casos_zika_por_bairro_normalizado.sort_values().dropna().drop_duplicates().drop('BRAS DE PINA')
# dengue
casos_dengue_por_bairro = casos[casos['doenca'] == 'Dengue']['bairro'].value_counts()
casos_dengue_por_bairro_normalizado = casos_dengue_por_bairro / populacao_por_bairro
casos_dengue_por_bairro_normalizado = casos_dengue_por_bairro_normalizado.sort_values().dropna().drop_duplicates().drop('BRAS DE PINA')
# chikungunya
casos_chik_por_bairro = casos[casos['doenca'] == 'Chikungunya']['bairro'].value_counts()
casos_chik_por_bairro_normalizado = casos_chik_por_bairro / populacao_por_bairro
casos_chik_por_bairro_normalizado = casos_chik_por_bairro_normalizado.sort_values().dropna().drop_duplicates().drop('BRAS DE PINA')


@app.route("/")
def index():
    return render_template('index.html')


@app.route('/zika-por-bairro')
def zika_por_bairro():
    return jsonify(dict(casos_zika_por_bairro_normalizado))


@app.route('/dengue-por-bairro')
def dengue_por_bairro():
    return jsonify(dict(casos_dengue_por_bairro_normalizado))

@app.route('/chikungunya-por-bairro')
def chik_por_bairro():
    return jsonify(dict(casos_chik_por_bairro_normalizado))


if __name__ == "__main__":
    app.secret_key = 'Ajuda_o_Maluco_Que_Tá_Doente! Birl! Saí_De_Casa_e_Comi_Para_#&!@!#$!!!'
    app.config['SESSION_TYPE'] = 'filesystem'
    app.run()
