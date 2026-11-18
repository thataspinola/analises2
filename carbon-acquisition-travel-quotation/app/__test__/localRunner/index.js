const main = require('../../')

const mockedLocalData = { body: JSON.stringify({
    "meioComercializacao": "HCL",
    "susep": "COL1090",
    "informacoes": [
      {
        "codigo": "DICIO_NOME",
        "conteudo": ""
      },
      {
        "codigo": "TIPO_VIAGEM",
        "conteudo": "INTERNACIONAL"
      },
      {
        "codigo": "ORIGEM",
        "conteudo": "Brasil"
      },
      {
        "codigo": "DESTINO",
        "conteudo": "Europa"
      },
      {
        "codigo": "DICIO_DATA_SAIDA",
        "conteudo": "2024-08-16"
      },
      {
        "codigo": "DICIO_DATA_RETORNO",
        "conteudo": "2024-08-22"
      },
      {
        "codigo": "DICIO_AVENTURA",
        "conteudo": false
      },
      {
        "codigo": "DICIO_MOTOCICLETA",
        "conteudo": false
      },
      {
        "codigo": "DICIO_QTD_JOVENS",
        "conteudo": "1"
      },
      {
        "codigo": "DICIO_QTD_IDOSOS",
        "conteudo": "0"
      },
      {
        "codigo": "DICIO_CORRETAGEM",
        "conteudo": "25"
      }
    ]
  })
}

main.handler(mockedLocalData)
	.then((res) => {
		console.log(JSON.stringify(res, null, 2))
	})
	.catch((err) => {
		console.log(err)
	})
