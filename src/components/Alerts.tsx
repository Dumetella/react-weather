import { Paper } from "@mui/material";
import React from "react";

interface AlertProps {
    style: string
    message: string
}

export default function Alert(props: AlertProps): JSX.Element | null {
    return (
        (props.message) ? <Paper sx={{ bgcolor: props.style }}>{props.message}</Paper> : null
    );
}
