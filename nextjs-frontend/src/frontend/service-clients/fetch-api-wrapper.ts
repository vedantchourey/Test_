export const get = (url: string): Promise<Response> => {
  return fetch(url, {
    method: 'get',
    mode: 'cors',
    headers: {
      'Accept': 'application/json'
    }
  });
};

function defaultHeaders(): { [i: string]: string } {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json;charset=UTF-8'
  };
}

export const post = <TRequest>(url: string, payload: TRequest, headers: { [key: string]: string } = {}): Promise<Response> => {
  return fetch(url, {
    method: 'post',
    mode: 'cors',
    body: JSON.stringify(payload),
    headers: { ...defaultHeaders(), ...headers }
  });
};

export const deleteRequest = <TRequest>(url: string, payload: TRequest, headers: { [key: string]: string } = {}): Promise<Response> => {
  return fetch(url, {
    method: 'delete',
    mode: 'cors',
    body: JSON.stringify(payload),
    headers: { ...defaultHeaders(), ...headers }
  });
};
