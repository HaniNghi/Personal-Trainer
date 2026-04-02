import { Dayjs } from 'dayjs';

export type Customer = {
  firstname: string;
  lastname: string;
  streetaddress: string;
  postcode: string;
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

// export type CustomerSimple = Omit<Customer,"_links">


// export type TrainingData = {
//   date: Dayjs,
//   duration: number, //in minutes
//   activity: string,
//   _links: {
//     self: {
//       href: string;
//     };
//     training: {
//       href: string;
//     };
//     customer: {
//       href: string;
//     };
//   }
// }

// export type Training = Omit<TrainingData,"_links">

export type Training = { 
  id?: number,
  date: Dayjs,
  duration: number,
  activity: string,
  customer?: Customer,
}

export type TrainingSimple = { 
  date: Dayjs,
  duration: number,
  activity: string,
  customer?: string,
}
