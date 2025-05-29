import { HttpResponse, http } from 'msw'

export const ImageHandlers = [
  http.post('/api/v1/image/presigned-url', async ({ request }) => {
    const { fileName } = (await request.json()) as { fileName: string }

    const fakeUrl = `https://example.com/images/${fileName}`

    return HttpResponse.json(
      {
        message: 'SUCCESS',
        data: {
          presignedUrl: fakeUrl,
          imageUrl: fakeUrl,
        },
      },
      { status: 201 },
    )
  }),
]
