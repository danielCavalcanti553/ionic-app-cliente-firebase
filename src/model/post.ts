export class Post{

    id: string;
    uid : string;
    nome : string;
    mensagem : string;
    imagem : string;

    constructor(){}

    setDados(objFirebase : any){
        this.uid = objFirebase.uid;
        this.nome = objFirebase.nome;
        this.mensagem = objFirebase.mensagem;
    }
}