import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function SignUp() {
  const [name, setname] = useState([]);
  const [email, setemail] = useState([]);
  const [password, setpassword] = useState([]);
  const [confirmpassword, setconfirmpassword] = useState([]);
  const [show, setshow] = useState(false);
  const [pic, setpic] = useState("https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg");
  const [loading, setloading] = useState(false);
  const toast = useToast();
  const history = useHistory();

  const SubmitHandler = async (event) => {
    event.preventDefault();
    setloading(true);
    if (!email || !password || !name) {
      toast({
        title: "Fill all Details",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setloading(false);


    }
    else if (confirmpassword !== password) {
      toast({
        title: "Confirm Password is not Same",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setloading(false);

    }
    else {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      console.log({ name, email, password, pic });
      try {
        const res = await axios.post("https://localhost:7059/api/Registration/registration", { name, email, password, pic }, config);
        console.log(res);
        if (res.status === 200) {
          toast({
            title: "User SuccessFull Register . Now You Can Login In",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "bottom",
          });

          setloading(false);

        }
        else {

          toast({
            title: "Something Went Wrong",
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

  const postDetails = (pic) => {
    setloading(true);
    if (pic === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if (pic.type === "image/jpeg" || pic.type === "image/png") {

      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "Chat-e-box");
      data.append("cloud_name", "dhqo1nuad");
      fetch("https://api.cloudinary.com/v1_1/dhqo1nuad/image/upload", {
        method: "post",
        body: data,
      }).then((res) => res.json())
        .then((data) => {
          setpic(data.url.toString());
          console.log(data);
          setloading(false);
          toast({
            title: "Image Upload SuccessFul",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "bottom",
          });
        }).catch((err) => {
          console.log(err);
          setloading(false);
        });


    }
    else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setloading(false);
      return;

    }
  };
  const fecthData = async () => {
    const res = await axios.get("http://localhost/api");
    console.log("res", res);
  };
  useEffect(() => {
    // fecthData();
  }, []);
  return (
    <VStack spacing="5px">
      <FormControl isRequired id="First-Name">
        <FormLabel> Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => {
            setname(e.target.value);
          }}
        />
      </FormControl>
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
      <FormControl isRequired id="cnf-Password">
        <FormLabel> Confirm Password </FormLabel>

        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Your Password"
            onChange={(e) => {
              setconfirmpassword(e.target.value);
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
      <FormControl id="pic">
        <FormLabel>Upload your Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>
      <Button
        mt={2}
        colorScheme="blue"
        onClick={SubmitHandler}
        width="100%"
        style={{ marginTop: 15 }}
        isLoading={loading}
      >
        Register
      </Button>
    </VStack>
  );
};
