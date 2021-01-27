import { PrismaClient } from '@prisma/client'

export default async (req, res) => {
  if (req.method == 'POST') {
    try {
      const prisma = new PrismaClient()
      const { userEmail, itemInfo, method } = req.body

      console.log('body: ', req.body)
      let isAuthed = false
      if (userEmail) {
        try {
          const user = await prisma.user.findUnique({
            where: {
              email: userEmail,
            },
          })
          console.log('user: ', user)
          if (user && (method === 'save' || method === 'delete')) {
            //authed
            isAuthed = true
            console.log('authed')
            if (method === 'save') {
              try {
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
                console.log('created')
                res.statusCode = 200
                res.json({ status: 'saved', itemInfo })
              } catch (e) {
                if (e.code == 'P2002') {
                  //already saved
                  console.log('already created')
                  res.statusCode = 200
                  res.json({ status: 'saved', itemInfo })
                } else console.log(e.code)
              }
            } else {
              try {
                const ad = await prisma.savedAd.delete({
                  where: { adId: itemInfo.id + '' },
                })
                console.log('deleted')
                res.statusCode = 200
                res.json({ status: 'deleted', itemInfo })
              } catch (e) {
                if (e.code == 'P2016') {
                  //already deleted
                  console.log('already deleted')
                  res.statusCode = 200
                  res.json({ status: 'deleted', itemInfo })
                } else console.log(e.code)
              }
            }
          }
        } catch (e) {
          console.log(e.code)
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
