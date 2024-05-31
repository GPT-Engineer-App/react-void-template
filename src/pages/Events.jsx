import React, { useState } from 'react';
import { Box, Container, Text, VStack, Flex, Spinner, Button, Input, Textarea, FormControl, FormLabel, Link } from '@chakra-ui/react';
import { useEvents, useAddEvent, useUpdateEvent, useDeleteEvent } from '../integrations/supabase/index.js';
import { Link as RouterLink } from "react-router-dom";
import { FaHome, FaInfoCircle, FaCalendarAlt } from "react-icons/fa";

const Events = () => {
  const { data: events, error, isLoading } = useEvents();
  const addEvent = useAddEvent();
  const updateEvent = useUpdateEvent();
  const deleteEvent = useDeleteEvent();

  const [newEvent, setNewEvent] = useState({ name: '', date: '', description: '' });
  const [editingEvent, setEditingEvent] = useState(null);

  const handleAddEvent = () => {
    addEvent.mutate(newEvent, {
      onSuccess: () => setNewEvent({ name: '', date: '', description: '' }),
    });
  };

  const handleUpdateEvent = (event) => {
    updateEvent.mutate(event, {
      onSuccess: () => setEditingEvent(null),
    });
  };

  const handleDeleteEvent = (id) => {
    deleteEvent.mutate(id);
  };

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
    <Container maxW="container.xl" p={0} bg="gray.50">
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
      <Box as="main" p={8} bg="white">
        <VStack spacing={8} align="start">
          <Text fontSize="4xl" fontWeight="bold">Events</Text>
          <Box p={6} borderWidth="1px" borderRadius="md" width="100%" bg="gray.100">
            <FormControl mb={4}>
              <FormLabel>Name</FormLabel>
              <Input
                value={newEvent.name}
                onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                placeholder="Event Name"
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Date</FormLabel>
              <Input
                type="date"
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                placeholder="Event Date"
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                placeholder="Event Description"
              />
            </FormControl>
            <Button mt={4} colorScheme="teal" onClick={handleAddEvent}>Add Event</Button>
          </Box>
          {events.length === 0 ? (
            <Text>No events available.</Text>
          ) : (
            events.map(event => (
              <Box key={event.id} p={6} borderWidth="1px" borderRadius="md" width="100%" bg="gray.100">
                {editingEvent?.id === event.id ? (
                  <>
                    <FormControl mb={4}>
                      <FormLabel>Name</FormLabel>
                      <Input
                        value={editingEvent.name}
                        onChange={(e) => setEditingEvent({ ...editingEvent, name: e.target.value })}
                        placeholder="Event Name"
                      />
                    </FormControl>
                    <FormControl mb={4}>
                      <FormLabel>Date</FormLabel>
                      <Input
                        type="date"
                        value={editingEvent.date}
                        onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })}
                        placeholder="Event Date"
                      />
                    </FormControl>
                    <FormControl mb={4}>
                      <FormLabel>Description</FormLabel>
                      <Textarea
                        value={editingEvent.description}
                        onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                        placeholder="Event Description"
                      />
                    </FormControl>
                    <Button mt={4} colorScheme="teal" onClick={() => handleUpdateEvent(editingEvent)}>Update Event</Button>
                    <Button mt={4} colorScheme="gray" onClick={() => setEditingEvent(null)}>Cancel</Button>
                  </>
                ) : (
                  <>
                    <Text fontSize="2xl" fontWeight="bold">{event.name}</Text>
                    <Text>{new Date(event.date).toLocaleDateString()}</Text>
                    <Text>{event.description}</Text>
                    <Button mt={4} colorScheme="teal" onClick={() => setEditingEvent(event)}>Edit</Button>
                    <Button mt={4} colorScheme="red" onClick={() => handleDeleteEvent(event.id)}>Delete</Button>
                  </>
                )}
              </Box>
            ))
          )}
        </VStack>
      </Box>
      <Flex as="footer" bg="gray.100" p={4} justifyContent="space-between" alignItems="center">
        <Text fontSize="sm" color="gray.600">© 2023 MyApp. All rights reserved.</Text>
        <Flex>
          <Link as={RouterLink} to="/" p={2} _hover={{ textDecoration: "none", color: "blue.500" }}>Home</Link>
          <Link as={RouterLink} to="/about" p={2} _hover={{ textDecoration: "none", color: "blue.500" }}>About</Link>
          <Link as={RouterLink} to="/events" p={2} _hover={{ textDecoration: "none", color: "blue.500" }}>Events</Link>
        </Flex>
      </Flex>
    </Container>
  );
};

export default Events;