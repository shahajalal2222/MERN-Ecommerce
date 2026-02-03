import Banner from "./components/Banner"
import Container from "./components/Container"
import Header from "./components/Header"
import Sale from "./components/Sale"
import Title from "./components/Title"

function App() {
  return (
    <main>
      <Banner />
      <Container className="py-5 md:py-10">
        <Sale />
        {/* New Arival    */}
        { /* Best Sellers  */}
        {/* Product of the Year  */}
        {/* Special Offers */}
      </Container>
    </main>
  )
}

export default App
