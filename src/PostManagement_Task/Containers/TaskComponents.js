import React, { useState, useEffect, useReducer } from 'react';
import { Grid, Table, TableCell, TableHead, TableRow, TableBody, Paper, Button, Tooltip, IconButton } from '@material-ui/core';
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import AddEditPost from '../Components/AddEditPost';
import PageLoader from '../../sharedComponent/PageLoader';

// Define Actions
const ACTIONS = {
	ADD: 'ADD',
	UPDATE: 'UPDATE',
	DELETE: 'DELETE',
	VIEW: 'VIEW',
};

// Reducer Function
const postReducer = (state, action) => {
	switch (action.type) {
		case ACTIONS.ADD:
			return Array.isArray(action.payload) ? [...state, action.payload] : [...state, action.payload];
		case ACTIONS.UPDATE:
			return state.map((post) =>
				post.id === action.payload.id ? action.payload : post
			);
		case ACTIONS.DELETE:
			return state.filter((post) => post.id !== action.payload.id);
		case ACTIONS.VIEW:
			return Array.isArray(action.payload) ? action.payload : [action.payload];
		default:
			return state;

	}
};

function TaskComponents() {
	const [postData, dispatch] = useReducer(postReducer, []);
	const [open, setOpen] = useState({ modal: false, data: null, mode: '' });
	const [isLoading, setIsloading] = useState(false)

	useEffect(() => {
		getPostData();
	}, []);

	const getPostData = () => {
		setIsloading(true)
		fetch('https://jsonplaceholder.typicode.com/posts')
			.then((response) => response.json())
			.then((json) => {
				if (Array.isArray(json)) {
					setIsloading(false)
					dispatch({ type: ACTIONS.VIEW, payload: json });
				} else {
					console.error('Fetched data is not an array:', json);
				}
			});
	};

	const deletePostData = (item) => {
		fetch(`https://jsonplaceholder.typicode.com/posts/${item.id}`, {
			method: 'DELETE',
		}).then(() => {
			dispatch({ type: ACTIONS.DELETE, payload: item });
		});
	};

	const savePostData = (postData) => {
		setIsloading(true)
		const isUpdate = postData?.id;
		const apiUrl = isUpdate
			? `https://jsonplaceholder.typicode.com/posts/${postData.id}`
			: 'https://jsonplaceholder.typicode.com/posts';
		const method = isUpdate ? 'PUT' : 'POST';
		const body = JSON.stringify(postData);

		fetch(apiUrl, {
			method,
			body,
			headers: { 'Content-type': 'application/json; charset=UTF-8', },
		})
			.then((response) => response.json())
			.then((json) => {
				if (isUpdate) {
					setIsloading(false)
					dispatch({ type: ACTIONS.UPDATE, payload: json });
				} else {
					setIsloading(false)
					dispatch({ type: ACTIONS.ADD, payload: json });
				}
				setOpen({ modal: false, data: null, mode: '' });
			});

	};

	return (
		<section>
			{isLoading ? <PageLoader /> :
				<>
					<h2 style={{ textAlign: 'center', margin: '10px' }}>Post Management ({postData.length})</h2>
					<Grid container>
						<Grid item xs={12} md={12} sm={12} style={{ textAlign: 'right', margin: '5px' }}>
							<Button
								variant="outlined"
								size="small"
								color="primary"
								onClick={() => setOpen({ modal: true, data: null, mode: 'add' })}
							>
								ADD POST
							</Button>
						</Grid>
					</Grid>
					<Paper className="post-list">
						<div style={{ height: `${window.innerHeight - 100}px`, overflow: 'auto' }}>
							<Table className="mui-table-format" stickyHeader={true}>
								<TableHead>
									<TableRow>
										<TableCell> ID </TableCell>
										<TableCell> Title </TableCell>
										<TableCell> Completed </TableCell>
										<TableCell> Body </TableCell>
										<TableCell> Actions </TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{postData.map((item) => (
										<TableRow key={item.id} style={{ cursor: 'pointer' }}>
											<TableCell>{item.id || '--'}</TableCell>
											<TableCell>{item.title || '--'}</TableCell>
											<TableCell>{item?.completed ? "YES" : "NO" || '--'}</TableCell>
											<TableCell>{item.body || '--'}</TableCell>
											<TableCell>
												<Tooltip title="Edit" placement="top">
													<IconButton onClick={() => setOpen({ modal: true, data: item, mode: 'view' })} style={{ padding: 'unset' }} color="primary" >
														<CreateOutlinedIcon />
													</IconButton>
												</Tooltip>
												<Tooltip title="Delete" placement="top">
													<IconButton style={{ padding: 'unset' }} color="secondary" onClick={() => deletePostData(item)} >
														<DeleteOutlinedIcon />
													</IconButton>
												</Tooltip>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</div>
					</Paper></>}
			{open.modal && (
				<AddEditPost
					postitem={open.data}
					modal={open}
					closeModal={() => setOpen({ modal: false, data: null, mode: '' })}
					savePost={savePostData}
				/>
			)}
		</section>
	);
}

export default TaskComponents;
