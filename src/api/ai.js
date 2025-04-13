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

export const deleteNotification = async (notificationId) => {
  try {
    const response = await client.delete(
      `/members/notifications/${notificationId}/read`
    );
    console.log(response);
    return response;
  } catch (err) {
    throw err;
  }
};
