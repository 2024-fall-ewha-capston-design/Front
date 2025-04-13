import { client } from "./api";

export const getNotification = async () => {
  try {
    const response = await client.get(`/members/notifications`);
    console.log(response);
    return response;
  } catch (err) {
    throw err;
  }
};
