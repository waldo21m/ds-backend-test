export interface ITopic {
  _id?: string;
  name: string;
  contentPermissions: string[];
  coverImage: string;
}

export interface ITopicQuery {
  isDeleted: boolean;
  name?: {
    $regex: RegExp;
  };
}
