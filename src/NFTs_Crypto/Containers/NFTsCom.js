import React from "react";
import { Chip, Grid, Card, CardContent, CardMedia, Typography, Button, Avatar } from "@material-ui/core";

function NFTsCom() {
    const collections = [
        {
            title: "Night Sky",
            artist: "Léa Jacquot",
            priceRange: "0.12 BTC - 0.18 BTC",
            image: "https://i.gifer.com/Xkjj.gif",
        },
        {
            title: "Future",
            artist: "Julien",
            priceRange: "0.12 BTC - 0.18 BTC",
            image: "https://i.gifer.com/9MbP.gif",
        },
        {
            title: "Mother Nature",
            artist: "Maria",
            priceRange: "0.12 BTC - 0.18 BTC",
            image: "https://i.gifer.com/CZk.gif",
        },
    ];

    return (
        <div className="marketplace">
            <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                    <h3>MARKETPLACE</h3>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Chip label="Connect Wallet" component="a" href="#chip" clickable variant="outlined" style={{ float: 'right' }} />
                </Grid>
            </Grid>
            <section className="trending-section" >
                <Grid container spacing={4}>
                    <Grid item xs={12} md={8} className="trending-content" >
                        <Typography style={{ margin: '10px' }}>
                            <Chip label="Trending Now" variant="outlined" color="secondary" />
                        </Typography>
                        <Typography variant="h5" style={{ margin: '10px' }} >
                            <span style={{ color: "#a08383", fontSize: "16px" }}>Night sky collection</span>
                            <br /> <strong>With the stars</strong>
                        </Typography>
                        <div className="trending-artist" style={{ marginLeft: '10px' }}>
                            <Avatar
                                src="https://img.icons8.com/?size=100&id=108295&format=png&color=000000"
                                alt="Artist"
                                className="avatar"
                            />
                            <Typography variant="body2" className="artist-name">
                                Léa Jacquot
                            </Typography>
                        </div>
                        <div className="trending-actions" style={{ marginLeft: '10px' }}>
                            <Button variant="contained" color="primary" className="buy-button">
                                Buy
                            </Button>
                            <Button variant="outlined" className="collection-button">
                                See collection
                            </Button>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <img
                            src="https://i.gifer.com/7Tzm.gif"
                            alt="Trending"
                            className="trending-image"
                        />
                    </Grid>
                </Grid>
            </section>
            <section className="collections-section">
                <Typography variant="h5" className="collections-title">
                    Collections
                </Typography>
                <Grid container spacing={4}>
                    {collections.map((collection, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card className="collection-card">
                                <CardMedia
                                    className="collection-media"
                                    image={collection.image}
                                    title={collection.title}
                                />
                                <CardContent>
                                    <Typography variant="h6" className="collection-title">{collection.title}</Typography>
                                    <Typography variant="body2" color="textSecondary" className="collection-description">
                                        Price Range: {collection.priceRange}
                                    </Typography>
                                    <div style={{ display: "flex", alignItems: "center", marginTop: 16 }}>
                                        <Avatar
                                            src="https://img.icons8.com/?size=100&id=108296&format=png&color=000000"
                                            alt={collection.artist}
                                            lassName="collection-footer"
                                        />
                                        <Typography style={{ marginLeft: 8 }}>{collection.artist}</Typography>
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </section>
        </div>
    );
}

export default NFTsCom;
