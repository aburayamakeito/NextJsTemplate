// mocks/handlers.ts
import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/api/user', () => {
    return HttpResponse.json({
      id: '1',
      name: 'Test User',
    })
  }),

  http.post('/api/login', () => {
    return HttpResponse.json({
      token: 'mocked_user_token',
      user: {
        id: '1',
        name: 'Test User',
      }
    })
  })
]