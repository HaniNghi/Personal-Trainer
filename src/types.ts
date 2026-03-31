export type CustomerData = {
  firstname: string;
  lastname: string;
  streetaddress: string;
  postcode: number;
  city: string;
  email: string;
  phone: string;
  _links: {
    self: {
      href: string;
    };
    customer: {
      href: string;
    };
    trainings: {
      href: string;
    };
  };
};

export type Customer = Omit<CustomerData,"_links">
