import {
  Box,
  Container,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import "../App.css";
import React from "react";
import Login from "../components/Auth/Login";
import SignUp from "../components/Auth/SignUp";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function HomePage() {
  const history = useHistory();
  useEffect(() => {
    const obj = JSON.parse(localStorage.getItem("user"));

    if (obj) {
      history.push('/chats');
    }

  }, [history])
  return (
    <div className="Signup">

      <Container maxW="xxl" centerContent>
        <Box
          d="flex"
          justifyContent="center"
          p={3}
          bg={"white"}
          w="50%"
          m="40px 0 15px 0"
          borderRadius="1g"
          borderWidth="1px"
        >
          <Text fontSize={"5xl"} style={{ textAlign: "center" }}>Welcome To Chat-E-Box</Text>
          <Tabs position="relative" variant="unstyled">
            <TabList d="flex" justifyContent="center">
              <Tab fontSize={"2xl"}>Login</Tab>
              <Tab fontSize={"2xl"}>SignUp</Tab>
            </TabList>
            <TabIndicator
              mt="-1.5px"
              height="2px"
              bg="blue.500"
              borderRadius="1px"
            />
            <TabPanels>
              <TabPanel>
                <Login />
              </TabPanel>
              <TabPanel>
                <SignUp />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </div>
  );
}
