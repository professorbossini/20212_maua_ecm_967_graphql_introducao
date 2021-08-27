import { GraphQLServer } from "graphql-yoga";


const livros = [
    {
        id: '1',
        titulo: 'Effective Java',
        genero: "Técnico",
        edicao: 3,
        preco: 39.99
    },
    {
        id: '2',
        titulo: "Concrete Mathematics",
        genero: "Técnico",
        edicao: 1,
        preco: 89.99
    }
];

const usuarios = [{
    id: '100',
    nome: 'Jose',
    livros: [{
        id: '1',
        titulo: 'Effective Java',
        genero: "Técnico",
        edicao: 3,
        preco: 39.99
    },
    {
        id: '2',
        titulo: "Concrete Mathematics",
        genero: "Técnico",
        edicao: 1,
        preco: 89.99
    }
    ]
}, {
    id: '101',
    nome: 'Maria',
    livros: [{
        id: '5',
        titulo: 'Programming Challenges',
        genero: "Técnico",
        edicao: 1,
        preco: 39.99
    }]
}]



//schema
// const typeDefs = `
//     type Query {
//         hello: String!
//         name: String!
//         id: ID!
//         location: String!
//         age: Int!
//         ofAge: Boolean!
//         salary: Float!
//     }
// `;
const typeDefs = `
    type Usuario{
        id: ID!,
        nome: String!,
        idade: Int!,
        livros: [Livro!]
    },
    type Livro {
        id: ID!
        titulo: String!
        genero: String!
        edicao: Int
        preco: Float
    },
    type Query {
        usuarios: [Usuario!]!
        livros (precoMaximo: Float!): [Livro!]!
        adicionar (numeros: [Float!]!): Float!
        notas: [Int!]!
        bemVindo (nome: String): String!
        effectiveJava: Livro!
    }
`

const resolvers = {
    Query: {
        livros(parent, args, ctx, info) {
            return livros.filter((l) => {
                return l.preco <= args.precoMaximo
            });
        },
        usuarios() {
            return usuarios;
        },
        adicionar(parent, args, ctx, info) {
            return args.numeros.length === 0 ? 0 :
                args.numeros.reduce((ac, atual) => {
                    return ac + atual;
                })
        },
        notas(parent, args, ctx, info) {
            return [10, 2, 7, 7, 8]
        },
        bemVindo(parent, args, ctx, info) {
            return `Bem vindo ${args.nome ? args.nome : 'visitante'}`;
        },
        effectiveJava() {
            return {
                id: '123456',
                titulo: 'Effective Java',
                genero: "Técnico",
                edicao: 3,
                preco: 43.9
            }
        }
    }
}

//resolvers
// const resolvers = {
//     Query: {
//         hello(){
//             return "Minha primeira API com GraphQL"
//         },
//         name(){
//             return "Um nome qualquer"
//         },
//         id (){
//             return "um id qualquer"
//         },
//         location (){
//             return "São Paulo"
//         },
//         age(){
//             return 29
//         },
//         ofAge(){
//             return true
//         },
//         salary(){
//             return 15.5
//         }
//     }
// }

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

//

server.start(() => console.log("Servidor no ar..."))

