import { Box, Container, Text, VStack } from "@chakra-ui/react";

const About = () => {
  return (
    <Container maxW="container.xl" p={4}>
      <Box as="main" p={4}>
        <VStack spacing={4}>
          <Text fontSize="2xl">About MyApp</Text>
          <Text>This is the about page of your new React application.</Text>
        </VStack>
      </Box>
    </Container>
  );
};

export default About;