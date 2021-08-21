import { GraphQLServer } from "graphql-yoga";

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
    type Livro {
        id: ID!
        titulo: String!
        genero: String!
        edicao: Int
        preco: Float
    },
    type Query {
        effectiveJava: Livro!
    }
`

const resolvers = {
    Query: {
        effectiveJava (){
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

server.start(() => console.log ("Servidor no ar..."))

