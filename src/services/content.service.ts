import { IContent, IContentQuery } from '../interfaces/Content.interface';
import Content from '../models/Content.model';

export const findAll = async (page: number, limit: number, search: string) => {
  const offset = (page - 1) * limit;

  let query: IContentQuery = { isDeleted: false };

  if (search) {
    query = {
      ...query,
      name: { $regex: new RegExp(search, 'i') },
    };
  }

  const contents = await Content.find(query).skip(offset).limit(limit).exec();

  return contents;
};

export const countContents = async (search: string) => {
  let query: IContentQuery = { isDeleted: false };

  if (search) {
    query = {
      ...query,
      name: { $regex: new RegExp(search, 'i') },
    };
  }

  const count = await Content.countDocuments(query).exec();

  return count;
};

export const findContentsByUserId = async (
  page: number,
  limit: number,
  userId: string,
) => {
  const offset = (page - 1) * limit;

  const contents = await Content.find({
    createdBy: userId,
    isDeleted: false,
  })
    .skip(offset)
    .limit(limit)
    .exec();

  return contents;
};

export const countContentsByUserId = async (userId: string) => {
  const count = await Content.countDocuments({
    createdBy: userId,
    isDeleted: false,
  }).exec();

  return count;
};

//!SECTION
export const findContentsByTopicId = async (
  page: number,
  limit: number,
  topicId: string,
) => {
  const offset = (page - 1) * limit;

  const contents = await Content.find({
    topic: topicId,
    isDeleted: false,
  })
    .skip(offset)
    .limit(limit)
    .exec();

  return contents;
};

export const countContentsByTopicId = async (topicId: string) => {
  const count = await Content.countDocuments({
    topic: topicId,
    isDeleted: false,
  }).exec();

  return count;
};

export const findById = async (id: string) => {
  const content = await Content.findOne({ _id: id, isDeleted: false }).exec();

  return content;
};

export const create = async (content: IContent) => {
  const newContent = new Content(content);
  const savedContent = await newContent.save();

  return savedContent;
};

export const update = async (id: string, content: Partial<IContent>) => {
  return Content.findOneAndUpdate(
    {
      _id: id,
      isDeleted: false,
    },
    content,
    { new: true },
  ).exec();
};

export const softDelete = async (id: string) => {
  return Content.updateOne({ _id: id }, { isDeleted: true }).exec();
};

export const destroy = async (id: string) => {
  return Content.deleteOne({ _id: id }).exec();
};
