import "graphql-import-node";
import { makeExecutableSchema } from "@graphql-tools/schema";
import {
  DateTimeResolvers,
  dateTimeTypeDefs
} from "./scalars";
import {
  companyResolvers,
  companyTypeDefs
} from "./entities/company";
import {
  jobResolvers,
  jobTypeDefs
} from "./entities/job";
import {
  userResolvers,
  userTypeDefs
} from "./entities/user";

const schema = makeExecutableSchema({
  typeDefs: [companyTypeDefs, jobTypeDefs, userTypeDefs, dateTimeTypeDefs],
  resolvers: [companyResolvers, jobResolvers, userResolvers, DateTimeResolvers]
})

export default schema;