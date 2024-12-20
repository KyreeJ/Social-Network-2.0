import { Request, Response } from 'express';
import {  Thoughts } from '../models/index.js';

export const getALLThoughts = async (_req: Request, res: Response) => {
  try {
    const applications = await Thoughts.find();
    res.json(applications);
  } catch (err) {
    res.status(500).json(err);
  }
}

// Gets a single application using the findOneAndUpdate method. We pass in the ID of the application and then respond with it, or an error if not found
export const getThoughtsByid = async (req: Request, res: Response) => {
  try {
    const application = await Thoughts.findOne({ _id: req.params.applicationId });

    if (!application) {
      return res.status(404).json({ message: 'No application with that ID' });
    }

    res.json(application);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
}

// Creates a new application. Accepts a request body with the entire Application object.
// Because applications are associated with Users, we then update the User who created the app and add the ID of the application to the applications array
export const createThoughts = async (req: Request, res: Response) => {
  try {
    const application = await Thoughts.create(req.body);
    const user = await Thoughts.findOneAndUpdate(
      { _id: req.body.userId },
      { $addToSet: { applications: application._id } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        message: 'Application created, but found no user with that ID',
      })
    }

    res.json('Created the application 🎉');
    return;
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
    return;
  }
}

// Updates and application using the findOneAndUpdate method. Uses the ID, and the $set operator in mongodb to inject the request body. Enforces validation.
export const updateThoughts = async (req: Request, res: Response) => {
  try {
    const application = await Thoughts.findOneAndUpdate(
      { _id: req.params.applicationId },
      { $set: req.body },
      { runValidators: true, new: true }
    );

    if (!application) {
      return res.status(404).json({ message: 'No application with this id!' });
    }

    res.json(application);
    return;
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
    return;
  }
}

// Deletes an application from the database. Looks for an app by ID.
// Then if the app exists, we look for any users associated with the app based on he app ID and update the applications array for the User.
export const deleteThoughts  = async (req: Request, res: Response) => {
  try {
    const application = await Thoughts.findOneAndDelete({ _id: req.params.applicationId });

    if (!application) {
      return res.status(404).json({ message: 'No application with this id!' });
    }

    const user = await Thoughts.findOneAndUpdate(
      { applications: req.params.applicationId },
      { $pull: { applications: req.params.applicationId } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        message: 'Application created but no user with this id!',
      });
    }

    res.json({ message: 'Application successfully deleted!' });
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
}

// Adds a tag to an application. This method is unique in that we add the entire body of the tag rather than the ID with the mongodb $addToSet operator.
export const addTag = async (req: Request, res: Response) => {
  try {
    const application = await Thoughts.findOneAndUpdate(
      { _id: req.params.applicationId },
      { $addToSet: { tags: req.body } },
      { runValidators: true, new: true }
    );

    if (!application) {
      return res.status(404).json({ message: 'No application with this id!' });
    }

    res.json(application);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
}

// Remove application tag. This method finds the application based on ID. It then updates the tags array associated with the app in question by removing it's tagId from the tags array.
export const removeTag = async (req: Request, res: Response) => {
  try {
    const application = await Thoughts.findOneAndUpdate(
      { _id: req.params.applicationId },
      { $pull: { tags: { tagId: req.params.tagId } } },
      { runValidators: true, new: true }
    );

    if (!application) {
      return res.status(404).json({ message: 'No application with this id!' });
    }

    res.json(application);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }

}

