export const generateConfig = (method, url, accessToken) => {
    return {
      method: method ?? "get",
      url: url,
      headers: {
        Authorization: `Bearer ${accessToken} `,
        "Content-type": "application/json",
      },
    };
  };
  
