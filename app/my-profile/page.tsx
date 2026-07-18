"use client"
import { jwtDecode } from "jwt-decode"
import { useEffect, useState } from "react"

export default function MyProfile () {

    const [decoded, setDecoded] = useState('')

    useEffect(() => {
        const token = localStorage.getItem("token")
        console.log(token)
        setDecoded(jwtDecode(token))
    }, []);

    console.log(decoded.email)

    return (
        <div>
            Welcome, {decoded.email}
            <div>
                Order History:
                    <div>
                        No orders
                    </div>
            </div>

        </div>
    )

}