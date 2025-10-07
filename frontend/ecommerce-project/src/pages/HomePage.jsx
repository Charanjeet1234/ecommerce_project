import { Container, VStack, Text, SimpleGrid } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../../store/product.js";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const { fetchProducts,products } = useProductStore();
  // const {products} = useProductStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  console.log("products", products);
  return (
    <>
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
          columns={{
            base: 1,
            md: 2,
            lg: 4,
          }}
          spacing={10}
        >
       {products.map((product) =>
      (
        <ProductCard key={product._id} product={product} />
      ))}

        </SimpleGrid>

        {products.length===0 && 
        (
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
        )}
      </VStack>
    </Container>
    </>
  );
};

export default HomePage;
