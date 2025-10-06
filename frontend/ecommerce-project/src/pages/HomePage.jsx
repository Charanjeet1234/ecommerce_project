import { Container, VStack, Text, SimpleGrid } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../../store/product";

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  console.log("products", products);
  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        <Text
          bgGradient={"linear(to-r,cyan.400, blue.500)"}
          bgClip="text"
          textAlign={"center"}
          fontSize={{ base: "22", sm: "28" }}
          fontWeight="bold"
        >
          Current Products 🚀
        </Text>
        <SimpleGrid
          column={{
            base: 1,
            md: 2,
            lg: 3,
          }}
          spacing={10}
        >
       {products.map((product)=>
      {
        <ProductCard key={product._id} products={product} />
      })}


        </SimpleGrid>

        <Text
          textAlign={"center"}
          fontSize={"xl"}
          fontWeight="bold"
          color={"gray.500"}
        >
          No products found 😥{" "}
          <Link to="/create">
            <Text
              as={"span"}
              color={"blue.500"}
              _hover={{ textDecoration: "underline" }}
            >
              Create a product
            </Text>
          </Link>
        </Text>
      </VStack>
    </Container>
  );
};

export default HomePage;
