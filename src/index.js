const { GraphQLServer } = require('graphql-yoga')

let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}]

let idCount = links.length

const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: () => links,
        link: (parent, args) => links.find(element => element.id == args.id)
    },

    Mutation: {
      post: (parent, args) => {
        const link = {
          id: `link-${idCount++}`,
          description: args.description,
          url: args.url,
        }
        links.push(link)
        return link
      },
      updateLink: (parent, args) => {
        const index = links.findIndex(element => element.id == args.id)
        if (index === -1)
          return undefined
        if (args.url !== undefined)
          links[index].url = args.url
        if (args.description !== undefined)
          links[index].description = args.description
        return links[index]
      },
      deleteLink: (parent, args) => {
        const index = links.findIndex(element => element.id == args.id)
        if (index === -1)
          return undefined
        const link = links[index]
        links.splice(index, 1)
        return link
      }
    },
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
})

server.start(() => console.log(`Server is running on http://localhost:4000`))
