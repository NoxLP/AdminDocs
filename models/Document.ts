import DocumentCategory from "./DocumentCategory";

export default interface IDocument {
  data?: string;
  uri: string;
  contentType: string;
  community: string;
  user: string;
  date: Date;
  category: DocumentCategory;
  name: string;
  comments: string;
}
