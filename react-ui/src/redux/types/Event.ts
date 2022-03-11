interface Event {
  id: string;
  name: {
    fi: string;
  };
  short_description: {
    fi: string;
  };
  start_time: string;
  location_extra_info: {
    fi: string;
  };
  info_url: {
    fi: string;
  };
}

export interface GetEventResponse {
  meta: any;
  data: Event[];
  id: string;
  name: {
    fi: string;
  };
  short_description: {
    fi: string;
  };
  start_time: Date;
  location_extra_info: {
    fi: string;
  };
  info_url: {
    fi: string;
  };
  provider: {
    fi: string;
  };
  description: {
    fi: string;
  };
}
