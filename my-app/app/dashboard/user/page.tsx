import Link from "next/link";

const User = () => {
  return (
    <div>
      <h1>Users</h1>

      <li>
        <Link href="user/1">user 1</Link>
      </li>
      <li>
        <Link href="user/2">user 2</Link>
      </li>
      <li>
        <Link href="user/3">user 3</Link>
      </li>
      <li>
        <Link href="user/4">user 4</Link>
      </li>
      <li>
        <Link href="user/5">user 5</Link>
      </li>
    </div>
  );
};

export default User;
