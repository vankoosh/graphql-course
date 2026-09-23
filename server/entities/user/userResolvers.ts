import { Resolvers } from "../../types/resolvers-types";

const userResolvers: Resolvers = {
  Query: {
    me: (root, args, context) => {
      const isAdmin = context.auth.user?.isAdmin;
      return {
        id: "1",
        name: "John Doe"
      }
    }
  }
};

export default userResolvers;