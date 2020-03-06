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
  },
  updateItem(parent, args, ctx, info) {
    // Taking a copy of the updated info from the args
    const updatedArgs = { ...args };

    // Removing the id from the updated args
    delete updatedArgs.id;

    return ctx.db.mutation.updateItem(
      {
        data: updatedArgs,
        where: {
          id: args.id // Getting the id directly from the args, not our object itself
        }
      },
      info
    );
  }
};

module.exports = Mutations;
