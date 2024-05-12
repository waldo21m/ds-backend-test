import { ITopic, ITopicQuery } from '../interfaces/Topic.interface';
import Topic from '../models/Topic.model';

export const findAll = async (search: string) => {
  let query: ITopicQuery = { isDeleted: false };

  if (search) {
    query = {
      ...query,
      name: { $regex: new RegExp(search, 'i') },
    };
  }

  const topics = await Topic.find(query).exec();

  return topics;
};

export const countTopics = async () => {
  const count = await Topic.countDocuments({ isDeleted: false }).exec();

  return count;
};

export const findTopicsByContentTypeId = async (contentTypeId: string) => {
  const topics = await Topic.find({
    contentPermissions: contentTypeId,
    isDeleted: false,
  }).select('_id name coverImage').exec();

  return topics;
};

export const findById = async (id: string) => {
  const topic = await Topic.findOne({ _id: id, isDeleted: false }).exec();

  return topic;
};

export const findByName = async (name: string) => {
  const topic = await Topic.findOne({ name, isDeleted: false }).exec();

  return topic;
};

export const create = async (topic: ITopic) => {
  const newTopic = new Topic(topic);
  const savedTopic = await newTopic.save();

  return savedTopic;
};

export const update = async (id: string, topic: Partial<ITopic>) => {
  return Topic.updateOne(
    {
      _id: id,
      isDeleted: false,
    },
    topic,
  ).exec();
};

export const softDelete = async (id: string) => {
  return Topic.updateOne({ _id: id }, { isDeleted: true }).exec();
};

export const destroy = async (id: string) => {
  return Topic.deleteOne({ _id: id }).exec();
};
