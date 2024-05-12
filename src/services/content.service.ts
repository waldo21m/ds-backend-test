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

  const contents = await Content.find(query)
    .skip(offset)
    .limit(limit)
    .exec();

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

export const findById = async (id: string) => {
  const content = await Content.findOne({ _id: id, isDeleted: false }).exec();

  return content;
};

export const findByName = async (name: string) => {
  const content = await Content.findOne({ name, isDeleted: false }).exec();

  return content;
};

export const create = async (content: IContent) => {
  const newContent = new Content(content);
  const savedContent = await newContent.save();

  return savedContent;
};

export const update = async (id: string, content: Partial<IContent>) => {
  return Content.updateOne(
    {
      _id: id,
      isDeleted: false,
    },
    content,
  ).exec();
};

export const softDelete = async (id: string) => {
  return Content.updateOne({ _id: id }, { isDeleted: true }).exec();
};

export const hardDelete = async (id: string) => {
  return Content.deleteOne({ _id: id }).exec();
};
