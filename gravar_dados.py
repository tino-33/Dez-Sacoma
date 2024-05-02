import os
import os.path
import googleapiclient.discovery
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow

# pylint: disable=no-member


def acesso():
    """Shows basic usage of the Drive v3 API.
    Prints the names and ids of the first 10 files the user has access to.
    """
    SCOPES = ["https://www.googleapis.com/auth/spreadsheets",
              "https://www.googleapis.com/auth/drive.metadata",
              "https://www.googleapis.com/auth/drive"]
    creds = None
    # The file token.json stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists("token.json"):
        creds = Credentials.from_authorized_user_file("token.json", SCOPES)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                "credentials.json", SCOPES
            )
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open("token.json", "w") as token:
            token.write(creds.to_json())
    return creds


credenciais = acesso()

SPREADSHEET_ID = "1t3sb_6F_uBN3qwhMO2kzKFGrS0E_jORcUGkVoK6hA3I"


def verificar_dados_existentes(service, contato_morador, torre_morador, andar_morador, apto_morador, aba="Condominos"):

    range_name = f"{aba}!B3:F"  # ajuste o intervalo conforme necessário
    request = service.spreadsheets().values().get(
        spreadsheetId=SPREADSHEET_ID,
        range=range_name,
    )
    response = request.execute()
    values = response.get('values', [])

    if (andar_morador == "Térreo"):
        a = '0'
    else:
        a = andar_morador

    apto = (a.lstrip('0')) + (apto_morador.lstrip('0'))

    for row in values:
        if row[1] == contato_morador and row[2] == torre_morador and row[3] == apto:
            return True

    return False


def verificar_terreo(andar_morador, apto_morador):

    andar = andar_morador
    apto = int(apto_morador)

    if (andar == "Térreo" and apto > 7):
        return True


def receber_dados(nome_morador, contato_morador, tipo_morador, torre_morador, andar_morador, apto_morador, aba="Condominos"):

    service = googleapiclient.discovery.build(
        'sheets', 'v4', credentials=credenciais)

    if (andar_morador == "Térreo"):
        a = '0'
    else:
        a = andar_morador

    apto = (a.lstrip('0')) + (apto_morador.lstrip('0'))

    if verificar_dados_existentes(service, contato_morador, torre_morador, andar_morador, apto_morador, aba="Condominos"):
        return "0"

    if verificar_terreo(andar_morador, apto_morador):
        return "2"

    values = [[nome_morador, contato_morador,
               torre_morador, apto, tipo_morador]]
    body = {
        'values': values
    }

    range_name = f'{aba}!B3'

    request = service.spreadsheets().values().append(
        spreadsheetId=SPREADSHEET_ID,
        range=range_name,
        valueInputOption='RAW',
        body=body
    )

    response = request.execute()

    return "1"


def consultar_dados(torre_morador, andar_morador, apto_morador, aba="SQL"):

    service = googleapiclient.discovery.build(
        'sheets', 'v4', credentials=credenciais)

    if (andar_morador == "Térreo"):
        a = '0'
    else:
        a = andar_morador

    apto = (a.lstrip('0')) + (apto_morador.lstrip('0'))

    if verificar_terreo(andar_morador, apto_morador):
        return "2"

    range_name = f'{aba}!B3:G376'

    result = service.spreadsheets().values().get(spreadsheetId=SPREADSHEET_ID,
                                                 range=range_name).execute()
    values = result.get('values', [])

    # Procura pelos dados nas colunas F e G
    resultados = ""
    # resultado_SQL = ""
    for row in values:
        if row[4] == torre_morador.lstrip('0') and row[5] == apto:
            # Se os valores forem encontrados, retorna os valores nas colunas B, C, D e E
            resultados = f"{row[0]}.{row[1]}.{row[2]}-{row[3]}"

    return resultados
