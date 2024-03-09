import express from 'express';
import BancoDePetShop from "./petshop.mjs";

const BancoPet = new BancoDePetShop();
const servidor = express();
const porta = process.env.PORT || 3001;

servidor.use(express.json());
servidor.use((request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

servidor.post('/localizar', (request, response) => {
    const body = request.body;
    if (!body){
        response.sendStatus(400);
    } else {
        const body = request.body;
        const keys = Object.keys(body);
        const expectedKeys = ['data', 'qntd_dog_grande', 'qntd_dog_pequeno'];
        if(keys.length !== expectedKeys.length || !expectedKeys.every(key => keys.includes(key))) {
            response.sendStatus(400);
        } else {
            response.status(200).json(BancoPet.melhorPetShop(body.data, body.qntd_dog_grande, body.qntd_dog_pequeno));
        }
    }
})

servidor.listen(porta, (erro) => {
    if (erro) return console.log('Algum problema ocorreu :(\n', erro)
    console.log(`O servidor está operando na porta: ${porta}`)
})
