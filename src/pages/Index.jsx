import React, { useState } from "react";
import { Container, VStack, Text, Input, Button, HStack, Box, IconButton, useToast } from "@chakra-ui/react";
import { FaRobot, FaChartLine } from "react-icons/fa";

const Index = () => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const toast = useToast();

  const handleInputChange = (e) => setInputValue(e.target.value);

  const handleSendMessage = () => {
    if (inputValue.trim() === "") {
      toast({
        title: "Input is empty.",
        description: "Please enter a message.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const newMessage = { text: inputValue, sender: "user" };
    setMessages([...messages, newMessage]);
    setInputValue("");

    // Simulate bot response
    setTimeout(() => {
      const botMessage = { text: "This is a simulated response from the AI bot.", sender: "bot" };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }, 1000);
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <HStack spacing={4}>
          <FaChartLine size="2em" />
          <Text fontSize="2xl">Trading Signal AI Bot</Text>
        </HStack>
        <Box width="100%" height="400px" overflowY="auto" border="1px solid" borderColor="gray.200" borderRadius="md" p={4}>
          {messages.map((message, index) => (
            <Box key={index} alignSelf={message.sender === "user" ? "flex-end" : "flex-start"} mb={2}>
              <Text bg={message.sender === "user" ? "blue.100" : "green.100"} p={2} borderRadius="md">
                {message.text}
              </Text>
            </Box>
          ))}
        </Box>
        <HStack width="100%">
          <Input value={inputValue} onChange={handleInputChange} placeholder="Type your message..." />
          <IconButton aria-label="Send" icon={<FaRobot />} onClick={handleSendMessage} />
        </HStack>
      </VStack>
    </Container>
  );
};

export default Index;
