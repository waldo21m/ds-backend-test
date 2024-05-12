import { IContentType } from '../interfaces/ContentType.interface';
import ContentType from '../models/ContentType.model';

export const findAll = async () => {
  const contentTypes = await ContentType.find({ isDeleted: false }).exec();

  return contentTypes;
};

export const findById = async (id: string) => {
  const contentType = await ContentType.findOne({ _id: id, isDeleted: false }).exec();

  return contentType;
};

export const findByName = async (name: string) => {
  const contentType = await ContentType.findOne({ name, isDeleted: false }).exec();

  return contentType;
};

export const create = async (contentType: IContentType) => {
  const newContentType = new ContentType(contentType);
  const savedContentType = await newContentType.save();

  return savedContentType;
};

export const update = async (id: string, contentType: Partial<IContentType>) => {
  return ContentType.updateOne(
    {
      _id: id,
      isDeleted: false,
    },
    contentType,
  ).exec();
};

export const softDelete = async (id: string) => {
  return ContentType.updateOne({ _id: id }, { isDeleted: true }).exec();
};

export const hardDelete = async (id: string) => {
  return ContentType.deleteOne({ _id: id }).exec();
};
