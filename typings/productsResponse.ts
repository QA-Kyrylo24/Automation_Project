export interface ProductResponse {
    current_page: number;
    data: Product[];
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
  }


  export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    is_location_offer: boolean;
    is_rental: boolean;
    in_stock: boolean;
    product_image: {
      id: string;
      by_name: string;
      by_url: string;
      source_name: string;
      source_url: string;
      file_name: string;
      title: string;
    };
    category: {
      id: string;
      name: string;
      slug: string;
      parent_id: string;
    };
    brand: {
      id: string;
      name: string;
      slug: string;
    };
  }