import NavLinks from "./NavLinks";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <NavLinks />
      <main style={{ minHeight: '500px', padding: '1rem' }}>
        {children || <div style={{ minHeight: '500px' }} />}
      </main>
    </div>
  )
}

export default Layout;