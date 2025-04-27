import { http, HttpResponse } from 'msw'

export const userHandlers = [
  http.get('/api/v1/users', () => {
    return HttpResponse.json([
      { id: 1, name: 'Logan' },
      { id: 2, name: 'Jenney' },
    ])
  }),
]
