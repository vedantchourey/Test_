export const get = (url: string) => {
  return fetch(url, {
    method: 'get',
    mode: 'cors',
    headers: {
      'Accept': 'application/json'
    }
  });
};

function defaultHeaders() {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json;charset=UTF-8'
  };
}

export const post = <TRequest>(url: string, payload: TRequest, headers: { [key: string]: string } = {}) => {
  return fetch(url, {
    method: 'post',
    mode: 'cors',
    body: JSON.stringify(payload),
    headers: {...defaultHeaders(), ...headers}
  });
};
