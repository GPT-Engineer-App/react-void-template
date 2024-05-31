import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import About from "./pages/About.jsx";
import Events from "./pages/Events.jsx";
import { Box, Flex, Text, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { FaHome, FaInfoCircle, FaCalendarAlt } from "react-icons/fa";

function App() {
  return (
    <Box bg="white">
      <Router>
        <Flex as="nav" bg="blue.500" color="white" p={4} justifyContent="space-between" alignItems="center">
          <Text fontSize="xl" fontWeight="bold">MyApp</Text>
          <Flex>
            <Link as={RouterLink} to="/" p={2} _hover={{ textDecoration: "none", bg: "blue.600" }}>
              <FaHome style={{ marginRight: '8px' }} /> Home
            </Link>
            <Link as={RouterLink} to="/about" p={2} _hover={{ textDecoration: "none", bg: "blue.600" }}>
              <FaInfoCircle style={{ marginRight: '8px' }} /> About
            </Link>
            <Link as={RouterLink} to="/events" p={2} _hover={{ textDecoration: "none", bg: "blue.600" }}>
              <FaCalendarAlt style={{ marginRight: '8px' }} /> Events
            </Link>
          </Flex>
        </Flex>
        <Routes>
          <Route exact path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<Events />} />
        </Routes>
        <Flex as="footer" bg="gray.100" p={4} justifyContent="space-between" alignItems="center">
          <Text fontSize="sm" color="gray.600">© 2023 MyApp. All rights reserved.</Text>
          <Flex>
            <Link as={RouterLink} to="/" p={2} _hover={{ textDecoration: "none", color: "blue.500" }}>Home</Link>
            <Link as={RouterLink} to="/about" p={2} _hover={{ textDecoration: "none", color: "blue.500" }}>About</Link>
            <Link as={RouterLink} to="/events" p={2} _hover={{ textDecoration: "none", color: "blue.500" }}>Events</Link>
          </Flex>
        </Flex>
      </Router>
    </Box>
  );
}

export default App;