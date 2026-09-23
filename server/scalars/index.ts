import dateTimeTypeDefs from './date-time-type-defs.graphql';
import { DateTime } from './DateTime';

const DateTimeResolvers = {
  DateTime: DateTime
}

export {
  DateTimeResolvers, dateTimeTypeDefs
}