export const get = (url: string) => {
  return fetch(url, {
    method: 'get',
    mode: 'cors',
    headers: {
      'Accept': 'application/json'
    }
  });
};

export const post = <TRequest>(url: string, payload: TRequest) => {
  return fetch(url, {
    method: 'post',
    mode: 'cors',
    body: JSON.stringify(payload),
    headers: {
      'Accept': 'application/json',
      'Content-Type':'application/json;charset=UTF-8'
    }
  });
};