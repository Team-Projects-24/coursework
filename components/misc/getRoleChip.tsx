import { Chip } from '@mui/material';
import React from 'react';

const getRoleChip = (role: string) =>{
    switch(role){
        case ("admin"): {
            return (
                <Chip 
                sx = {{
                    color: "white",
                    backgroundColor: "red",
                }}
                label={role} />
            )
        }
        case ("employee"): {
            return (
                <Chip 
                sx = {{
                    color: "white",
                    backgroundColor: "green",
                }}
                label={role} />
            )
        }
        case ("manager"): {
            return (
                <Chip 
                sx = {{
                    color: "white",
                    backgroundColor: "orange",
                }}
                label={role} />
            )
        }
        default: {
            return (
                <Chip 
                sx = {{
                    color: "white",
                    backgroundColor: "black",
                }}
                label={role} />
            )
        }
    }

}

export default getRoleChip