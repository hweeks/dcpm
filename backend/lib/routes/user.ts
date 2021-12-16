import { Router, NextFunction, Response, Request } from "express";
import jws from 'jws';
import { User, authenticate } from "../models/user";

const router = Router();

export const createToken = async (password: string) => jws.sign({
  header: { alg: 'HS256' },
  payload: password,
  secret: process.env.JWT_SECRET || 'has a van',
});

export const userLogin = async (req: Request, res: Response, next: NextFunction) => {
  const {username, password} = req.body
  try {
    const userFound = await authenticate(username, password)
    const token = await createToken(userFound?.id || '')
    res.send({token})
  } catch (error) {
    next(error)
  }
}

router.post('/api/user/login', userLogin)

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const {username, password} = req.body
  try {
    const builtUser = await User.create({username, password})
    const token = await createToken(builtUser?.id || '')
    res.send({token})
  } catch (error) {
    next(error)
  }
}

router.post('/api/user/create', createUser)

export const UserRouter = router
