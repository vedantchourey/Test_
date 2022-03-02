export const get = <TRequest>(url: string, payload: TRequest, headers: { [key: string]: string } = {}): Promise<Response> => {
  return fetch(url, {
    method: 'get',
    mode: 'cors',
    headers: {...defaultHeaders(), ...headers}
  });
};

export const patch = <TRequest>(url: string, payload: TRequest, headers: { [key: string]: string } = {}): Promise<Response> => {
  return fetch(url, {
    method: 'PATCH',
    mode: 'cors',
    headers: {...defaultHeaders(), ...headers},
    body : JSON.stringify(payload)
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
    headers: {...defaultHeaders(), ...headers}
  });
};

export const deleteRequest = <TRequest>(url: string, payload: TRequest, headers: { [key: string]: string } = {}): Promise<Response> => {
  return fetch(url, {
    method: 'delete',
    mode: 'cors',
    body: JSON.stringify(payload),
    headers: {...defaultHeaders(), ...headers}
  });
};


export async function sendFiles(url: string, files: File[], headers: { [key: string]: string } = {}): Promise<Response> {
  const formData = new FormData();
  files.forEach((file, index) => formData.append(`file${index}`, file))
  const requestOptions: RequestInit = {
    method: 'POST',
    body: formData,
    redirect: 'follow',
    headers: headers
  };
  return fetch(url, requestOptions);
}
