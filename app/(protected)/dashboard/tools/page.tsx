"use server"
import { promises as fs } from "node:fs"
import path from "node:path"
import { columns } from "@/components/data-table/columns"
import { DataTable } from "@/components/data-table/data-table"
import { SiteHeader } from "@/components/general/site-header"
import { taskSchema } from "@/schemas/Dashboard/tools"
import { z } from "zod"

// export const metadata: Metadata = {
//   title: "Tasks",
//   description: "A task and issue tracker build using Tanstack Table.",
// }

// Simulate a database read for tasks.
async function getTasks() {
  const data = await fs.readFile(
    path.join(process.cwd(), "/app/(protected)/dashboard/tools/tasks.json"),
  )

  const tasks = JSON.parse(data.toString())

  return z.array(taskSchema).parse(tasks)
}

export default async function TaskPage() {
  const tasks = await getTasks()

  return (
    <>
      <SiteHeader
        items={[
          {
            title: "Tools",
            url: "/dashboard/tools",
          },
        ]}
      />
      <div className="md:hidden">Please use a desktop browser to view this page.</div>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-4 lg:p-6 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
        </div>
        <DataTable data={tasks} columns={columns} />
      </div>
    </>
  )
}
