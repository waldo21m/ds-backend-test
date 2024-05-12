export interface IContent {
  _id?: string;
  name: string;
  data: string;
  contentType: string;
  topic: string;
  createdBy: string;
}

export interface IContentQuery {
  isDeleted: boolean;
  name?: {
    $regex: RegExp;
  };
}
