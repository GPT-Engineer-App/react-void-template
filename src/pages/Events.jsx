import React from 'react';
import { Box, Container, Text, VStack, Flex, Spinner } from '@chakra-ui/react';
import { useEvents } from '../integrations/supabase/index.js';

const Events = () => {
  const { data: events, error, isLoading } = useEvents();

  if (isLoading) {
    return (
      <Container maxW="container.xl" p={4}>
        <Flex justifyContent="center" alignItems="center" height="100vh">
          <Spinner size="xl" />
        </Flex>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxW="container.xl" p={4}>
        <Text fontSize="xl" color="red.500">Failed to load events: {error.message}</Text>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" p={4}>
      <Box as="main" p={4}>
        <VStack spacing={4}>
          <Text fontSize="2xl" fontWeight="bold">Events</Text>
          {events.length === 0 ? (
            <Text>No events available.</Text>
          ) : (
            events.map(event => (
              <Box key={event.id} p={4} borderWidth="1px" borderRadius="md" width="100%">
                <Text fontSize="xl" fontWeight="bold">{event.name}</Text>
                <Text>{new Date(event.date).toLocaleDateString()}</Text>
                <Text>{event.description}</Text>
              </Box>
            ))
          )}
        </VStack>
      </Box>
    </Container>
  );
};

export default Events;