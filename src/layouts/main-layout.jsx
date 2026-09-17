import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <>
      <p>This is header</p>
      <div>
        <Outlet />
      </div>
      <p>This is footer</p>
    </>
  );
}
