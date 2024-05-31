import { Box, Container, Flex, Text, VStack, Link, Button } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { FaHome, FaInfoCircle, FaCalendarAlt } from "react-icons/fa";

const Index = () => {
  return (
    <Container maxW="container.xl" p={8} bg="gray.50">
      <Flex as="nav" bg="white" color="black" p={4} justifyContent="space-between" alignItems="center" boxShadow="md">
        <Text fontSize="2xl" fontWeight="bold">MyApp</Text>
        <Flex>
          <Link as={RouterLink} to="/" p={2} _hover={{ textDecoration: "none", color: "teal.500" }}>
            <FaHome style={{ marginRight: '8px' }} /> Home
          </Link>
          <Link as={RouterLink} to="/about" p={2} _hover={{ textDecoration: "none", color: "teal.500" }}>
            <FaInfoCircle style={{ marginRight: '8px' }} /> About
          </Link>
          <Link as={RouterLink} to="/events" p={2} _hover={{ textDecoration: "none", color: "teal.500" }}>
            <FaCalendarAlt style={{ marginRight: '8px' }} /> Events
          </Link>
        </Flex>
      </Flex>
      <Box as="main" p={8} bg="white" mt={4} boxShadow="md">
        <VStack spacing={8} align="start">
          <Text fontSize="4xl" fontWeight="bold">Welcome to MyApp</Text>
          <Text fontSize="lg" color="gray.700">This is a blank canvas for your new React application.</Text>
          <Button colorScheme="teal" size="lg">Get Started</Button>
        </VStack>
      </Box>
      <Flex as="footer" bg="gray.100" p={4} justifyContent="space-between" alignItems="center" mt={8} boxShadow="md">
        <Text fontSize="sm" color="gray.600">© 2023 MyApp. All rights reserved.</Text>
        <Flex>
          <Link as={RouterLink} to="/" p={2} _hover={{ textDecoration: "none", color: "teal.500" }}>Home</Link>
          <Link as={RouterLink} to="/about" p={2} _hover={{ textDecoration: "none", color: "teal.500" }}>About</Link>
          <Link as={RouterLink} to="/events" p={2} _hover={{ textDecoration: "none", color: "teal.500" }}>Events</Link>
        </Flex>
      </Flex>
    </Container>
  );
};

export default Index;