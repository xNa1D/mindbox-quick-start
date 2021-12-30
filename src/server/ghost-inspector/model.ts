export type settings<body> = {
  options: {
    headers: {
      "Content-Type": string;
    };
  };
  url: string;
  body: body;
};
