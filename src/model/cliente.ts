export class Cliente{
    id : string;
    nome : string;
	email : string;
	endereco : string;
	bairro : string;
	cidade : string;
	cep : string;
    telefone : string;
    foto:string;

    constructor(){
    }

    setDados(obj : any){
        this.nome = obj.nome;
        this.email= obj.email;
        this.endereco= obj.endereco;
        this.bairro= obj.bairro;
        this.cidade= obj.cidade;
        this.cep= obj.cep;
        this.telefone= obj.telefone;

    }
}