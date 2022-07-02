import {NavigationBar} from '../Navbar/Navbar'

export default function Layout({ children }) {
  return (
    <>
      <NavigationBar />
        <main className="mt-16">{children}</main>
    </>
  )
}