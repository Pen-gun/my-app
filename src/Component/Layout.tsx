import NavLinks from "./NavLinks";
import Footer from "./Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <NavLinks />
      <main style={{ minHeight: '500px', padding: '1rem' }}>
        {children || <div style={{ minHeight: '500px' }} />}
      </main>
      <Footer />
    </div>
  )
}

export default Layout;