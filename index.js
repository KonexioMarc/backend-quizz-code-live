const express = require('express');
const app = express();
const { engine } = require('express-handlebars')
// const  engine = require('express-handlebars').engine
const port = 3000


// Pour dire a notre app express qu'il peut utiliser les fichier static a l'interieur
app.use(express.static('public'))

// Pour pouvoir décoder des body en urlencoded
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')


const questionList = [
    {
        question: "Est-ce que la capital de la france c’est Paris ?",
        answer: {
            oui: 0,
            non: 0
        }
    },
    {
        question: "Est-ce que vous êtes raciste ?",
        answer: {
            oui: 0,
            non: 0
        }
    },
    {
        question: "Avez-vous voté Lepen ?",
        answer: {
            oui: 0,
            non: 0
        }
    },
    {
        question: "Est-ce que vous êtes Alexandre ?",
        answer: {
            oui: 0,
            non: 0
        }
    },
    {
        question: "Est-ce que Alex est une fille ? ",
        answer: {
            oui: 0,
            non: 0
        }
    },
]
// Pour que la dernière valeur soit accessible par toute les routes,
// on la déclare a l'extérieur des fonctions
let randomIndex = 0

app.get('/', function(req, res) {
    // Avoir un index aleatoire entre 0 et la taille de la liste
    randomIndex = Math.round(Math.random() * questionList.length  )
    const question = questionList[randomIndex].question
    res.render('home', { question: question })
})


app.post('/answer', function(req, res) {
    console.log('[GET] /answer , req.body', req.body) // => c'est un objet du type { non: ''} ou { oui: ''}
    // pour récupérer la clé 
    const key = Object.keys(req.body)[0]
    console.log('[GET] /answer , randomIndex', randomIndex)

    // mise a jour de la question { oui: 1, non: 2} 
    questionList[randomIndex].answer[key] = questionList[randomIndex].answer[key] + 1

    res.redirect('/')
})

// affiche la liste des questions
app.get('/results', function(req, res) {
    res.render('results', { questionList: questionList })
})


// ajoute une question la liste
app.post('/add', function(req, res) {
    const newQuestion = req.body.newQuestion
    console.log('[POST] /add, newQuestion', newQuestion)
    questionList.push({
        question: newQuestion,
        answer: {
            oui: 0,
            non:0
        }
    })
    res.redirect('/results')
})


app.listen(port, function() {
    console.log('The server is started at', port)
})
