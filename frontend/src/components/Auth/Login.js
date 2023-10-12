import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  InputGroup,
  InputRightElement,
  useToast
} from "@chakra-ui/react";
import axios from "axios";
import { useHistory } from "react-router-dom";


export default function Login() {
  const [email, setemail] = useState([]);
  const [password, setpassword] = useState([]);
  const [show, setshow] = useState(false);
  const [loading, setloading] = useState(false);
  const toast = useToast();
  const history = useHistory();

  const LoginHandler = async (event) => {
    event.preventDefault();

    setloading(true);
    if (!email || !password) {
      toast({
        title: "Fill all Details",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setloading(false);


    }

    else {

      try {

        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };

        const res = await axios.post("https://localhost:7059/api/Registration/login", { email, password }, config);
        console.log(res);
        if (res.data.statusCode === 200) {

          const obj = JSON.stringify({ email, password });
          console.log(obj);

          localStorage.setItem("email", JSON.stringify(res.data.email));
          localStorage.setItem("token", JSON.stringify(res.data.token));
          setloading(false);
          history.replace('/chats');
          toast({
            title: "User Login SuccessFull ",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "bottom",
          });

        }
        else {

          toast({
            title: res.data.statusMessage,
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "bottom",
          });
          setloading(false);

        }


      } catch (error) {
        toast({
          title: "Something Went Wrong",
          status: "warning",
          duration: 3000,
          isClosable: true,
          position: "bottom",
        });
        setloading(false);

      }


    }

  };


  return (
    <VStack spacing="5px">
      <FormControl isRequired id="Email">
        <FormLabel> Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          onChange={(e) => {
            setemail(e.target.value);
          }}
        />
      </FormControl>
      <FormControl isRequired id="Password">
        <FormLabel> Password</FormLabel>

        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Your Password"
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          />
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              onClick={() => {
                setshow(!show);
              }}
            >
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        mt={2}
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={LoginHandler}
        isLoading={loading}
      >
        Login
      </Button>
      <Button
        mt={2}
        variant="solid"
        colorScheme="red"
        width="100%"
        onClick={() => {
          setemail("guest@example.com");
          setpassword("123456");
        }}
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  );
}
