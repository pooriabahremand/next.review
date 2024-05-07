export interface Review {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  image: string;
  body?: string;
}

export interface DataInterface {
  id: number;
  attributes: {
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
  };
}
