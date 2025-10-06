import { Container, Flex, Text, HStack, Button, useColorMode } from "@chakra-ui/react";
import { FaCartPlus } from "react-icons/fa";
import { PlusSquareIcon } from "@chakra-ui/icons";
import {IoMoon} from "react-icons/io5"
import {LuSun} from "react-icons/lu"
import {Link} from "react-router-dom"
const Navbar = () => {
    const {colorMode, toggleColorMode} = useColorMode()
  return (
    <div>
      <Container maxW={"1140px"} px={4}>
        <Flex
          h={16}
          alignContent={"center"}
          justifyContent={"space-between"}
          flexDir={{
            base: "column",
            sm: "row",
          }}
        >
          <Text
            bgGradient={"linear(to-r,cyan.400, blue.500)"}
            bgClip="text"
            textAlign={"center"}
            fontSize={{ base: "22", sm: "28" }}
            fontWeight="bold"
          >
            <Link to="/">
              Product Store 🛒 {" "}
            </Link>
          </Text>
          <HStack spacing={2} alignItem={"center"}>
            <Link to="/create">
              <Button>
                <PlusSquareIcon fontSize={20} />
              </Button>
            </Link>
            <Button onClick={toggleColorMode}>
             {colorMode==="light" ? <IoMoon /> : <LuSun />}
            </Button>
          </HStack>
        </Flex>
      </Container>
    </div>
  );
};

export default Navbar;
