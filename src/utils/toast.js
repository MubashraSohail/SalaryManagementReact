import { toast } from "react-toast-notification";

const success = (message) => {
  if (message) {
    toast(message, {
      status: "Message",
      type: "success",
      autoHide: true,
      delay: "5000",
    });
  }
};

const error = (message) => {
  if (message) {
    toast(message, {
      status: "Message",
      type: "error",
      autoHide: true,
      delay: "5000",
    });
  }
};

export default { success, error };
