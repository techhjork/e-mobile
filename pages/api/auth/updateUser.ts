// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mongoose from 'mongoose'
import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dbConnect from '../../../lib/dbConnect'
import User from '../../../models/User'
import withAuth, { NextApiRequestWithAuth } from '../../../middlewares/withAuth'



const handler = async (req: NextApiRequestWithAuth, res: NextApiResponse<any>) => {
    const { method } = req

    await dbConnect();
    switch (method) {
        case 'POST':
            try {
                const user = await User.findByIdAndUpdate(req.user._id, {
                    $set: {
                        name: req.body.name,
                        username: req.body.username,
                        phone: req.body.phone,
                        email: req.body.email,
                        bio: req.body.bio,
                    }
                }, { new: true });
                return res.send(user);
            }
            catch (err: any) {
                console.log(err.code);
                return res.status(400).json({
                    message: err.toString()
                })
            }
            break

        default:
            return res.status(400).json({ success: false });
    }
}
export default withAuth(handler);
