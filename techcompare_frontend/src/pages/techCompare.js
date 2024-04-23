import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Card, CardContent, CardMedia, Grid, Paper, Typography, styled} from '@mui/material';
import Container from '@mui/material/Container';
import axios from 'axios';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard.js';


export default function TechCompare() {
    const { id } = useParams(); // Get the `id` param from the URL
    // const [product, setProduct] = useState({ id: '', productName: '', imageLink: '', price: '' });
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                // console.log(id)
                const response = await axios.get('http://localhost:8080/techCompare/products/similar/'+id); // Adjust the URL based on your server
                setCategory(category => response.data[0].category)
                setProducts(products => response.data)
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };
        fetchData();
    }, []);


  return (
    <Container maxWidth="md" sx={{pt: 5}}>
        <Grid container spacing={12}>
            <Grid item xs={12} style={{paddingBottom: '5%'}}>
                <h1 style={{textAlign:'center'}}>Compare {category} models</h1>
            </Grid>
            <Grid container spacing={2}>
                        {products.map((product) => (
                            <Grid item xs={6} md={4}>
                                <ProductCard 
                                    id={product.productStringId}
                                    productName={product.productName}
                                    imageLink={product.imageLink}
                                    price={product.currentPrice}
                                    ram={product.specifications.ram}
                                    storage={product.specifications.storage}/>
                            </Grid>
                        ))}
                    </Grid>
        </Grid>
        {/* <Divider sx={{m:4}}></Divider> */}
    </Container>
  );
}
