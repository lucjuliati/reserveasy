import { motion } from "framer-motion"
import { useState } from "react"
import { FaTimes } from "react-icons/fa"
import styled from "styled-components"

export const ToastItem = styled(motion.div)`
    position: fixed;
    bottom: 42px;
    right: 26px;
    background: #f5f5f5;
    border-radius: 10px 12px;
    min-width: 200px;
    backdrop-filter: blur(10px);
    padding: 12px 20px;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.22);
    z-index: 99999;

    p {
        margin-top: 12px;
    }

    span {
        float: right;
        color: #484848;
        transform: scale(1.25);
        cursor: pointer;
    }
`

export default function Toast({ title, message }) {
    const [open, setOpen] = useState(true)

    return open ? (
        <ToastItem
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}>
            <span onClick={() => setOpen(false)}>
                <FaTimes />
            </span>
            <strong>{title}</strong>
            <p>{message}</p>
        </ToastItem>
    ) : null
}