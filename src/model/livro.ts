export class Livro{
    titulo : string;
    imagem : string;
    resumo : string;
    preco : number;
    autor : string;

    constructor(objFirebase : any){
        this.titulo = objFirebase.titulo;
        this.imagem = objFirebase.imagem;
        this.resumo = objFirebase.resumo;
        this.preco = objFirebase.preco;
        this.autor = objFirebase.autor;
    }
}