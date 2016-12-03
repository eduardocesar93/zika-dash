from flask import Flask, jsonify
import pandas as pd


# data
tweets = pd.read_csv('../data/tweets-dataset-limpo.csv')
casos = pd.read_csv('../data/casos-por-bairro-limpo.csv')
clima = pd.read_csv('../data/dados-climaticos-limpo.csv')
casos_zika_por_bairro = casos[casos['doenca'] == 'Zika']['bairro'].value_counts()
populacao_por_bairro = casos[['bairro', 'populacao']].drop_duplicates()
populacao_por_bairro = pd.Series(populacao_por_bairro['populacao'].tolist(),index=populacao_por_bairro['bairro'].tolist())
casos_zika_por_bairro_normalizado = casos_zika_por_bairro / populacao_por_bairro
casos_zika_por_bairro_normalizado = casos_zika_por_bairro_normalizado.sort_values().dropna().drop_duplicates().drop('BRAS DE PINA')


app = Flask(__name__)

@app.route('/')
def _get_zika_by_neighborhood_normalized():
    return jsonify(casos_zika_por_bairro_normalizado)

if __name__ == '__main__':
    app.run()