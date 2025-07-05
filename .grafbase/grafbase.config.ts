import { g, config, auth } from '@grafbase/sdk'

// Визначаємо модель User
const User = g.model('User', {
  name: g.string().length({ min: 2, max: 100 }),
  email: g.string().unique(),
  avatarUrl: g.url().optional(),
})

// Налаштовуємо JWT аутентифікацію (секрет береться із змінної середовища)
const jwt = auth.JWT({
  issuer: 'grafbase',
  secret: g.env('JWT_SECRET')
})

export default config({
  schema: g,         // Використовуємо схему
  auth: {
    providers: [jwt], // Підключаємо JWT провайдер
    rules: (rules) => rules.private() // Всі операції — приватні, потребують авторизації
  },
})
