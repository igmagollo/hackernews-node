function feed(parent, args, context, info) {
    return context.prisma.link.findMany()
}

function link(parent, args, context, info) {
    return context.prisma.link.findOne({
        where: {
            id: parseInt(args.id, 10)
        }
    })
}
  
module.exports = {
    feed,
    link,
}