import { Request, Response } from 'express'

export class ListBoards {
  public handle(req: Request, res: Response) {
    res.json([{ id: 1, name: 'test' }])
  }
}
