import VisitorModal from "../Models/VisitorModal.js"
import { createError } from "../Utils/CreateError.js"


export const getVisitor = async (req, res, next) => {
  try {
    let visitors = await VisitorModal.findOne({ _id: '6296f8362946fc0846846242' })

    if (visitors == null) {
      const beginCount = new VisitorModal({
        _id: '6296f8362946fc0846846242',
        count: 1,
      })
      beginCount.save()
      res.status(200).send({ counter: 1 })
    } else {
      visitors.count += 1
      visitors.save()
      res.status(200).json({ counter: visitors.count })
    }
  } catch (error) {
    next(createError(500, 'Internet Connection Fail!'))
  }
}
