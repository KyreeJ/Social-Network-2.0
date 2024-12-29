import { Users } from '../models/index.js';
import { Request, Response } from 'express';


  // Gets all users
  export const getUsers = async (_req: Request, res: Response) => {
    try {
      const users = await Users.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // Gets a single user
  export const getUserById = async (req: Request, res: Response) => {

    console.log ('users get by id ', req.params);

    try {
      // const user = await Users.findOne({ _id: req.params.userId })
      const user = await Users.findOne({ _id: req.params.id })
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
      return;
    } catch (err) {
      res.status(500).json(err);
      return;
    }
  }

  // creates a new user
  export const createUser = async (req: Request, res: Response) => {
    // console.log('create user route =', req.body);

    try {
      const user = await Users.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // Delete a user and associated apps
  export const deleteUser = async (req: Request, res: Response) => {
    try {
      const user = await Users.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      await Users.deleteMany({ _id: { $in: user.applications } });
      res.json({ message: 'User and associated apps deleted!' })
      return;
    } catch (err) {
      res.status(500).json(err);
      return;
    }
  }

  export const updateUser = async (req: Request, res: Response) => {
    try {
      const user = await Users.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      await Users.deleteMany({ _id: { $in: user.applications } });
      res.json({ message: 'User and associated apps deleted!' })
      return;
    } catch (err) {
      res.status(500).json(err);
      return;
    }
  }
  export const addFriend = async (req: Request, res: Response) => {
    try {
      const user = await Users.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      await Users.deleteMany({ _id: { $in: user.applications } });
      res.json({ message: 'User and associated apps deleted!' })
      return;
    } catch (err) {
      res.status(500).json(err);
      return;
    }
  }
  export const removeFriend = async (req: Request, res: Response) => {
    try {
      const user = await Users.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      await Users.deleteMany({ _id: { $in: user.applications } });
      res.json({ message: 'User and associated apps deleted!' })
      return;
    } catch (err) {
      res.status(500).json(err);
      return;
    }
  }




