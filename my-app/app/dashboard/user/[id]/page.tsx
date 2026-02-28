export default async function UserDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
      <h1>Users Detail Page</h1>
      <p>this is user {id} profile</p>
    </div>
  );
}
