const quotationController = require('../../../src/controller/quotationController');
const activity = require('../../../src/controller/activity');
const api = require('../../../src/api');
const factory = require('../../../src/factory');
const service = require('../../../src/service');

jest.mock('../../../src/controller/activity');
jest.mock('../../../src/api');
jest.mock('../../../src/factory');
jest.mock('../../../src/service', () => ({
    validationService: { inputData: jest.fn() },
    logger: { info: jest.fn(), error: jest.fn() }
}));

describe('Quotation Controller - Suite de Testes', () => {
    
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Deve retornar 400 se o objeto pre_financing_pool estiver ausente', async () => {
        const payloadVazio = {};
        factory.response.badRequestError.mockReturnValue({ statusCode: 400 });

        const result = await quotationController.process(payloadVazio);

        expect(result.statusCode).toBe(400);
        expect(factory.response.badRequestError).toHaveBeenCalledWith('O objeto pre_financing_pool é obrigatório.');
    });

    test('Deve processar com sucesso quando enviado tipoBem e valorCarta', async () => {
        const payload = { pre_financing_pool: { tipoBem: 'AUT', valorCarta: 100000 } };
        
        activity.getToken.execute.mockResolvedValue('token-fake');
        api.portobank.consorcio.v1.cotas.post.mockResolvedValue({ data: 'ok' });
        factory.response.success.mockReturnValue({ statusCode: 200 });

        const result = await quotationController.process(payload);

        expect(result.statusCode).toBe(200);
        expect(service.validationService.inputData).toHaveBeenCalledWith(payload.pre_financing_pool);
    });

    test('Deve processar com sucesso quando enviado tipoBem e parcela', async () => {
        const payload = { pre_financing_pool: { tipoBem: 'AUT', parcela: 1200 } };
        
        activity.getToken.execute.mockResolvedValue('token-fake');
        api.portobank.consorcio.v1.cotas.post.mockResolvedValue({ data: 'ok' });
        factory.response.success.mockReturnValue({ statusCode: 200 });

        const result = await quotationController.process(payload);

        expect(result.statusCode).toBe(200);
    });

    test('Deve retornar badRequestError se o validationService (AJV) lançar ValidationError', async () => {
        const payloadInvalido = { pre_financing_pool: { tipoBem: 'AUT' } }; // Falta valorCarta e parcela
        
        const error = new Error('The attributes values are not valid: valorCarta, parcela');
        error.name = 'ValidationError';
        service.validationService.inputData.mockImplementation(() => { throw error; });
        
        factory.response.badRequestError.mockReturnValue({ statusCode: 400 });

        const result = await quotationController.process(payloadInvalido);

        expect(result.statusCode).toBe(400);
        expect(factory.response.badRequestError).toHaveBeenCalledWith(expect.stringContaining('Erro no processamento'));
    });
});