import React from 'react';
import './App.css';
import { Grid, Card, CardContent, Typography } from "@material-ui/core";

function App() {
	const handleClick = (item) => {
		if (item === "postData") {
			window.open("/risidio", "_self");
		} else {
			window.open("/nfts", "_self");
		}
	};

	return (
		<section className="risidio-main-page">
			<h3 style={{ textAlign: 'center',marginBottom: '20px' }}>
				Risidio Task Assessment
			</h3>
			<Grid container spacing={5} style={{ justifyContent: 'center', cursor:'pointer'}}>
				<Grid item xs={12} md={4} sm={4}>
					<Card  className='post-card' style={{ padding: "25px" }} onClick={() => handleClick('postData')}>
						<CardContent>
							<Typography style={{ textAlign: "center" }}>
								Post Management
							</Typography>
						</CardContent>
					</Card>
				</Grid>
				<Grid item xs={12} md={4} sm={4}>
					<Card  className='nfts-card' style={{ padding: "25px" }} onClick={() => handleClick('nfts')}>
						<CardContent>
							<Typography style={{ textAlign: "center" }}>
								NFTs
							</Typography>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</section>
	);
}

export default App;
