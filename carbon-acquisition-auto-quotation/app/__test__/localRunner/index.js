const { handler } = require('../../')

const mockedLocalData = {
    "scope": "auto",
    "auto": {
        "newJourney": 1,
        "commerceCustomerToken": null,
        "shoppingToken": null,
        "origin": 35,
        "reference": "hub",
        "azulSalesCommission": "18.0",
        "portoSalesCommission": "18.0",
        "vdoCode": "123123123",
        "productDetails": {
            "vehicleCode": 15838,
            "brandNewCar": "Não",
            "vehicleModel": "C200",
            "yearManufacture": 2024,
            "yearModel": 2024
        },
        "person": {
            "client": {
                "name": "Tiago QA Automation",
                "socialName": null,
                "cpf": "30099490811",
                "cellPhone": "48991001111",
                "email": "tiago.domingos@portoseguro.com.br"
            }
        },
        "conductors": {
            "person": [
                {
                    "cpf": "30099490811",
                    "socialName": null
                }
            ]
        },
        "zipCodeOvernightStay": "88058489",
        "pmcInfo": "string - pmc_observacoes",
        "idGoogle": "1529945973.1680023402",
        "utmSource": "google",
        "utmMedium": "cpl",
        "utmContent": "vs_bike_seguro-bike_hq",
        "sessionId": "2023102119547179841726-6T4XUGKR",
        "ipAddress": "10.95.174.37",
        "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        "marketingOptInFlag": false,
        "partnerCode": 71,
        "insuranceType": 0,
        "susepCode": "COL10J",
        "idProductType": null,
        "idLead": "0cd044a1-be56-4ebc-9b6e-dadd817d17f4",
        "idBranch": 27,
        "typeUse": 1
    }
}

async function process() {
	try {
		const response = await handler({body: JSON.stringify(mockedLocalData)})
		console.log('🚀 ~ Sucesso:', JSON.stringify(response, null, 2))
	} catch (error) {
		console.log('🚀 ~ Erro:', error)
	}
}

process()
