// PetShop4You

function verificaFDS(data) {
    const _data = new Date(data);
    const _dia_semana = _data.getDay();
    if (_dia_semana >= 5) return true;
    return false
}

class PetShop {
    #preco_dog_pequeno = 0;
    #preco_dog_grande = 0;
    #preco_fds_dog_pequeno = 0;
    #preco_fds_dog_grande = 0;

    constructor(_nome, _distancia, _preco_dog_pequeno, _preco_dog_grande, _preco_fds_dog_pequeno, _preco_fds_dog_grande){
        this.nome = _nome;
        this.distancia = _distancia;
        this.#preco_dog_pequeno = _preco_dog_pequeno;
        this.#preco_dog_grande = _preco_dog_grande;
        this.#preco_fds_dog_pequeno = _preco_fds_dog_pequeno;
        this.#preco_fds_dog_grande = _preco_fds_dog_grande;
    }

    calculaOrcamento(data, qntd_dog_grande, qntd_dog_pequeno, fds) {
        let total = 0;
        if (fds) {
            total += qntd_dog_grande * this.#preco_fds_dog_grande;
            total += qntd_dog_pequeno * this.#preco_fds_dog_pequeno;
        } else {
            total += qntd_dog_grande * this.#preco_dog_grande;
            total += qntd_dog_pequeno * this.#preco_dog_pequeno;
        }

        return total;
    }

    defPrecoDogPequeno(preco_novo) {
        this.#preco_dog_pequeno = preco_novo;
    }

    defPrecoDogGrande(preco_novo) {
        this.#preco_dog_grande = preco_novo;
    }

    defPrecoDogPequenoFDS(preco_novo) {
        this.#preco_fds_dog_pequeno = preco_novo;
    }

    defPrecoDogGrandeFDS(preco_novo) {
        this.#preco_fds_dog_grande = preco_novo;
    }
}

export default class BancoDePetShop{
    #petshops = Array();
    constructor(){
        this.#petshops.push(new PetShop("Meu Canino Feliz", 2, 20, 40, 24, 48));
        this.#petshops.push(new PetShop("Vai Rex", 1.7, 15, 50, 20, 55));
        this.#petshops.push(new PetShop("ChowChawgas", 0.8, 30, 45, 30, 45));
    }

    melhorPetShop(data, qntd_dog_grande, qntd_dog_pequeno) {
        var nome = this.#petshops[0].nome;
        const fds = verificaFDS(data);
        let top_preco = this.#petshops[0].calculaOrcamento(data, qntd_dog_grande, qntd_dog_pequeno, fds);
        let distancia = this.#petshops[0].distancia;
        for(let i=1; i < this.#petshops.length; i++){
            let preco = this.#petshops[i].calculaOrcamento(data, qntd_dog_grande, qntd_dog_pequeno, fds);
            if(preco < top_preco){
                top_preco = preco;
                distancia = this.#petshops[i].distancia;
                nome = this.#petshops[i].nome;
            } 
            
            else if (preco == top_preco && distancia < this.#petshops[i].distancia) {
                top_preco = preco;
                distancia = this.#petshops[i].distancia;
                nome = this.#petshops[i].nome;
            }
        }

        return {"PetShop": nome, "Preço": top_preco, "Distância": distancia};
    }
}
