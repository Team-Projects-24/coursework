/**
 * @author Ade Osindero
 * 
 * @description Implements react component which serves to display the
 * chat rooms of the current user, on the menu of the text chat subsytem. 
 */

import { Grid, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { IChatroom } from "types/Chatroom.d";
import axios from "axios";
import { IChatMessage } from "types/ChatMessage.d";
import DoneIcon from "@mui/icons-material/Done";


/**
 * @author Ade Osindero
 * 
 * @param updatedAt - The last time the current chat was updated.
 * @returns A formatted string depiction of the last time the chat was updated.
 */
function getChatDate(updatedAt: Date) {
    const now = new Date();
    
    if (now.getDate() == updatedAt.getDate()) {
        return updatedAt.toLocaleString(
            "en-uk", { timeStyle: "short" }
        );
    } else if (now.getDay() - updatedAt.getDay() < 7) {
        return updatedAt.toLocaleString(
            "en-uk", {  weekday: "long" }
        );
    } else {
        return updatedAt.toLocaleDateString("en-uk");
    }
}

/**
 * @author Ade Osindero
 * 
 * @param messages - Messages sent on the current chat.
 * @param isPrivate - Boolean confirming if the current chat is private.
 * @param id - The id of the current user.
 * @returns A react component which formats the display of the last message sent in the chat.
 */
function getChatLastMessage(
    messages: IChatMessage[], isPrivate: boolean, id: string
) {
    if (messages.length === 0) {
        return (
            <Grid item>
                <Typography className="menu-card-text">
                    Start a conversation
                </Typography>
            </Grid>
        );
    }

    const lastMessage = messages.at(-1)!;
    console.log(lastMessage);
    
    if (lastMessage.senderId === id) {
        return (
            <Grid item container>
                <Grid item paddingRight={.5}>
                    <DoneIcon
                        fontSize="small"
                        className={
                            `tick ${lastMessage.seenById? "active" : ""}`
                        }
                    />
                </Grid>
                <Grid item>
                    <Typography className="menu-card-text">
                        {lastMessage.content}
                    </Typography>
                </Grid>
            </Grid>
        );
    }
    return (
        <Grid item>
            <Typography className="menu-card-text">
                {
                    `${
                        !isPrivate? `${lastMessage.senderId}: `: ""
                    }${lastMessage.content}`
                }
            </Typography>
        </Grid>
    );
}

/**
 * @author Ade Osindero
 * 
 * @param chatId - The id of the chat being formatted into a card.
 * @param userId - The id of the current user.
 * @returns A react component (the card) detailing information of the chat.
 */
export default function MenuCard({ chatId, userId }: { chatId: number, userId: string }) {
    const [chat, setChat] = useState<IChatroom>();

    useEffect(() => {
        async function getChat() {
            const { data } =
                await axios.post("/api/chat/getChatInfo", { id: chatId });
            setChat(data as IChatroom);
        }
        getChat();
    }, []);
    
    if (!chat || chat.private && chat.messages.length === 0) {
        return <></>;
    }

    return (
        <>
            <Grid container className="menu-card" paddingX={3}>
                <Grid item xs="auto" padding={1}>
                    <Box padding={1} className="icon-container">
                        <PersonIcon className="icon"/>
                    </Box>
                </Grid>
                <Grid item paddingLeft={2} xs={11}>
                    <Grid container padding={1} direction={"column"}>
                        <Grid
                            item container xs={12}
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Grid item xs="auto">
                                <Typography
                                    color="#e9edef"
                                    fontSize={18}
                                >{chat.name}</Typography>
                            </Grid>
                            <Grid item xs="auto">
                                <Typography
                                    fontSize={15}
                                    color="#8696a0"
                                >{
                                    getChatDate(new Date(chat.updatedAt))
                                }</Typography>
                            </Grid>
                        </Grid>
                        {getChatLastMessage(chat.messages, chat.private, userId)}
                    </Grid>
                    <hr />
                </Grid>
            </Grid>
        </>
    )
}