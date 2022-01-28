import type React from "react"
import { Container, useTheme, Icon } from "@mui/material"
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import commonStyles from '../../../styles/common.module.css'

interface Props {
    icon?: React.ReactNode | boolean,
    children: React.ReactChild,
    style?: React.CSSProperties
}

const MessageContainer = ({
    icon,
    children,
    style = {}
}: Props) => {
    const theme = useTheme();
    return (
        <Container maxWidth="md" style={{ backgroundColor: theme.palette.background.paper, display: "flex", alignItems: "center", gap: "10px", ...style }}>
            {icon && typeof icon === 'boolean' ? (
                <Icon className={commonStyles.whiteText}>
                    <ErrorOutlineIcon />
                </Icon>
            ) : icon}
            {children}
        </Container>
    )
}

export default MessageContainer