"use client"
import { H } from "@/components/general/heading"
import { api } from "@/lib/api-client"
import { useEffect, useState } from "react"

export default function UsersPage() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    ;(async () => {
      try {
        const fetchedUsers = await api.get("/users", undefined, { timeoutMs: 5000 })
        console.log(fetchedUsers)
        setUsers(fetchedUsers)
      } catch (error) {
        console.error("Failed to load users:", error)
      }
    })()
  }, [])

  return (
    <div className="p-8">
      <div className="mb-6">
        <H size={"h3"} className="text-3xl font-bold ">
          Users List
        </H>
        <p className="text-muted-foreground font-light">(Testing self healing API)</p>
      </div>

      <ul className="space-y-4">
        {users.map((user: any) => (
          <li key={user.id} className="border p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-muted-foreground font-light">{user.email}</p>
            <p className="text-muted-foreground font-light">{user.address.city}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
