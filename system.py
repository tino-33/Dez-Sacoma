from gravar_dados import receber_dados, consultar_dados
from flask import Flask, request, render_template

app = Flask(__name__)


@app.route("/home")
def index():
    return render_template('index.html')


@ app.route("/consulta")
def consulta():
    return render_template('consulta.html')


@app.route('/enviar-dados', methods=['POST'])
def receber_do_html():
    data = request.json
    nome_morador = data['nome_morador']
    contato_morador = data['contato_morador']
    tipo_morador = data['tipo_morador']
    torre_morador = data['torre_morador']
    andar_morador = data['andar_morador']
    apto_morador = data['apto_morador']

    resultado = receber_dados(nome_morador, contato_morador, tipo_morador,
                              torre_morador, andar_morador, apto_morador)

    # Aqui você pode fazer o que quiser com os valores recebidos do HTML
    # print("Valores recebidos do HTML:", nome_morador, contato_morador,
    #   tipo_morador, torre_morador, andar_morador, apto_morador)

    # print(resultado)

    return resultado


@app.route('/dados-consulta', methods=['POST'])
def receber_do_html_para_consulta():
    data = request.json
    torre_morador = data['torre_morador']
    andar_morador = data['andar_morador']
    apto_morador = data['apto_morador']

    resultado_consulta = consultar_dados(
        torre_morador, andar_morador, apto_morador)

    # print("Valores recebidos do HTML:",
    #       torre_morador, andar_morador, apto_morador)

    # print(f"teste: {resultado_consulta}")

    return resultado_consulta


if __name__ == '__main__':
    app.run(debug=True)
