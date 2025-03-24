import { Job } from "./user-model";

interface Sort {
    unsorted: boolean;
    empty: boolean;
    sorted: boolean;
  }

export interface JobsPage {
    content: Job[];
    pageable: Pageable;
    last: boolean;
    totalPages: number;
    totalElements: number;
    number: number;
    numberOfElements: number;
    size: number;
    sort: Sort;
    first: boolean;
    empty: boolean;
  }

  interface Pageable {
    pageNumber: number;
    pageSize: number;
    sort: Sort;
    offset: number;
    unpaged: boolean;
    paged: boolean;
  }