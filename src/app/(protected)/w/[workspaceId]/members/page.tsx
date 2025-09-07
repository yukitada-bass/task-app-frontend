import React from 'react'

export default async function page({ params }: {
  params: Promise<{ workspaceId: string }>
}) {
  const {workspaceId} = await params;
  return (
    <div>ワークスペースID：{workspaceId}</div>
  )
}
