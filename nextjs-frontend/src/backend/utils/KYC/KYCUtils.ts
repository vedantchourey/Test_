import backendConfig from "../config/backend-config";

const getAccessToken = async (): Promise<any> => {
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "x-api-key": backendConfig.sandbox.api_key,
      "x-api-secret": backendConfig.sandbox.secret,
      "x-api-version": "1.0",
    },
  };

  const authResponse = await fetch(
    "https://api.sandbox.co.in/authenticate",
    options
  )
    .then((response) => response.json())
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return { err };
    });

  if (authResponse.err) return { error: authResponse.err };

  return authResponse.access_token;
};

export const aadharVarification = async (
  aadhaarNumber: string
): Promise<any> => {
  const access_token = await getAccessToken();
  if (access_token.error) return { error: access_token.error };

  const optionsAdhaar = {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: access_token,
      "x-api-key": backendConfig.sandbox.api_key,
      "x-api-version": "1.0",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ aadhaar_number: aadhaarNumber }),
  };

  const aadharResponse = await fetch(
    "https://api.sandbox.co.in/aadhaar/verify",
    optionsAdhaar
  )
    .then((response) => response.json())
    .then((response) => response)
    .catch((err) => ({ err }));
  if (aadharResponse.err) return { error: aadharResponse.err };
  if (aadharResponse.code === 200)
    return {
      isVerified: true,
      ...aadharResponse
    };
  return {
      isVerified: false,
      ...aadharResponse
    };
};

export interface IBankAccountVarification {
  mobile: string;
  name: string;
  accNo: string;
  ifsc: string;
}

export const bankAccountVarification = async ({
  mobile,
  name,
  accNo,
  ifsc,
}: IBankAccountVarification): Promise<any> => {
  const access_token = await getAccessToken();
  if (access_token.error) return { error: access_token.error };

  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: access_token,
      "x-api-key": backendConfig.sandbox.api_key,
      "x-api-version": "1.0",
    },
  };

  const bankResponse = await fetch(
    `https://api.sandbox.co.in/bank/${ifsc}/accounts/${accNo}/verify?name=${name}&mobile=${mobile}`,
    options
  )
    .then((response) => response.json())
    .then((response) => response)
    .catch((err) => ({ err }));

  if (bankResponse.err) return { error: bankResponse.err };
  if (bankResponse.code === 200)
    return {
      isVerified: true,
      ...bankResponse
    };
  return {
      isVerified: false,
      ...bankResponse
    };
};
