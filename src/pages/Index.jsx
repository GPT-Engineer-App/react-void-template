import { Box, Container, Flex, Text, VStack, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Index = () => {
  return (
    <Container maxW="container.xl" p={0}>
      <Flex as="nav" bg="blue.500" color="white" p={4} justifyContent="space-between" alignItems="center">
        <Text fontSize="xl" fontWeight="bold">MyApp</Text>
        <Flex>
          <Link as={RouterLink} to="/" p={2} _hover={{ textDecoration: "none", bg: "blue.600" }}>Home</Link>
          <Link as={RouterLink} to="/about" p={2} _hover={{ textDecoration: "none", bg: "blue.600" }}>About</Link>
        </Flex>
      </Flex>
      <Box as="main" p={4}>
        <VStack spacing={4}>
          <Text fontSize="2xl">Welcome to MyApp</Text>
          <Text>This is a blank canvas for your new React application.</Text>
        </VStack>
      </Box>
    </Container>
  );
};

export default Index;