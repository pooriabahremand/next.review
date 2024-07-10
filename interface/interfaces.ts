export interface Props {
  children: Readonly<React.ReactNode>;
}

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

export interface CommentFormProps {
  title: string;
  slug: string;
}

export interface FetchReviewsParameters {
  fields?: string[];
  sort?: string[];
  pagination?: { page?: number; pageSize?: number; withCount?: boolean };
  populate?: { image?: { fields?: string[] } };
  filters?: { title?: { $containsi: string }; slug?: { $eq: string } };
}

interface FetchReviewsAttributesImageInterface {
  data: {
    id: number;
    attributes: {
      url: string;
    };
  };
}

export interface FetchReviewsAttributesInterface {
  slug?: string;
  title?: string;
  subtitle?: string;
  publishedAt?: string;
  image?: FetchReviewsAttributesImageInterface;
  body?: string;
}

export interface FetchReviewsDataInterface {
  id: number;
  attributes: FetchReviewsAttributesInterface;
}

export interface FetchReviewsMetaDataInterface {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

export interface FetchReviewsReturnInterface {
  data: FetchReviewsDataInterface[];
  meta: FetchReviewsMetaDataInterface;
}
