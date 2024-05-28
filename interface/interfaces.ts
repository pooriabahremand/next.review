export interface Review {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  image: string;
  body?: string;
}

export interface DataInterfaceAttributes {
  slug: string;
  title: string;
  subtitle: string;
  publishedAt: string;
  body?: string;
  image: {
    data: {
      id: number;
      attributes: {
        url: string;
      };
    };
  };
}

export interface DataInterface {
  id: number;
  attributes: DataInterfaceAttributes;
}

export interface MetaInterfaceAttributes {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

export interface FetchReviewsInterface {
  data: DataInterface[];
  meta: MetaInterfaceAttributes;
}

export interface SearchableReviewsInterface {
  title: string;
  slug: string;
}

export interface CommentInterface {
  id: string;
  user: string;
  message: string;
}
