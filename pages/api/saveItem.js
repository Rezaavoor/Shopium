import { PrismaClient } from '@prisma/client'

export default async (req, res) => {
  if (req.method == 'POST') {
    try {
      const prisma = new PrismaClient()
      const { credentials, itemInfo } = req.body
      const { accessToken, userEmail } = credentials

      let isAuthed = false

      if (accessToken) {
        const session = await prisma.session.findUnique({
          where: { accessToken: accessToken },
        })
        if (session) {
          const user = await prisma.user.findUnique({
            where: {
              email: userEmail,
            },
          })
          if (user && user.id == session.userId) {
            //authed
            try {
              isAuthed = true
              const ad = await prisma.savedAd.create({
                data: {
                  userId: user.id,
                  adId: itemInfo.id + '',
                  origin: itemInfo.origin,
                  description: itemInfo.description,
                  price: itemInfo.price + '',
                  imageUrl: itemInfo.img,
                  url: itemInfo.url,
                  createdAt: new Date(
                    new Date().toString().split('GMT')[0] + ' UTC'
                  ).toISOString(),
                  updatedAt: new Date(
                    new Date().toString().split('GMT')[0] + ' UTC'
                  ).toISOString(),
                },
              })
              res.statusCode = 200
              res.json(itemInfo)
            } catch (e) {
              console.log(e.code)
            }
          }
        }
      }
      if (!isAuthed) {
        res.statusCode = 401
        res.json({
          authorize: { status: 'Not authorized' },
        })
      }
    } catch (error) {
      console.log(error)
      res.statusCode = 404
      res.json({ error: error })
    }
  }
}
