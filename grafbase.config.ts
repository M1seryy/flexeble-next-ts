import { g, config } from '@grafbase/sdk'

const User = g.model('User', {
    name: g.string(),
    email: g.string().unique(),
})

export default config({
    schema: g,
})

