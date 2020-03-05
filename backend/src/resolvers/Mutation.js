const Mutations = {
  async createItem(parent, args, ctx, info) {
    // TODO Check if the user is logged in

    const item = await ctx.db.mutation.createItem(
      {
        data: args.data
      },
      info
    );

    return item;
  }
};

module.exports = Mutations;
