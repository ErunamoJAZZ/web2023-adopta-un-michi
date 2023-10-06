"use client"

import { useState } from "react"
import { Avatar, Button, TextField, Typography } from "@mui/material"
import { FunctionComponent as FC } from "react"
import styles from "./profile.style.module.css"

export interface ProfileProps
{
    correo: string
    nombre: string
}

export const Perfil: FC<ProfileProps> = (profile_info: ProfileProps) =>
{
    const [isEditing, setIsEditing] = useState(false);

    return (
        <>
        <div style={{position:"absolute", left:"42%", top:"15%"}}>
            <Avatar sx={{width: 150, height:150, fontSize:40, textAlign:"justify", left:"20%"}}
            children={`${profile_info.nombre.split(" ")[0][0].toUpperCase()}
            ${profile_info.nombre.split(" ")[1][0].toUpperCase()}`}/>
            {isEditing ? (
                <>
                <div>
                {
                    (Object.keys(profile_info) as (keyof typeof profile_info)[]).map(key => { return (
                        <TextField size="small" fullWidth margin="normal" label={key} defaultValue={profile_info[key]} sx={{display:"block", padding:"5px"}}></TextField>
                    )
                    })
                }
                </div>
                <Button onClick={() => setIsEditing(false)}> Guardar </Button></>
            ) : (
                <Button style={{position:"relative", left:"48%"}} onClick={() => setIsEditing(true)}> Editar </Button>
            )}
            
        </div>
        </>  
        
    )
}
