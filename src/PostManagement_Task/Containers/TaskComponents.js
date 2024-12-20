import React, { useState, useEffect } from 'react'
import { Table, TableCell, TableHead, TableRow, TableBody, Paper, Button,Tooltip,IconButton } from '@material-ui/core'
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import AddEditPost from '../Components/AddEditPost'


function TaskComponents() {
	const [postData, setPostData] = useState([])
	const [open, setOpen] = useState({ modal: false, data: null, mode: '' })

	useEffect(() => {
		getPostData()

	}, []);

	const getPostData = () => {
		fetch('https://jsonplaceholder.typicode.com/posts')
			.then((response) => response.json()).then((json) => setPostData(json));
	}

	const deletePostData = (item) => {
		debugger
		fetch(`https://jsonplaceholder.typicode.com/posts/${item?.id}`, {
			method: 'DELETE',
		  });
		  getPostData()
	}

	console.log("item",postData)


	return (
		<section className='post-task-mngt'>
			Post Mangement {postData?.length}
			<Paper className='major-assemblies-list'>
				<div style={{ height: `${window.innerHeight - 250}px`, overflow: 'auto' }}>
					<ul style={{ float: 'right' }}>
						<li style={{ listStyle: 'none' }}>
							<Button variant='outlined' size='small' color='primary' onClick={() => setOpen({ modal: true, data: null, mode: 'add' })}>ADD POST</Button>
						</li>
					</ul>
					<Table className='mui-table-format' stickyHeader={true}>
						<TableHead>
							<TableRow>
								<TableCell> ID </TableCell>
								<TableCell> Title </TableCell>
								<TableCell> Body </TableCell>
								<TableCell> Actions </TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{postData.map((item, index) =>
								<TableRow style={{ cursor: "pointer" }}>
									<TableCell>{item?.id || '--'}</TableCell>
									<TableCell>{item?.title || '--'}</TableCell>
									<TableCell>{item?.body || '--'}</TableCell>
									<TableCell >
										<Tooltip title="Edit" placement='top'>
											<IconButton  onClick={() => setOpen({ modal: true, data: item, mode: 'view' })} style={{ padding: 'unset' }} color='primary' >
												<CreateOutlinedIcon />
											</IconButton>
										</Tooltip>
										<Tooltip title="Delete" placement='top' >
											<IconButton style={{ padding: 'unset' }} color='secondary'  onClick={() =>deletePostData(item)}>
												<DeleteOutlinedIcon />
											</IconButton>
										</Tooltip>
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</div>
			</Paper>
			{
				open.modal ?
					<AddEditPost
					    postitem={open?.data}
						modal={open}
						closeModal={() => setOpen(false)}
						getResponseBack={()=>getPostData()}
					/>
					: null
			}
		</section>
	)
}

export default TaskComponents