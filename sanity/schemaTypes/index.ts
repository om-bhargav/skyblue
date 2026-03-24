import { type SchemaTypeDefinition } from 'sanity'
import MenuSchema from './MenuSchema'
import PersonSchema from './PersonSchema'
import FlightControl from './FlightControl'
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [MenuSchema,PersonSchema,FlightControl],
}
