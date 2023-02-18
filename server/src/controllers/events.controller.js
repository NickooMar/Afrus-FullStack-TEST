import eventsServices from "../services/events.services.js";

export const getEvent = async (req, res) => {
  try {
    const result = await eventsServices.getEvent();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(200).json({ error: error.message });
  }
};
