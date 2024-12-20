import { Schema, model, type Document } from 'mongoose';

interface IThoughts extends Document {
    name: string;
    inPerson: boolean;
    start: Date;
    end: Date;
    Friends: Schema.Types.ObjectId[];
}

const courseSchema = new Schema<IThoughts>(
    {
        name: {
            type: String,
            required: true,
        },
        inPerson: {
            type: Boolean,
            default: true,
        },
        start: {
            type: Date,
            default: Date.now, // Correct way to set default to current date
        },
        end: {
            type: Date,
            default: () => new Date(Date.now() + 84 * 24 * 60 * 60 * 1000), // Correct date logic
        },
        Friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Friend', // Make sure this matches your actual model name
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        timestamps: true,
    }
);

const Thoughts = model<IThoughts>('Thoughts', courseSchema);

export default Thoughts;

