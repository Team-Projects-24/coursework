import { Button, TextField, } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import useAlertStore from "stores/alertStore";
import { IUser } from "../../types/User.d";


/**
 * @Author - Matthew Fuller, Tom Whitticase
 * @description Provides interface for user to enter an email address to invite a user.
 * @param {IUser} user - The user who is inviting the new user.
 */
interface IProps {
  user: IUser;
}
export default function Invite({ user }: IProps) {
  const { addAlert} = useAlertStore();
  // State to track the email input value
  const [email, setEmail] = useState("");
  // State to track whether there is an email error
  const [emailError, setEmailError] = useState(false);
  // State to track whether the email is being sent
  const [isSending, setIsSending] = useState(false);

  // Function to handle inviting a new user
  const handleInviteUser = async () => {
    // Check if an email has been entered
    if (!email) {
      setEmailError(true);
      return;
    }

    // Set isSending state to true to indicate that the email is being sent
    setIsSending(true);

    try {
      // Send the email using the server-side API
      const res = await axios.post("/api/email/sendInvite", {
        emailAddress: email,
      });
      // Clear the email input and email error state
      setEmail("");
      setEmailError(false);
      // Show an alert to indicate that the email was sent successfully
      addAlert("Email sent!","success");
    } catch (error) {
      // If there was an error sending the email, log the error and show an error alert
      console.error(error);
      addAlert("Error sending email","error");
    }

    // Set isSending state to false to indicate that the email has been sent
    setIsSending(false);
  };

  // Function to handle changes to the email input value
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setEmailError(false);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <TextField
        error={emailError}
        helperText={emailError ? "Please enter a valid email address" : ""}
        value={email}
        onChange={handleEmailChange}
        sx={{
           width: "100%",
           padding: "5px"
      }}

      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleInviteUser}
        disabled={isSending}
        size="small"
        sx={{ 
          width: "50%",
          margin:"auto",
        }}
        
      >
        {isSending ? "Sending..." : "Send Invitation"}
      </Button>
    </div>
  );
}
