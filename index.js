const express = require('express'); //Importando o Módulo Express
const app = express(); //Criando uma Váriavel App e Chamando Todas as Funções do Express Nela
const path = require('path'); //Adiciona Arquivos Estáticos

const port = 3000; //Rodando na Porta do Servidor
let message = ''; //Mensagem de Cadastro com Sucesso do Usuário
let filme = undefined;


const filmes = [
{
    id: 1,

    Nome: 'O Poderoso Chefão',

    Genero: 'Drama',

    Imagem: 'https://i.pinimg.com/236x/71/91/46/71914694eb60ff7241641862f6fe725f.jpg',

    Diretor: 'Francis Ford Coppola',

    AnoDeLançamento: '1972',

    Sinopse : `Don Vito Corleone (Marlon Brando) é o chefe de uma "família" de Nova York que está feliz,
    pois Connie (Talia Shire), sua filha, se casou com Carlo (Gianni Russo).
    Porém, durante a festa, Bonasera (Salvatore Corsitto) é visto no escritório de Don Corleone pedindo "justiça",
    vingança na verdade contra membros de uma quadrilha, 
    que espancaram barbaramente sua filha por ela ter se recusado a fazer sexo para preservar a honra.`,

},
{

    id: 2,

    Nome:'A Lista de Schindler',

    Genero: 'Guerra',

    Imagem: 'https://i.pinimg.com/236x/da/56/b4/da56b480685755f145c87bcd5324ab60.jpg',

    Diretor: 'Steven Spielberg',

    AnoDeLançamento: '1993',

    Sinopse: `A inusitada história de Oskar Schindler (Liam Neeson), 
    um sujeito oportunista, sedutor, "armador", simpático, comerciante no mercado negro,
    mas, acima de tudo, um homem que se relacionava muito bem com o regime nazista,
    tanto que era membro do próprio Partido Nazista (o que não o impediu de ser preso algumas vezes,
    mas sempre o libertavam rapidamente, em razão dos seus contatos).`,

},
{
    id: 3,

    Nome:'Forrest Gump - O Contador de Histórias',

    Genero: 'Comédia',

    Diretor: 'Robert Zemeckis',

    AnoDeLançamento: '1994',

    Imagem: 'https://i.pinimg.com/236x/a8/39/7d/a8397dcfdf56fc342c3712a91e186575.jpg',

    Sinopse: `Quarenta anos da história dos Estados Unidos,
    vistos pelos olhos de Forrest Gump (Tom Hanks), um rapaz com QI abaixo da média e boas intenções.
    Por obra do acaso, ele consegue participar de momentos cruciais, como a Guerra do Vietnã e Watergate, 
    mas continua pensando no seu amor de infância, Jenny Curran.`,

},
];

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded());

app.get('/', (req, res) => {
	setTimeout(() => {
		message = '';
	}, 5000);

    res.render('index', { filmes, message,filme });
}); //Arquivo a ser renderizado dentro da views

app.get('/cadastro', (req, res) => {
	res.render('cadastro');
});

app.post('/new', (req, res) => {
	filme = req.body;
	filme.id = filmes.length + 1;
	filmes.push(filme);
	message = `Filme ${filme.nome} cadastrado com sucesso!`;
	res.redirect('/');
});

app.get("/edit/:id" , (req,res) => {
    let id = +req.params.id;
     filme = filmes.find((filme) => filme.id === id);  
    res.render("edit", {filme});
});

app.post("/edit/:id", (req,res) =>{
    const id = +req.params.id ;    
    const newFilme = req.body;
    newFilme.id = id;
    filme = newFilme;
    filmes[filme.id -1] = newFilme;
    filme = undefined;
    res.redirect("/");

});

  

app.get('/detalhes/:id', (req, res) => {
	const id = +req.params.id;
	filme = filmes.find((filme) => filme.id === id);
	res.render('../views/detalhes', {filme});
});



app.listen(port, () =>console.log(`Servidor rodando em http://localhost:${port}`));