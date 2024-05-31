import React, { useState } from 'react';
import { Box, Container, Text, VStack, Flex, Spinner, Button, Input, Textarea, FormControl, FormLabel } from '@chakra-ui/react';
import { useEvents, useAddEvent, useUpdateEvent, useDeleteEvent } from '../integrations/supabase/index.js';

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
    <Container maxW="container.xl" p={4}>
      <Box as="main" p={4}>
        <VStack spacing={4}>
          <Text fontSize="2xl" fontWeight="bold">Events</Text>
          <Box p={4} borderWidth="1px" borderRadius="md" width="100%">
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                value={newEvent.name}
                onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                placeholder="Event Name"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Date</FormLabel>
              <Input
                type="date"
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                placeholder="Event Date"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                placeholder="Event Description"
              />
            </FormControl>
            <Button mt={4} colorScheme="blue" onClick={handleAddEvent}>Add Event</Button>
          </Box>
          {events.length === 0 ? (
            <Text>No events available.</Text>
          ) : (
            events.map(event => (
              <Box key={event.id} p={4} borderWidth="1px" borderRadius="md" width="100%">
                {editingEvent?.id === event.id ? (
                  <>
                    <FormControl>
                      <FormLabel>Name</FormLabel>
                      <Input
                        value={editingEvent.name}
                        onChange={(e) => setEditingEvent({ ...editingEvent, name: e.target.value })}
                        placeholder="Event Name"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Date</FormLabel>
                      <Input
                        type="date"
                        value={editingEvent.date}
                        onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })}
                        placeholder="Event Date"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Description</FormLabel>
                      <Textarea
                        value={editingEvent.description}
                        onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                        placeholder="Event Description"
                      />
                    </FormControl>
                    <Button mt={4} colorScheme="blue" onClick={() => handleUpdateEvent(editingEvent)}>Update Event</Button>
                    <Button mt={4} colorScheme="gray" onClick={() => setEditingEvent(null)}>Cancel</Button>
                  </>
                ) : (
                  <>
                    <Text fontSize="xl" fontWeight="bold">{event.name}</Text>
                    <Text>{new Date(event.date).toLocaleDateString()}</Text>
                    <Text>{event.description}</Text>
                    <Button mt={4} colorScheme="blue" onClick={() => setEditingEvent(event)}>Edit</Button>
                    <Button mt={4} colorScheme="red" onClick={() => handleDeleteEvent(event.id)}>Delete</Button>
                  </>
                )}
              </Box>
            ))
          )}
        </VStack>
      </Box>
    </Container>
  );
};

export default Events;